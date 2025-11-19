/**
 * Script to create the first admin user
 * Run with: npx tsx scripts/create-admin-user.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Configuration - CHANGE THESE VALUES
    const adminEmail = 'admin@livatosolutions.com';
    const adminPassword = 'ChangeThisPassword123!'; // CHANGE THIS!
    const adminName = 'Super Admin';

    console.log('Creating admin user...');

    // Check if user already exists
    const existingUser = await prisma.adminUser.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      console.log('❌ User already exists with email:', adminEmail);
      process.exit(1);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the admin user
    const user = await prisma.adminUser.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'SUPER_ADMIN',
        isActive: true,
        canApproveInvoices: true,
        canCreateInvoices: true,
        canCreateLeads: true,
        canEditLeads: true,
        canDeleteLeads: true,
        canViewAllLeads: true,
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('\nYou can now login at: /admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
