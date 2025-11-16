import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'sales@livatosolutions.com';
  const password = 'Livato@2024'; // Change this after first login!
  const name = 'Sales Team';

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if admin already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log(`❌ Admin user ${email} already exists`);
    return;
  }

  // Create admin user
  const admin = await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN',
      isActive: true
    }
  });

  console.log('✅ Admin user created successfully!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${password}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚠️  IMPORTANT: Change this password after first login!');
  console.log('');
  console.log(`🌐 Login at: http://localhost:3002/admin/login`);
}

main()
  .catch((e) => {
    console.error('Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
