import prisma from '../lib/prisma';

async function main() {
  console.log('Creating 3 Ribbon products...\n');

  const ribbons = [
    {
      name: 'Wax Ribbon - 110mm x 300m',
      description: 'High-quality wax thermal transfer ribbon, ideal for general-purpose barcode printing on paper labels. 110mm width, 300 meters length. Compatible with most barcode printers.',
      ribbonType: 'Wax',
      basePrice: 100.00,
    },
    {
      name: 'Premium Wax-Resin Ribbon - 110mm x 300m',
      description: 'Premium wax-resin thermal transfer ribbon offering superior durability and print quality. Suitable for synthetic materials and demanding applications. 110mm width, 300 meters length.',
      ribbonType: 'Premium Wax-Resin',
      basePrice: 170.00,
    },
    {
      name: 'Resin Ribbon - 110mm x 300m',
      description: 'High-performance resin thermal transfer ribbon for extreme durability and resistance. Perfect for harsh environments and synthetic labels. 110mm width, 300 meters length.',
      ribbonType: 'Resin',
      basePrice: 330.00,
    }
  ];

  for (const ribbon of ribbons) {
    const sku = 'RBN-110-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    const product = await prisma.product.create({
      data: {
        sku,
        name: ribbon.name,
        description: ribbon.description,
        category: 'RIBBONS',
        subCategory: ribbon.ribbonType,
        basePrice: ribbon.basePrice,
        currency: 'INR',
        hsnCode: '96121090', // HSN code for ribbons
        gstRate: 18,
        unit: 'Roll',
        isActive: true,
        stockQuantity: 0,
        // Ribbon-specific fields
        ribbonType: ribbon.ribbonType,
        ribbonWidth: '110mm (4 inch)',
        ribbonLength: '300m',
        ribbonColor: 'Black',
      }
    });

    console.log(`✅ Created: ${product.name}`);
    console.log(`   SKU: ${product.sku}`);
    console.log(`   Price: ${product.currency} ${product.basePrice} per roll`);
    console.log('');
  }

  console.log('✅ All 3 ribbon products created successfully!\n');
}

main()
  .catch((error) => {
    console.error('❌ Error creating ribbons:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
