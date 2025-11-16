import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

async function testPDFExtraction(pdfPath: string) {
  try {
    console.log(`\nExtracting text from: ${pdfPath}\n`);

    const dataBuffer = fs.readFileSync(pdfPath);
    const typedArray = new Uint8Array(dataBuffer);
    const loadingTask = pdfjsLib.getDocument({ data: typedArray });
    const pdfDocument = await loadingTask.promise;

    let fullText = '';
    const numPages = pdfDocument.numPages;

    console.log('='.repeat(80));
    console.log('PDF METADATA:');
    console.log('='.repeat(80));
    console.log(`Pages: ${numPages}`);
    console.log('\n');

    // Extract text from all pages
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    console.log('='.repeat(80));
    console.log('EXTRACTED TEXT:');
    console.log('='.repeat(80));
    console.log(fullText);
    console.log('\n');

    console.log('='.repeat(80));
    console.log('TEXT LENGTH:', fullText.length);
    console.log('='.repeat(80));

  } catch (error) {
    console.error('Error extracting PDF:', error);
  }
}

const testFile = '/Users/mohanvemulakonda/Downloads/livato_invoices/LIVATO SOLUTIONS/2023/APRIL/sale/RI-1697-kalol.pdf';
testPDFExtraction(testFile);
