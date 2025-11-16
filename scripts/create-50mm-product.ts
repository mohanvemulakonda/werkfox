import prisma from '../lib/prisma';

async function main() {
  console.log('Creating 50mm x 50mm product...\n');

  const product = await prisma.product.create({
    data: {
      sku: 'LBL-5050-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      name: 'Pre-printed Logo Barcode Labels - 50mm x 50mm',
      description: 'High-quality chromo paper labels featuring your custom 2-color logo header with blank space below for thermal transfer barcode printing. Compact size ideal for small items. Semi-gloss finish with permanent adhesive. 2000 labels per roll on 1-inch core.',
      category: 'LABELS',
      subCategory: 'Pre-printed Labels',
      basePrice: 0.17,
      currency: 'INR',
      hsnCode: '48211020',
      gstRate: 18,
      unit: 'Pcs',
      isActive: true,
      stockQuantity: 0,
      // Label-specific fields
      labelMaterial: 'Chromo Paper',
      labelSize: '50mm x 50mm',
      labelShape: 'Square',
      labelAdhesive: 'Permanent',
      labelFinish: 'Semi Gloss',
      printMethod: 'Thermal Transfer',
      coreSize: '1 inch',
      rollSize: '2000 labels/roll',
    }
  });

  console.log('✅ Product created successfully!\n');
  console.log('Product Details:');
  console.log('================');
  console.log(`ID: ${product.id}`);
  console.log(`SKU: ${product.sku}`);
  console.log(`Name: ${product.name}`);
  console.log(`Price: ${product.currency} ${product.basePrice}`);
  console.log(`GST Rate: ${product.gstRate}%`);
  console.log(`Size: ${product.labelSize}`);
  console.log(`Roll Size: ${product.rollSize}`);
  console.log('\n✅ Done!\n');
}

main()
  .catch((error) => {
    console.error('❌ Error creating product:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
