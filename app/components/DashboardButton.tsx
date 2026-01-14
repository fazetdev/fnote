'use client'
import Link from 'next/link'

interface DashboardButtonProps {
  label: string
  href: string
  emoji?: string
}

export default function DashboardButton({ label, href, emoji }: DashboardButtonProps) {
  return (
    <Link href={href}>
      <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:scale-105 transform transition">
        {emoji && <span className="mr-2 text-lg">{emoji}</span>}
        {label}
      </button>
    </Link>
  )
}
