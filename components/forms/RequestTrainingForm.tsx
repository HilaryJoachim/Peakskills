'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, CheckCircle } from 'lucide-react'

type Program = { id: string; title: string }
type Cohort = { id: string; program_id: string; start_date: string; location: string | null }

type FormData = {
  fullName: string
  email: string
  phoneNumber: string
  organization: string
  jobTitle: string
  programId: string
  sessionId: string
  learningMode: string
}

const INITIAL: FormData = {
  fullName: '', email: '', phoneNumber: '', organization: '', jobTitle: '',
  programId: '', sessionId: '', learningMode: 'Physical'
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  border: '1.5px solid #DDE4EC', borderRadius: '6px',
  background: '#fff', color: '#1D2430',
  fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', lineHeight: 1.5,
  outline: 'none', transition: 'border-color 0.15s',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: 'IBM Plex Sans, sans-serif',
  fontWeight: 600, fontSize: '14px', color: '#1D2430', marginBottom: '6px',
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}{required && <span style={{ color: '#DC2626', marginLeft: '3px' }} aria-hidden>*</span>}
      </label>
      {children}
    </div>
  )
}

function FormStateUpdater({ 
  setForm, 
  programs, 
  cohorts 
}: { 
  setForm: React.Dispatch<React.SetStateAction<FormData>>, 
  programs: Program[], 
  cohorts: Cohort[] 
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const programParam = searchParams.get('program')
    const cohortParam = searchParams.get('cohort')
    
    // We try to match by title (case-insensitive) or by ID
    let foundProgramId = ''
    if (programParam) {
      const p = programs.find(p => p.title.toLowerCase() === programParam.toLowerCase() || p.id === programParam)
      if (p) foundProgramId = p.id
    }

    let foundSessionId = ''
    if (foundProgramId && cohortParam) {
      // Find a cohort for this program whose formatted title or id matches the param
      const available = cohorts.filter(c => c.program_id === foundProgramId)
      // The URL usually passes something like "October 2026 Leadership Cohort"
      // Wait, since we don't have the title in the cohort object, let's just find the first available cohort, 
      // or match by ID if it's passed.
      const match = available.find(c => c.id === cohortParam)
      if (match) {
        foundSessionId = match.id
      } else if (available.length > 0) {
        // If we can't match by ID (because URL passes string title), just pick the first available cohort for now
        // to save the user from having to select it manually if there's an obvious one.
        foundSessionId = available[0].id
      }
    }

    setForm(prev => {
      const next = { ...prev }
      if (foundProgramId) next.programId = foundProgramId
      if (foundSessionId) next.sessionId = foundSessionId
      return next
    })
  }, [searchParams, programs, cohorts, setForm])

  return null
}

