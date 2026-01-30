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
- If asked about pricing, direct users to the /pricing page
- For technical issues, suggest contacting support@werkfox.com
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
