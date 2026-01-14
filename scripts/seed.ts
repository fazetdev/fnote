import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')
  
  // Clear existing data
  await prisma.syncLog.deleteMany()
  await prisma.learnedItem.deleteMany()
  await prisma.thought.deleteMany()
  await prisma.task.deleteMany()
  await prisma.dailyPlan.deleteMany()
  await prisma.goal.deleteMany()
  await prisma.note.deleteMany()
  await prisma.user.deleteMany()
  
  // Create test user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'hashed_password_here', // In production, use bcrypt
    },
  })
  
  console.log(`👤 Created user: ${user.email}`)
  
  // Create sample notes
  const notes = await prisma.note.createMany({
    data: [
      {
        userId: user.id,
        title: 'Project Ideas 2024',
        content: 'Build a note-taking app with offline support...',
        category: 'ideas',
        tags: ['planning', 'development'],
      },
      {
        userId: user.id,
        title: 'Learning Goals',
        content: 'Focus on TypeScript and Next.js this quarter...',
        category: 'growth',
        tags: ['learning', 'goals'],
      },
    ],
  })
  
  console.log(`📝 Created ${notes.count} notes`)
  
  // Create sample goals with hierarchy
  const yearlyGoal = await prisma.goal.create({
    data: {
      userId: user.id,
      title: 'Master Full Stack Development',
      description: 'Become proficient in modern web development',
      type: 'yearly',
      targetDate: new Date('2024-12-31'),
      progress: 30,
      status: 'in-progress',
      periodLabel: '2024',
    },
  })
  
  const quarterlyGoal = await prisma.goal.create({
    data: {
      userId: user.id,
      title: 'Learn Next.js 13',
      description: 'Master Next.js App Router and new features',
      type: 'quarterly',
      targetDate: new Date('2024-03-31'),
      progress: 70,
      status: 'in-progress',
      periodLabel: 'Q1',
      parentId: yearlyGoal.id,
    },
  })
  
  console.log('🎯 Created goals with hierarchy')
  
  // Create today's plan
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const plan = await prisma.dailyPlan.create({
    data: {
      userId: user.id,
      date: today,
      focus: 'Complete the database setup',
      tasks: {
        create: [
          {
            text: 'Set up Prisma schema',
            time: '09:00',
            priority: 'high',
            completed: true,
          },
          {
            text: 'Test database connection',
            time: '10:00',
            priority: 'medium',
            completed: false,
          },
        ],
      },
    },
  })
  
  console.log(`📅 Created daily plan for ${plan.date.toLocaleDateString()}`)
  
  // Create sample thoughts
  const thoughts = await prisma.thought.createMany({
    data: [
      {
        userId: user.id,
        content: 'Offline-first apps provide better user experience',
        type: 'insight',
        mood: '🤔',
        tags: ['development', 'ux'],
        date: today,
      },
      {
        userId: user.id,
        content: 'Progress tracking should be visual and intuitive',
        type: 'observation',
        mood: '🎯',
        tags: ['design', 'productivity'],
        date: today,
      },
    ],
  })
  
  console.log(`💭 Created ${thoughts.count} thoughts`)
  
  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
