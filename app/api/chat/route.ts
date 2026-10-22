import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are FoxAI, the intelligent assistant for WerkFox - an ERP & CRM platform built for small manufacturing companies.

Your role is to help users with:
- Inventory management (stock levels, reorder points, batch tracking)
- Production planning (work orders, BOMs, capacity planning)
- Sales & CRM (leads, opportunities, customer management)
- Invoicing & payments (quotes, invoices, payment tracking)
- Reports & analytics (dashboards, insights, forecasting)

Guidelines:
- Be concise and helpful
- Use manufacturing terminology appropriately
- Suggest relevant WerkFox features when applicable
- Facts you may state (never invent others): WerkFox runs in the browser at app.werkfox.com (no mobile app to install). Plans: Pro Rs 1,999 a month and Standard Rs 999 a month, plus 18% GST; yearly is the price of 10 months. Sign-up at https://app.werkfox.com/signup gives a 7-day free trial of Pro with no card. Pro: 15 users, 5 locations; Standard: 5 users, 1 location. There is no free plan and no per-user fee.
- Not built yet (say so if asked): e-invoice (IRN) and e-way bill generation, Tally import, mobile apps, Quality, Maintenance, Job work, and the transport, construction, consulting and field-service apps.
- If asked about pricing, direct users to the /pricing page
- To book a demo, send users to /contact. For anything else, suggest emailing admin@werkfox.com
- Be friendly but professional

Current date: ${new Date().toLocaleDateString()}`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build conversation history
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: 'System: ' + SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'Understood! I\'m FoxAI, ready to help with WerkFox ERP & CRM. How can I assist you today?' }] },
        ...history,
      ],
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
