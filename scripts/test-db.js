const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  console.log('🔌 Testing database connection...')
  
  try {
    // Simple query to test connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database connection successful!')
    console.log('Result:', result)
    
    // Try to get user count
    const userCount = await prisma.user.count()
    console.log(`📊 User count: ${userCount}`)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    
    // Check if tables need to be created
    if (error.message.includes('relation') && error.message.includes('does not exist')) {
      console.log('💡 Tables might not exist yet. Run: npx prisma db push')
    }
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
