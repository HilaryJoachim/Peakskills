'use client'

import { useEffect, useState } from 'react'
import { getTrainingSessions, getCohortsForDropdown, createTrainingSession, updateTrainingSession, updateSessionLink } from './actions'
import { Plus, Search, Video, MapPin, Users, Calendar, Clock, X } from 'lucide-react'

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [cohorts, setCohorts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Edit Details State
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null)

  // Edit Link State
  const [editingLinkSession, setEditingLinkSession] = useState<any>(null)
  const [linkValue, setLinkValue] = useState('')
  
  // Form State
  const [formData, setFormData] = useState({
    cohort_id: '',
    title: '',
    date: '',
    time: '',
    trainer: '',
    venue: 'Virtual',
    meeting_link: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setIsLoading(true)
    const [sess, cohs] = await Promise.all([getTrainingSessions(), getCohortsForDropdown()])
    setSessions(sess)
    setCohorts(cohs)
    setIsLoading(false)
  }

  const filteredSessions = sessions.filter(s => 
    s.title?.toLowerCase().includes(search.toLowerCase()) || 
    s.trainer?.toLowerCase().includes(search.toLowerCase()) ||
    s.cohort?.program?.title?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingSessionId) {
        await updateTrainingSession(editingSessionId, formData)
      } else {
        await createTrainingSession(formData)
      }
      setIsModalOpen(false)
      setEditingSessionId(null)
      setFormData({
        cohort_id: '',
        title: '',
        date: '',
        time: '',
        trainer: '',
        venue: 'Virtual',
        meeting_link: ''
      })
      await loadData()
    } catch (error) {
      alert('Failed to save session. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await updateSessionLink(editingLinkSession.id, linkValue)
      setEditingLinkSession(null)
      await loadData()
    } catch (error) {
      alert('Failed to update link. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#5C6B7A' }}>Loading sessions...</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '24px', color: '#F8FAFC', margin: '0 0 8px' }}>
            Training Sessions
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: 0 }}>
            Schedule and manage cohort sessions and meeting links.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding: '10px 16px 10px 36px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: '14px',
                width: '240px',
                outline: 'none',
                background: 'rgba(0,0,0,0.2)',
                color: '#F8FAFC'
              }}
            />
          </div>
          <button 
            onClick={() => {
              setEditingSessionId(null)
              setFormData({ cohort_id: '', title: '', date: '', time: '', trainer: '', venue: 'Virtual', meeting_link: '' })
              setIsModalOpen(true)
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#fff', boxShadow: '0 4px 12px rgba(15, 175, 175, 0.2)' }}>
            <Plus size={16} /> Create Session
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredSessions.map(session => (
          <div key={session.id} style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', gap: '24px', alignItems: 'center' }}>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ 
                  padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                  background: session.status === 'Completed' ? 'rgba(255,255,255,0.1)' : 'rgba(16, 185, 129, 0.2)',
                  color: session.status === 'Completed' ? '#94A3B8' : '#34D399'
                }}>
                  {session.status}
                </span>
                <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>{session.cohort?.program?.title} &bull; {session.cohort?.start_date ? new Date(session.cohort.start_date).toLocaleDateString() : ''} Cohort</span>
              </div>
              <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 600, color: '#F8FAFC' }}>
                {session.title}
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '14px', color: '#94A3B8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {new Date(session.date).toLocaleDateString()}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {session.time}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> {session.trainer}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {session.venue === 'Virtual' ? <Video size={16} /> : <MapPin size={16} />} 
                  {session.venue}
                </div>
              </div>
            </div>

            <div style={{ width: '1px', background: 'rgba(255,255,255,0.05)', alignSelf: 'stretch' }} />

            <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>Meeting Link / Location</label>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#60A5FA', fontWeight: 500, wordBreak: 'break-all' }}>
                  {session.meeting_link || 'Not generated yet'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => {
                    setEditingLinkSession(session)
                    setLinkValue(session.meeting_link || '')
                  }}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', fontWeight: 600, color: '#F8FAFC', cursor: 'pointer' }}>
                  Edit Link
                </button>
                <button 
                  onClick={() => {
                    setEditingSessionId(session.id)
                    setFormData({
                      cohort_id: session.cohort_id,
                      title: session.title,
                      date: session.date,
                      time: session.time,
                      trainer: session.trainer,
                      venue: session.venue,
                      meeting_link: session.meeting_link || ''
                    })
                    setIsModalOpen(true)
                  }}
                  style={{ flex: 1, padding: '8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '13px', fontWeight: 600, color: '#F8FAFC', cursor: 'pointer' }}>
                  Edit Details
                </button>
              </div>
            </div>

          </div>
        ))}
        {filteredSessions.length === 0 && (
          <div style={{ background: 'rgba(255, 255, 255, 0.015)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)', padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '15px' }}>
            No sessions found matching your search.
          </div>
        )}
      </div>

      {/* Quick Edit Link Modal */}
      {editingLinkSession && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '400px', background: '#0F172A', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#F8FAFC' }}>Update Meeting Link</h3>
              <button onClick={() => setEditingLinkSession(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleLinkSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>New Meeting Link / Location</label>
                <input 
                  type="text" required placeholder="https://meet.google.com/..."
                  value={linkValue} onChange={e => setLinkValue(e.target.value)}
                  style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setEditingLinkSession(null)} style={{ padding: '10px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#F8FAFC', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', border: 'none', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Saving...' : 'Save Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create / Edit Session Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '500px', background: '#0F172A', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#F8FAFC' }}>{editingSessionId ? 'Edit Session' : 'Create New Session'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>Course / Cohort</label>
                <select 
                  required
                  value={formData.cohort_id}
                  onChange={(e) => setFormData({...formData, cohort_id: e.target.value})}
                  style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
                >
                  <option value="">Select a cohort</option>
                  {cohorts.map(c => (
                    <option key={c.id} value={c.id}>{c.program?.title} - {new Date(c.start_date).toLocaleDateString()} Cohort</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>Session Title</label>
                <input 
                  type="text" required placeholder="e.g. Introduction to Leadership"
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>Date</label>
                  <input 
                    type="date" required
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>Time</label>
                  <input 
                    type="time" required
                    value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>Trainer Name</label>
                <input 
                  type="text" required placeholder="e.g. Jane Doe"
                  value={formData.trainer} onChange={e => setFormData({...formData, trainer: e.target.value})}
                  style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '120px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>Venue Type</label>
                  <select 
                    value={formData.venue} onChange={e => setFormData({...formData, venue: e.target.value})}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="Virtual">Virtual</option>
                    <option value="Physical">Physical</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8' }}>{formData.venue === 'Virtual' ? 'Meeting Link' : 'Location details'}</label>
                  <input 
                    type="text" placeholder={formData.venue === 'Virtual' ? 'https://meet.google.com/...' : 'Room 402, Building A'}
                    value={formData.meeting_link} onChange={e => setFormData({...formData, meeting_link: e.target.value})}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: '#F8FAFC', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', border: 'none', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Saving...' : (editingSessionId ? 'Save Changes' : 'Create Session')}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
