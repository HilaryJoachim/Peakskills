'use client'

import { useState, useRef, useEffect } from 'react'
import { Save, User, CheckCircle2, AlertCircle } from 'lucide-react'
import { updateStudentProfile } from '@/app/portal/settings/actions'
import { useRouter } from 'next/navigation'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px',
  border: '1.5px solid #DDE4EC', borderRadius: '8px',
  background: '#fff', color: '#1D2430',
  fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px',
  outline: 'none', transition: 'border-color 0.15s',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: 'IBM Plex Sans, sans-serif',
  fontWeight: 600, fontSize: '14px', color: '#1D2430', marginBottom: '8px',
}

export default function SettingsForm({ initialData, studentId }: { initialData: any, studentId: string }) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (studentId) {
      const savedAvatar = localStorage.getItem(`avatar_${studentId}`)
      if (savedAvatar) setAvatar(savedAvatar)
    }
  }, [studentId])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 50 * 1024) {
      setErrorMessage('Image size must be less than 50KB')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      setAvatar(base64String)
      if (studentId) {
        localStorage.setItem(`avatar_${studentId}`, base64String)
        window.dispatchEvent(new CustomEvent('avatarUpdated', { detail: { studentId, avatar: base64String } }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setAvatar(null)
    if (studentId) {
      localStorage.removeItem(`avatar_${studentId}`)
      window.dispatchEvent(new CustomEvent('avatarUpdated', { detail: { studentId, avatar: null } }))
    }
  }

  const [form, setForm] = useState({
    fullName: initialData.full_name || '',
    email: initialData.email || '',
    phone: initialData.phone_number || '',
    dateOfBirth: '1998-05-15', // Mocked until added to DB schema
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#0077B6'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#DDE4EC'
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    setErrorMessage('')
    
    try {
      await updateStudentProfile({
        fullName: form.fullName,
        phone: form.phone,
        dateOfBirth: form.dateOfBirth
      })
      setStatus('saved')
      router.refresh() // Refresh layout to update sidebar name
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error: any) {
      console.error(error)
      setErrorMessage(error.message || 'Failed to update')
      setStatus('error')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1D2430', margin: '0 0 8px' }}>
          Personal Details
        </h2>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#5C6B7A', margin: 0 }}>
          Manage your account information and contact details.
        </p>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #EEF1F5', borderRadius: '12px', padding: '32px' }}>
        
        {/* Profile Avatar Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #EEF1F5' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F4F7FA', color: '#0077B6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {avatar ? (
              <img src={avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={36} />
            )}
          </div>
          <div>
            <h3 style={{ margin: '0 0 8px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '18px', color: '#1D2430' }}>
              Profile Photo
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleImageUpload} 
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{ background: '#F4F7FA', color: '#1D2430', border: '1px solid #DDE4EC', padding: '8px 16px', borderRadius: '8px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                Upload New
              </button>
              <button 
                type="button"
                onClick={handleRemoveImage}
                style={{ background: 'transparent', color: '#dc2626', border: 'none', padding: '8px 16px', borderRadius: '8px', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                Remove
              </button>
            </div>
            <span style={{ fontSize: '12px', color: '#5C6B7A', marginTop: '8px', display: 'block', fontFamily: 'Source Sans 3, sans-serif' }}>
              Max size: 50KB
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text" name="fullName" value={form.fullName}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                style={inputStyle} required
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email" name="email" value={form.email}
                disabled
                style={{ ...inputStyle, background: '#F9FAFB', color: '#A9B4C2', cursor: 'not-allowed' }}
              />
              <span style={{ fontSize: '12px', color: '#5C6B7A', marginTop: '6px', display: 'block', fontFamily: 'Source Sans 3, sans-serif' }}>
                Email cannot be changed directly. Contact support if you need to update it.
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel" name="phone" value={form.phone}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                style={inputStyle} required
              />
            </div>
            <div>
              <label style={labelStyle}>Date of Birth</label>
              <input
                type="date" name="dateOfBirth" value={form.dateOfBirth}
                onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
                style={inputStyle} required
              />
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="submit"
              disabled={status === 'saving'}
              style={{
                background: '#0077B6', color: '#ffffff',
                padding: '12px 24px', borderRadius: '8px', border: 'none',
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px',
                cursor: status === 'saving' ? 'wait' : 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { if (status !== 'saving') (e.currentTarget as HTMLElement).style.background = '#005F8E' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0077B6' }}
            >
              <Save size={16} />
              {status === 'saving' ? 'Saving...' : 'Save Changes'}
            </button>
            
            {status === 'saved' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px' }}>
                <CheckCircle2 size={16} /> Profile updated!
              </span>
            )}
            {status === 'error' && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px' }}>
                <AlertCircle size={16} /> {errorMessage}
              </span>
            )}
          </div>
        </form>

      </div>
    </div>
  )
}
