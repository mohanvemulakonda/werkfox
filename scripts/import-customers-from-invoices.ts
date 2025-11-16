import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Importing customers from invoices with hierarchical structure...\n');

  // First, delete MYK LATICRETE from contacts (wrongly added)
  const deletedContact = await prisma.contact.deleteMany({
    where: {
      company: {
        contains: 'MYK LATICRETE'
      }
    }
  });

  if (deletedContact.count > 0) {
    console.log(`✅ Removed ${deletedContact.count} contact(s) from Contacts (moving to Customers)\n`);
  }

  // Create parent corporate account
  let parentCustomer = await prisma.customer.findFirst({
    where: {
      companyName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
      isCorporateAccount: true
    }
  });

  if (!parentCustomer) {
    parentCustomer = await prisma.customer.create({
      data: {
        customerCode: 'CUST-MYK-001',
        companyName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
        displayName: 'MYK Laticrete',
        isCorporateAccount: true,
        contactPerson: 'Corporate Office',
        email: 'info@myklaticrete.com',
        phone: '+91-7010043720',
        website: 'www.myklaticrete.com',
        gstNumber: '',
        gstType: 'REGISTERED',
        paymentTerms: 'Net 15',
        creditDays: 15,
        industry: 'Manufacturing',
        isActive: true,
        notes: 'Parent corporate account for MYK Laticrete India Pvt Ltd'
      }
    });

    console.log(`✅ Created parent corporate account: ${parentCustomer.companyName} (ID: ${parentCustomer.id})\n`);
  } else {
    console.log(`⏭️  Parent corporate account already exists: ${parentCustomer.companyName} (ID: ${parentCustomer.id})\n`);
  }

  // Define child shipping locations
  const shippingLocations = [
    {
      code: 'CUST-MYK-BEH',
      locationName: 'Behror',
      gstNumber: '08AAACL5557E1ZJ',
      address: 'Sotanala Industrial area Plot No C21',
      city: 'Behror',
      state: 'Rajasthan',
      pincode: '301701',
      country: 'India'
    },
    {
      code: 'CUST-MYK-CHE',
      locationName: 'Chennai',
      gstNumber: '33AAACL5557E1ZQ',
      address: 'No-13,old no-18 B, Link road Mettu street, Maduvangari,Guindy',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600032',
      country: 'India'
    },
    {
      code: 'CUST-MYK-PER',
      locationName: 'Perundurai',
      gstNumber: '33AAACL5557E1ZQ',
      address: 'SF No 206, Chinnampatti Village, Veppampalayam Post',
      city: 'Perundurai',
      state: 'Tamil Nadu',
      pincode: '638052',
      country: 'India'
    }
  ];

  // Create child accounts
  for (const location of shippingLocations) {
    const existingLocation = await prisma.customer.findFirst({
      where: {
        customerCode: location.code
      }
    });

    if (existingLocation) {
      console.log(`⏭️  Shipping location already exists: ${location.locationName}`);
      continue;
    }

    const childAccount = await prisma.customer.create({
      data: {
        customerCode: location.code,
        companyName: 'MYK LATICRETE INDIA PRIVATE LIMITED',
        displayName: `MYK Laticrete - ${location.locationName}`,
        locationName: location.locationName,
        isCorporateAccount: false,
        parentCustomerId: parentCustomer.id,
        contactPerson: location.locationName,
        email: 'info@myklaticrete.com',
        phone: '+91-7010043720',
        gstNumber: location.gstNumber,
        gstType: 'REGISTERED',
        shippingAddress: location.address,
        shippingCity: location.city,
        shippingState: location.state,
        shippingPincode: location.pincode,
        shippingCountry: location.country,
        billingAddress: location.address,
        billingCity: location.city,
        billingState: location.state,
        billingPincode: location.pincode,
        billingCountry: location.country,
        paymentTerms: 'Net 15',
        creditDays: 15,
        industry: 'Manufacturing',
        isActive: true,
        notes: `Shipping location: ${location.locationName}`
      }
    });

    console.log(`✅ Created shipping location: ${location.locationName} (ID: ${childAccount.id})`);
  }

  console.log('\n═══════════════════════════════════════');
  console.log('✅ Customer import completed!');
  console.log(`   Corporate Account: ${parentCustomer.companyName}`);
  console.log(`   Shipping Locations: ${shippingLocations.length}`);
  console.log('═══════════════════════════════════════\n');
}

main()
  .catch((error) => {
    console.error('❌ Error importing customers:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
