// Setup database tables
require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

console.log('🔄 Setting up database on Hostinger MySQL...');
console.log('Host: srv1428.hstgr.io');
console.log('Database: u859308447_Livato\n');

try {
  // Set the DATABASE_URL with URL-encoded password for Prisma
  // Password: 111aaa###$A -> URL encoded: %23=%23=%23=%24
  const dbUrl = 'mysql://u859308447_livato_user:111aaa%23%23%23%24A@srv1428.hstgr.io:3306/u859308447_Livato';

  process.env.DATABASE_URL = dbUrl;

  console.log('Running: prisma db push...\n');

  execSync('npx prisma db push', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: dbUrl
    }
  });

  console.log('\n✅ Database setup completed successfully!');
  console.log('✅ All tables created on Hostinger MySQL');

} catch (error) {
  console.error('\n❌ Database setup failed:', error.message);
  process.exit(1);
}
