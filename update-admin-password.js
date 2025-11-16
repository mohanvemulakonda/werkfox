import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePassword() {
  const newPassword = '111aaa###$A';
  
  console.log('🔐 Hashing new password...');
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  console.log('📝 Updating admin user password in database...');
  const updated = await prisma.adminUser.update({
    where: { email: 'sales@livatosolutions.com' },
    data: { password: hashedPassword }
  });
  
  console.log('\n✅ Password updated successfully!');
  console.log('\n📋 Login Credentials:');
  console.log('   URL: http://localhost:3002/login/admin');
  console.log('   Email: sales@livatosolutions.com');
  console.log('   Password: 111aaa###$A');
  console.log('\nHashed password:', hashedPassword);
  
  await prisma.$disconnect();
}

updatePassword().catch(console.error);
