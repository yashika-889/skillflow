import connectDB from '../lib/db.mjs';

async function testConnection() {
  try {
    await connectDB();
    console.log('✨ MongoDB Atlas connection test successful!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB Atlas connection test failed:', error);
    process.exit(1);
  }
}

testConnection();