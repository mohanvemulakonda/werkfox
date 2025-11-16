const fs = require('fs');

// Try to import pdf-parse using dynamic import
(async () => {
  try {
    // Use dynamic import for ESM module
    const pdfParse = await import('pdf-parse/lib/pdf-parse.js');
    const pdf = pdfParse.default || pdfParse;

    const pdfPath = '/Users/mohanvemulakonda/Downloads/livato_invoices/LIVATO SOLUTIONS/2021/DECEMBER/SALE/RI-1120.pdf';
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
})();
