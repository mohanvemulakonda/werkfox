// Test database connection
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 Testing connection to Hostinger MySQL...');
    console.log('Host:', process.env.DATABASE_URL?.includes('srv1428') ? 'srv1428.hstgr.io' : 'Not found');

    await prisma.$connect();
    console.log('✅ Successfully connected to database!');

    await prisma.$disconnect();
    console.log('✅ Connection test passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
