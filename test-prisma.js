// Test Prisma connection
require('dotenv').config();

async function testPrisma() {
  try {
    // Dynamically import Prisma
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    console.log('Testing Prisma connection...');
    await prisma.$connect();
    console.log('✅ Prisma connected successfully');
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Query result:', result);
    
    await prisma.$disconnect();
    console.log('Test completed');
  } catch (error) {
    console.error('❌ Prisma error:', error.message);
    console.error('Full error:', error);
  }
}

testPrisma();
