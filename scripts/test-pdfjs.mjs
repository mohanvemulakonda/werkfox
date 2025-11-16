import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

async function extractTextFromPDF(pdfPath) {
  try {
    const dataBuffer = new Uint8Array(fs.readFileSync(pdfPath));

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
    const pdfDocument = await loadingTask.promise;

    console.log(`PDF loaded - Pages: ${pdfDocument.numPages}`);
    console.log('='.repeat(80));

    let fullText = '';

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Join all text items
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';

      console.log(`\n--- Page ${pageNum} ---`);
      console.log(pageText);
    }

    console.log('='.repeat(80));
    console.log('\nFull text length:', fullText.length);

    return fullText;
  } catch (err) {
    console.error('Error extracting PDF:', err);
    throw err;
  }
}

const pdfPath = '/Users/mohanvemulakonda/Downloads/livato_invoices/LIVATO SOLUTIONS/2021/DECEMBER/SALE/RI-1120.pdf';
extractTextFromPDF(pdfPath);
