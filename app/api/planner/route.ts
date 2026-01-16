import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const INITIAL_USER_ID = 'init-user-id'

async function ensureAndGetUser() {
  return await prisma.user.upsert({
    where: { id: INITIAL_USER_ID },
    update: {},
    create: {
      id: INITIAL_USER_ID,
      email: 'init@example.com',
      password: 'initial-dummy-password',
    },
  })
}

export async function GET(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const plans = await prisma.dailyPlan.findMany({
      where: { userId: user.id },
      include: { tasks: true },
      orderBy: { date: 'desc' }
    })
    return NextResponse.json(plans)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const body = await request.json()
    const { date, focus, tasks = [] } = body

    if (!date) return NextResponse.json({ error: 'Date required' }, { status: 400 })

    const dateObj = new Date(date)

    let plan = await prisma.dailyPlan.findFirst({
      where: { 
        date: dateObj,
        userId: user.id 
      }
    })

    if (plan) {
      plan = await prisma.dailyPlan.update({
        where: { id: plan.id },
        data: { focus }
      })
    } else {
      plan = await prisma.dailyPlan.create({
        data: { 
          date: dateObj, 
          focus, 
          userId: user.id 
        }
      })
    }

    // Creating a constant here ensures TypeScript knows it cannot be null 
    // inside the map function scope below.
    const activePlanId = plan.id

    await prisma.task.deleteMany({ where: { planId: activePlanId } })
    
    if (tasks.length > 0) {
      await prisma.task.createMany({
        data: tasks.map((t: any) => ({
          text: t.text,
          completed: !!t.completed,
          time: t.time || '09:00',
          priority: t.priority || 'medium',
          planId: activePlanId
        }))
      })
    }

    const updatedPlan = await prisma.dailyPlan.findUnique({
      where: { id: activePlanId },
      include: { tasks: true }
    })

    return NextResponse.json(updatedPlan)
  } catch (error) {
    console.error('Planner sync error:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
