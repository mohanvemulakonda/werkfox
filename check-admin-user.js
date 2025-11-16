import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { email: 'sales@livatosolutions.com' }
    });
    
    if (admin) {
      console.log('\n✅ Admin user found in database!');
      console.log('\nDetails:');
      console.log('  Email:', admin.email);
      console.log('  Name:', admin.name);
      console.log('  Role:', admin.role);
      console.log('  Active:', admin.isActive);
      console.log('  Created:', admin.createdAt);
      console.log('  Password:', admin.password ? 'Hashed (' + admin.password.substring(0, 20) + '...)' : 'Not set');
      console.log('\n📝 Login Credentials:');
      console.log('  URL: http://localhost:3002/login/admin');
      console.log('  Email: sales@livatosolutions.com');
      console.log('  Password: Livato@2024');
    } else {
      console.log('\n❌ Admin user NOT found in database');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
