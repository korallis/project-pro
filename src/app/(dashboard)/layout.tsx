import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Project Pro</h1>
        </div>
        <nav className="mt-4">
          <a href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Dashboard
          </a>
          <a href="/dashboard/issues" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Issues
          </a>
          <a href="/dashboard/projects" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Projects
          </a>
          <a href="/dashboard/teams" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Teams
          </a>
          <a href="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
            Settings
          </a>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <form action="/auth/signout" method="post">
            <button type="submit" className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200">
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}