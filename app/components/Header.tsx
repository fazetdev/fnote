'use client'
import Link from 'next/link'

interface HeaderProps {
  pageTitle: string
}

export default function Header({ pageTitle }: HeaderProps) {
  const handleLogout = () => {
    // Clear localStorage (or any auth logic)
    localStorage.clear()
    // Redirect to home page
    window.location.href = '/'
  }

  return (
    <header className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow mb-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            ← Dashboard
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  )
}
