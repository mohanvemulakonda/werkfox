// Direct MySQL connection test (bypassing Prisma)
const mysql = require('mysql2/promise');

async function testDirectConnection() {
  try {
    console.log('🔄 Testing direct MySQL connection...');

    const connection = await mysql.createConnection({
      host: 'srv1428.hstgr.io',
      port: 3306,
      user: 'u859308447_livato_user',
      password: '111aaa###$A',
      database: 'u859308447_Livato',
      connectTimeout: 10000
    });

    console.log('✅ Connected successfully!');

    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query executed:', rows);

    await connection.end();
    console.log('✅ Connection closed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error sqlState:', error.sqlState);
    process.exit(1);
  }
}

testDirectConnection();