export default function RequestTrainingForm({ programs, cohorts }: { programs: Program[], cohorts: Cohort[] }) {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => {
      const next = { ...prev, [key]: e.target.value }
      if (key === 'programId') {
        next.sessionId = '' // reset session when program changes
      }
      return next
    })

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = '#0077B6'
  }
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = '#DDE4EC'
  }

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    const required: (keyof FormData)[] = ['fullName', 'email', 'phoneNumber', 'organization', 'jobTitle', 'programId', 'sessionId', 'learningMode']
    required.forEach(k => { if (!form[k]?.trim()) errs[k] = 'This field is required' })
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.details || data.error || 'Submission failed')
      setStatus('success')
    } catch (error: any) {
      console.error(error)
      setStatus('idle')
      alert(`Failed to send request: ${error.message}`)
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <CheckCircle size={56} style={{ color: '#2ECC40', marginBottom: '20px' }} strokeWidth={1.5} />
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1D2430', margin: '0 0 12px' }}>
          Application received
        </h2>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', lineHeight: 1.65, color: '#5C6B7A', maxWidth: '480px', margin: '0 auto 28px' }}>
          Thank you, {form.fullName}. Your application has been received successfully. Our admissions team will review it shortly.
        </p>
        <button
          onClick={() => { setForm(INITIAL); setStatus('idle') }}
          style={{
            background: '#1D2430', color: '#fff', padding: '11px 24px', borderRadius: '6px', border: 'none',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
          }}
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  const availableCohorts = cohorts.filter(c => c.program_id === form.programId)

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Suspense fallback={null}>
        <FormStateUpdater setForm={setForm} programs={programs} cohorts={cohorts} />
      </Suspense>
      
      {/* Applicant Details */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <legend style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', paddingBottom: '16px', borderBottom: '2px solid #DDE4EC', width: '100%', marginBottom: '4px' }}>
          Applicant Details
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
          <Field label="Full Name" required>
            <input type="text" value={form.fullName} onChange={set('fullName')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.fullName ? '#DC2626' : '#DDE4EC' }} aria-required />
            {errors.fullName && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.fullName}</span>}
          </Field>
          <Field label="Email Address" required>
            <input type="email" value={form.email} onChange={set('email')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.email ? '#DC2626' : '#DDE4EC' }} aria-required />
            {errors.email && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
          </Field>
          <Field label="Phone Number" required>
            <input type="tel" value={form.phoneNumber} onChange={set('phoneNumber')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.phoneNumber ? '#DC2626' : '#DDE4EC' }} aria-required />
            {errors.phoneNumber && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.phoneNumber}</span>}
          </Field>
        </div>
      </fieldset>

      {/* Professional Details */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <legend style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', paddingBottom: '16px', borderBottom: '2px solid #DDE4EC', width: '100%', marginBottom: '4px' }}>
          Professional Details
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
          <Field label="Organization" required>
            <input type="text" value={form.organization} onChange={set('organization')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.organization ? '#DC2626' : '#DDE4EC' }} aria-required />
            {errors.organization && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.organization}</span>}
          </Field>
          <Field label="Job Title" required>
            <input type="text" value={form.jobTitle} onChange={set('jobTitle')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.jobTitle ? '#DC2626' : '#DDE4EC' }} aria-required />
            {errors.jobTitle && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.jobTitle}</span>}
          </Field>
        </div>
      </fieldset>

      {/* Program Selection */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <legend style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', paddingBottom: '16px', borderBottom: '2px solid #DDE4EC', width: '100%', marginBottom: '4px' }}>
          Training Selection
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
          <Field label="Program" required>
            <select value={form.programId} onChange={set('programId')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.programId ? '#DC2626' : '#DDE4EC', cursor: 'pointer' }} aria-required>
              <option value="">Select a program</option>
              {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
            {errors.programId && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.programId}</span>}
          </Field>
          <Field label="Session" required>
            <select value={form.sessionId} onChange={set('sessionId')} disabled={!form.programId}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.sessionId ? '#DC2626' : '#DDE4EC', cursor: form.programId ? 'pointer' : 'not-allowed', opacity: form.programId ? 1 : 0.6 }} aria-required>
              <option value="">Select a session</option>
              {availableCohorts.map(c => <option key={c.id} value={c.id}>{new Date(c.start_date).toLocaleDateString()} — {c.location}</option>)}
            </select>
            {errors.sessionId && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.sessionId}</span>}
          </Field>
          <Field label="Learning Mode" required>
            <select value={form.learningMode} onChange={set('learningMode')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.learningMode ? '#DC2626' : '#DDE4EC', cursor: 'pointer' }} aria-required>
              <option value="Physical">Physical (In-Person)</option>
              <option value="Online">Online / Virtual</option>
            </select>
            {errors.learningMode && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.learningMode}</span>}
          </Field>
        </div>
      </fieldset>

      <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: 0 }}>
        <span style={{ color: '#DC2626' }}>*</span> Required fields. We will review your application and respond shortly.
      </p>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: '#0077B6', color: '#fff',
            padding: '14px 32px', borderRadius: '6px', border: 'none',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px',
            cursor: status === 'loading' ? 'wait' : 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#005F8E' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0077B6' }}
        >
          <Send size={16} />
          {status === 'loading' ? 'Submitting…' : 'Submit Application'}
        </button>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  )
}
