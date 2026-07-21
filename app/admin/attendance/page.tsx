'use client'

import { useEffect, useState } from 'react'
import { getCohortsForDropdown, getSessionsByCohort, getStudentsByCohort, getAttendanceRecords, saveAttendance } from './actions'
import { Save, CheckCircle } from 'lucide-react'

export default function AttendancePage() {
  const [cohorts, setCohorts] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  
  const [selectedCohort, setSelectedCohort] = useState('')
  const [selectedSession, setSelectedSession] = useState('')
  
  const [attendanceState, setAttendanceState] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    getCohortsForDropdown().then(setCohorts)
  }, [])

  useEffect(() => {
    if (selectedCohort) {
      getSessionsByCohort(selectedCohort).then(setSessions)
      getStudentsByCohort(selectedCohort).then(setStudents)
    } else {
      setSessions([])
      setStudents([])
    }
    setSelectedSession('')
  }, [selectedCohort])

  useEffect(() => {
    if (selectedSession) {
      getAttendanceRecords(selectedSession).then(records => {
        const newState: Record<string, string> = {}
        records.forEach((r: any) => {
          newState[r.student_id] = r.status
        })
        setAttendanceState(newState)
      })
    } else {
      setAttendanceState({})
    }
    setSaveSuccess(false)
  }, [selectedSession])

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceState(prev => ({ ...prev, [studentId]: status }))
    setSaveSuccess(false)
  }

  const handleSave = async () => {
    if (!selectedSession) return
    setIsSaving(true)
    
    // Default to 'Present' for students with no explicit state yet
    const records = students.map(student => ({
      sessionId: selectedSession,
      studentId: student.id,
      status: attendanceState[student.id] || 'Present'
    }))
    
    try {
      await saveAttendance(records)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      alert('Failed to save attendance. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
      
      <div>
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '24px', color: '#F8FAFC', margin: '0 0 8px' }}>
          Mark Attendance
        </h2>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: 0 }}>
          Select a cohort and session to record student attendance.
        </p>
      </div>

      <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#F8FAFC', marginBottom: '8px' }}>1. Select Cohort</label>
          <select 
            value={selectedCohort} 
            onChange={e => setSelectedCohort(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', outline: 'none', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC' }}
          >
            <option value="">-- Choose Cohort --</option>
            {cohorts.map(c => (
              <option key={c.id} value={c.id}>{c.program?.title} - {new Date(c.start_date).toLocaleDateString()} Cohort</option>
            ))}
          </select>
        </div>
        
        <div style={{ flex: 1, opacity: selectedCohort ? 1 : 0.5, pointerEvents: selectedCohort ? 'auto' : 'none' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#F8FAFC', marginBottom: '8px' }}>2. Select Session</label>
          <select 
            value={selectedSession} 
            onChange={e => setSelectedSession(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', outline: 'none', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC' }}
          >
            <option value="">-- Choose Session --</option>
            {sessions.map(s => <option key={s.id} value={s.id}>{s.title} ({new Date(s.date).toLocaleDateString()})</option>)}
          </select>
        </div>
      </div>

      {selectedSession && (
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#F8FAFC' }}>Student Checklist</h3>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              style={{ padding: '10px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', border: 'none', fontWeight: 600, fontSize: '14px', cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isSaving ? 0.7 : 1, boxShadow: '0 4px 12px rgba(15, 175, 175, 0.2)' }}
            >
              {saveSuccess ? <><CheckCircle size={16} /> Saved Successfully</> : <><Save size={16} /> Save Attendance</>}
            </button>
          </div>

          {students.length > 0 ? (
            <div style={{ padding: '8px 24px' }}>
              {students.map(student => {
                const currentStatus = attendanceState[student.id] || 'Present' // Default UI state if not set

                return (
                  <div key={student.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#F8FAFC' }}>{student.application?.full_name}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94A3B8' }}>{student.id} &bull; {student.application?.learning_mode}</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleStatusChange(student.id, 'Present')}
                        style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid',
                          background: currentStatus === 'Present' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)',
                          borderColor: currentStatus === 'Present' ? '#10B981' : 'rgba(255,255,255,0.1)',
                          color: currentStatus === 'Present' ? '#34D399' : '#94A3B8'
                        }}
                      >
                        Present
                      </button>
                      <button 
                        onClick={() => handleStatusChange(student.id, 'Absent')}
                        style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid',
                          background: currentStatus === 'Absent' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                          borderColor: currentStatus === 'Absent' ? '#EF4444' : 'rgba(255,255,255,0.1)',
                          color: currentStatus === 'Absent' ? '#F87171' : '#94A3B8'
                        }}
                      >
                        Absent
                      </button>
                      <button 
                        onClick={() => handleStatusChange(student.id, 'Late')}
                        style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: '1px solid',
                          background: currentStatus === 'Late' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)',
                          borderColor: currentStatus === 'Late' ? '#F59E0B' : 'rgba(255,255,255,0.1)',
                          color: currentStatus === 'Late' ? '#FBBF24' : '#94A3B8'
                        }}
                      >
                        Late
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
              No active students found in this cohort.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
