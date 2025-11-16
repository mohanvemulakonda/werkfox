import prisma from '../lib/prisma';

async function main() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 1
  });

  if (products.length === 0) {
    console.log('No products found in database');
    return;
  }

  const product = products[0];

  console.log('\n📦 Latest Product Created:');
  console.log('========================\n');
  console.log('Basic Info:');
  console.log(`  ID: ${product.id}`);
  console.log(`  SKU: ${product.sku}`);
  console.log(`  Name: ${product.name}`);
  console.log(`  Description: ${product.description || 'N/A'}`);
  console.log(`  Category: ${product.category || 'N/A'}`);
  console.log(`  Sub Category: ${product.subCategory || 'N/A'}`);

  console.log('\nPricing:');
  console.log(`  Base Price: ${product.currency} ${product.basePrice}`);
  console.log(`  GST Rate: ${product.gstRate}%`);
  console.log(`  HSN Code: ${product.hsnCode || 'N/A'}`);
  console.log(`  Unit: ${product.unit}`);

  console.log('\nInventory:');
  console.log(`  Stock Quantity: ${product.stockQuantity}`);
  console.log(`  Is Active: ${product.isActive}`);

  if (product.category === 'LABELS') {
    console.log('\nLabel Specifications:');
    console.log(`  Material: ${product.labelMaterial || 'N/A'}`);
    console.log(`  Size: ${product.labelSize || 'N/A'}`);
    console.log(`  Shape: ${product.labelShape || 'N/A'}`);
    console.log(`  Adhesive: ${product.labelAdhesive || 'N/A'}`);
    console.log(`  Finish: ${product.labelFinish || 'N/A'}`);
    console.log(`  Print Method: ${product.printMethod || 'N/A'}`);
    console.log(`  Core Size: ${product.coreSize || 'N/A'}`);
    console.log(`  Roll Size: ${product.rollSize || 'N/A'}`);
  }

  console.log('\nTimestamps:');
  console.log(`  Created: ${product.createdAt}`);
  console.log(`  Updated: ${product.updatedAt}`);
  console.log('\n✅ Product verification complete!\n');
}

main()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
