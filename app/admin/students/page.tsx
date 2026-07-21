'use client'

import { useEffect, useState } from 'react'
import { getStudents, updateStudentStatus, updatePaymentStatus } from './actions'
import { Search, Eye, X, BookOpen, Calendar, MapPin, AlertTriangle, CheckCircle } from 'lucide-react'

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setIsLoading(true)
    const st = await getStudents()
    setStudents(st)
    if (selectedStudent) {
      const updated = st.find((s: any) => s.id === selectedStudent.id)
      setSelectedStudent(updated || null)
    }
    setIsLoading(false)
  }

  const filteredStudents = students.filter(student => 
    student.application?.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    student.application?.email?.toLowerCase().includes(search.toLowerCase()) ||
    student.id?.toLowerCase().includes(search.toLowerCase())
  )

  async function handleStatusChange(status: string) {
    if (!selectedStudent) return
    await updateStudentStatus(selectedStudent.id, status)
    loadData()
  }

  async function handlePaymentChange(status: string) {
    if (!selectedStudent) return
    await updatePaymentStatus(selectedStudent.id, status)
    loadData()
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#5C6B7A' }}>Loading students...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '24px', color: '#F8FAFC', margin: '0 0 8px' }}>
            Students
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: 0 }}>
            Manage active and past students.
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
          <input
            type="text"
            placeholder="Search students..."
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
      </div>

      <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>ID</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Student</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Program & Cohort</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 24px', fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#F8FAFC', fontFamily: 'monospace', fontWeight: 600 }}>{student.id}</td>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#F8FAFC' }}>{student.application?.full_name}</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>{student.application?.email}</p>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <p style={{ margin: 0, fontSize: '14px', color: '#F8FAFC' }}>{student.application?.program?.title}</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                    {student.application?.session ? new Date(student.application?.session?.start_date).toLocaleDateString() : 'N/A'} &bull; {student.application?.learning_mode}
                  </p>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                      background: student.status === 'Active Student' ? '#ECFDF5' : student.status === 'Suspended' ? '#FEF2F2' : '#FFFBEB',
                      color: student.status === 'Active Student' ? '#059669' : student.status === 'Suspended' ? '#DC2626' : '#D97706'
                    }}>
                      {student.status}
                    </span>
                    <span style={{ 
                      padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)',
                      color: student.payment_status === 'Paid' ? '#10B981' : '#F87171'
                    }}>
                      {student.payment_status === 'Paid' ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button 
                    onClick={() => setSelectedStudent(student)}
                    style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', fontWeight: 600, color: '#F8FAFC', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Eye size={14} /> Profile
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Student Profile Panel */}
      {selectedStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '400px', background: '#0F172A', height: '100%', boxShadow: '-4px 0 24px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#F8FAFC' }}>Student Profile</h3>
              <button onClick={() => setSelectedStudent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
              
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', fontSize: '32px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 12px rgba(15, 175, 175, 0.2)' }}>
                  {selectedStudent.application?.full_name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                </div>
                <h4 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#F8FAFC' }}>{selectedStudent.application?.full_name}</h4>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#94A3B8' }}>{selectedStudent.application?.email}</p>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748B', fontFamily: 'monospace' }}>{selectedStudent.id}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Enrollment Details</label>
                  <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#F8FAFC' }}>
                      <BookOpen size={16} color="#94A3B8" /> {selectedStudent.application?.program?.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#F8FAFC' }}>
                      <Calendar size={16} color="#94A3B8" /> {selectedStudent.application?.session ? new Date(selectedStudent.application?.session?.start_date).toLocaleDateString() : 'N/A'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#F8FAFC' }}>
                      <MapPin size={16} color="#94A3B8" /> {selectedStudent.application?.learning_mode} Learning
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Payment Status</label>
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: selectedStudent.payment_status === 'Paid' ? '#10B981' : '#F87171' }}>
                      {selectedStudent.payment_status}
                    </span>
                    {selectedStudent.payment_status !== 'Paid' && (
                      <button onClick={() => handlePaymentChange('Paid')} style={{ padding: '6px 12px', borderRadius: '4px', background: '#10B981', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                        Mark as Paid
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Account Status</label>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: selectedStudent.status === 'Active Student' ? '#10B981' : selectedStudent.status === 'Suspended' ? '#EF4444' : '#F59E0B' }}>
                      {selectedStudent.status === 'Active Student' && <CheckCircle size={18} />}
                      {selectedStudent.status === 'Suspended' && <AlertTriangle size={18} />}
                      {selectedStudent.status}
                    </div>
                    {selectedStudent.status === 'Active Student' ? (
                      <button onClick={() => handleStatusChange('Suspended')} style={{ padding: '6px 16px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.1)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 600, cursor: 'pointer' }}>
                        Suspend Student
                      </button>
                    ) : selectedStudent.status === 'Suspended' ? (
                      <button onClick={() => handleStatusChange('Active Student')} style={{ padding: '6px 16px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.1)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.2)', fontWeight: 600, cursor: 'pointer' }}>
                        Activate Student
                      </button>
                    ) : null}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
