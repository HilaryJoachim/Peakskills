'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Check, X, Eye, FileText } from 'lucide-react'
import { getApplications, approveApplication, rejectApplication, markAsPaid } from './actions'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [selectedApp, setSelectedApp] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setIsLoading(true)
    const apps = await getApplications()
    setApplications(apps)
    setIsLoading(false)
  }

  const filteredApps = applications.filter(app => 
    app.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    app.email?.toLowerCase().includes(search.toLowerCase()) ||
    app.id?.toLowerCase().includes(search.toLowerCase())
  )

  async function handleApprove(id: string) {
    await approveApplication(id)
    setSelectedApp(null)
    loadData()
  }

  async function handleReject(id: string) {
    await rejectApplication(id)
    setSelectedApp(null)
    loadData()
  }

  async function handleMarkAsPaid(id: string) {
    await markAsPaid(id)
    setSelectedApp(null)
    loadData()
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#5C6B7A' }}>Loading applications...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '24px', color: '#F8FAFC', margin: '0 0 8px' }}>
            Applications
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: 0 }}>
            Review and manage student registration requests.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
            <input
              type="text"
              placeholder="Search applications..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '10px 16px 10px 36px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.2)',
                color: '#F8FAFC',
                fontSize: '14px',
                width: '240px',
                outline: 'none',
              }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#F8FAFC' }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>App ID</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Student</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Program & Mode</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map(app => (
              <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#94A3B8', fontFamily: 'monospace' }}>{app.id?.split('-')[0]}</td>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#F8FAFC' }}>{app.full_name}</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>{app.email}</p>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ margin: 0, fontSize: '14px', color: '#F8FAFC' }}>{app.program?.title || 'Custom Program'}</p>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: app.learning_mode === 'Online' ? '#60A5FA' : '#FCD34D' }}>{app.learning_mode}</span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  {(() => {
                    const studentStatus = Array.isArray(app.student) ? app.student[0]?.status : app.student?.status
                    const finalStatus = studentStatus || app.status
                    let bg = '#FEF2F2', color = '#DC2626'
                    if (finalStatus === 'Application Submitted' || finalStatus === 'Under Review') { bg = '#FFFBEB'; color = '#D97706' }
                    else if (finalStatus === 'Approved - Awaiting Payment') { bg = '#ECFDF5'; color = '#059669' }
                    else if (finalStatus === 'Active Student') { bg = '#EFF6FF'; color = '#2563EB' }
                    return (
                      <span style={{ 
                        padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                        background: bg, color: color
                      }}>
                        {finalStatus}
                      </span>
                    )
                  })()}
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button 
                    onClick={() => setSelectedApp(app)}
                    style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', fontWeight: 600, color: '#F8FAFC', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
            {filteredApps.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal / Sliding Panel */}
      {selectedApp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '400px', background: '#0F172A', height: '100%', boxShadow: '-4px 0 24px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#F8FAFC' }}>Review Application</h3>
              <button onClick={() => setSelectedApp(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Applicant</label>
                  <p style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 600, color: '#F8FAFC' }}>{selectedApp.full_name}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#94A3B8' }}>{selectedApp.email}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#94A3B8' }}>{selectedApp.phone_number}</p>
                </div>
                
                <div>
                  <label style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Professional Details</label>
                  <p style={{ margin: '4px 0 0', fontSize: '15px', color: '#F8FAFC' }}>{selectedApp.job_title} at {selectedApp.organization}</p>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Program Details</label>
                  <p style={{ margin: '4px 0 0', fontSize: '15px', color: '#F8FAFC' }}>{selectedApp.program?.title}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#94A3B8' }}>Mode: {selectedApp.learning_mode}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#94A3B8' }}>Participants: {selectedApp.participants_count}</p>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255,255,255,0.02)' }}>
              {(() => {
                const studentStatus = Array.isArray(selectedApp.student) ? selectedApp.student[0]?.status : selectedApp.student?.status
                const currentStatus = studentStatus || selectedApp.status

                if (currentStatus === 'Application Submitted' || currentStatus === 'Under Review') {
                  return (
                    <>
                      <button onClick={() => handleApprove(selectedApp.id)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#10B981', color: '#fff', border: 'none', fontWeight: 600, fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <Check size={18} /> Approve & Enroll
                      </button>
                      <button onClick={() => handleReject(selectedApp.id)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'transparent', color: '#EF4444', border: '1px solid #EF4444', fontWeight: 600, fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                        <X size={18} /> Reject
                      </button>
                    </>
                  )
                } else if (currentStatus === 'Approved - Awaiting Payment') {
                  return (
                    <button onClick={() => handleMarkAsPaid(selectedApp.id)} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#3B82F6', color: '#fff', border: 'none', fontWeight: 600, fontSize: '15px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      <Check size={18} /> Mark as Paid
                    </button>
                  )
                } else {
                  return (
                    <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: '#94A3B8', fontSize: '14px', fontWeight: 500 }}>
                      Status: {currentStatus}
                    </div>
                  )
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
