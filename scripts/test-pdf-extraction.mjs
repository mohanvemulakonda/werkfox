import fs from 'fs';
import pdf from 'pdf-parse';

const pdfPath = '/Users/mohanvemulakonda/Downloads/livato_invoices/LIVATO SOLUTIONS/2021/DECEMBER/SALE/RI-1120.pdf';

async function testPDF() {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);

    console.log('PDF Text Content:');
    console.log('='.repeat(80));
    console.log(data.text);
    console.log('='.repeat(80));
    console.log('\nNumber of pages:', data.numpages);
  } catch (err) {
    console.error('Error:', err);
    console.error('Stack:', err.stack);
  }
}

testPDF();
