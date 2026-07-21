import AdminSidebar from '@/components/admin/AdminSidebar'
import { Bell } from 'lucide-react'
import { getAdminSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import IdleTimeout from '@/components/layout/IdleTimeout'

export const metadata = {
  title: 'Admin Portal | PeakSkills',
  description: 'Manage PeakSkills operations.',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()
  
  if (!session) {
    redirect('/admin-login')
  }

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #0B1120 0%, #0F172A 100%)', color: '#F8FAFC' }}>
      <IdleTimeout />
      <style dangerouslySetInnerHTML={{__html: `
        .admin-layout select option {
          background-color: #0F172A;
          color: #F8FAFC;
        }
      `}} />
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        
        {/* Top Header */}
        <header
          style={{
            height: '72px',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 800, fontSize: '18px', color: '#F8FAFC', margin: 0 }}>
              Administration
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '32px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
