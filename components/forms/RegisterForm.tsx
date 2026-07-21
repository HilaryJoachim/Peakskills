'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

type FormData = {
  fullName: string
  email: string
  phoneNumber: string
  organization: string
  jobTitle: string
  programName: string
  sessionDate: string
  numberOfParticipants: string
  additionalNotes: string
}

const INITIAL: FormData = {
  fullName: '', email: '', phoneNumber: '',
  organization: '', jobTitle: '',
  programName: '', sessionDate: '',
  numberOfParticipants: '1', additionalNotes: ''
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  border: '1.5px solid #DDE4EC', borderRadius: '6px',
  background: '#fff', color: '#1D2430',
  fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', lineHeight: 1.5,
  outline: 'none', transition: 'border-color 0.15s',
}

const readOnlyStyle: React.CSSProperties = {
  ...inputStyle,
  background: '#F4F7FA',
  color: '#5C6B7A',
  borderColor: '#DDE4EC',
  cursor: 'not-allowed',
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

interface RegisterFormProps {
  initialProgramName?: string
  initialSessionDate?: string
  initialLocation?: string
}

export default function RegisterForm({ initialProgramName = '', initialSessionDate = '', initialLocation = '' }: RegisterFormProps) {
  const isSessionValid = true // Allow registration even if no session is currently scheduled

  const [form, setForm] = useState<FormData>({
    ...INITIAL,
    programName: initialProgramName,
    sessionDate: initialSessionDate || 'To Be Announced (Register Interest)'
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [reference, setReference] = useState('')

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!('readOnly' in e.currentTarget) || !(e.currentTarget as any).readOnly) {
      (e.currentTarget as HTMLElement).style.borderColor = '#0077B6'
    }
  }
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!('readOnly' in e.currentTarget) || !(e.currentTarget as any).readOnly) {
      (e.currentTarget as HTMLElement).style.borderColor = '#DDE4EC'
    }
  }

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    const required: (keyof FormData)[] = ['fullName', 'email', 'phoneNumber']
    required.forEach(k => { if (!form[k].trim()) errs[k] = 'This field is required' })
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await fetch('https://formsubmit.co/ajax/kimsako22@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `Event Registration from ${form.fullName}`,
          ...form
        })
      })
      setReference(`PS-REG-${Math.floor(1000 + Math.random() * 9000)}`)
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('idle')
      alert("Failed to submit registration. Please try again.")
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <CheckCircle size={56} style={{ color: '#2ECC40', marginBottom: '20px' }} strokeWidth={1.5} />
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1D2430', margin: '0 0 12px' }}>
          Registration Submitted
        </h2>
        <div style={{ background: '#F4F7FA', borderRadius: '8px', padding: '16px', display: 'inline-block', margin: '0 auto 20px' }}>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: '15px', color: '#5C6B7A', margin: 0 }}>
            Reference Number: <strong style={{ color: '#1D2430' }}>{reference}</strong>
          </p>
        </div>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', lineHeight: 1.65, color: '#5C6B7A', maxWidth: '480px', margin: '0 auto 28px' }}>
          Thank you for your registration, {form.fullName}. A PeakSkills training coordinator will contact you shortly to confirm your participation and payment details.
        </p>
        <button
          onClick={() => { setForm({ ...INITIAL, programName: initialProgramName, sessionDate: initialSessionDate }); setStatus('idle') }}
          style={{
            background: '#1D2430', color: '#fff', padding: '11px 24px', borderRadius: '6px', border: 'none',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
          }}
        >
          Register Another Participant
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Session Details */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <legend style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', paddingBottom: '16px', borderBottom: '2px solid #DDE4EC', width: '100%', marginBottom: '4px' }}>
          Session Details
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          <Field label="Program Name">
            <input type="text" value={form.programName} readOnly
              style={readOnlyStyle} />
          </Field>
          <Field label="Session Date">
            <input type="text" value={form.sessionDate} readOnly
              style={{ ...readOnlyStyle, color: initialSessionDate ? '#5C6B7A' : '#F59E0B' }} />
            {initialLocation && (
              <p style={{ margin: '6px 0 0', fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A' }}>
                {initialLocation}
              </p>
            )}
          </Field>
        </div>
      </fieldset>

      {/* Participant Details */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <legend style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', paddingBottom: '16px', borderBottom: '2px solid #DDE4EC', width: '100%', marginBottom: '4px' }}>
          Participant Details
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
          <Field label="Organization / Company">
            <input type="text" value={form.organization} onChange={set('organization')}
              onFocus={focus} onBlur={blur}
              style={inputStyle} />
          </Field>
          <Field label="Job Title">
            <input type="text" value={form.jobTitle} onChange={set('jobTitle')}
              onFocus={focus} onBlur={blur}
              style={inputStyle} />
          </Field>
          <Field label="Number of Participants">
            <input type="number" min={1} value={form.numberOfParticipants} onChange={set('numberOfParticipants')}
              onFocus={focus} onBlur={blur}
              style={inputStyle} />
          </Field>
        </div>
        <Field label="Additional Notes">
          <textarea
            value={form.additionalNotes}
            onChange={set('additionalNotes')}
            onFocus={focus} onBlur={blur}
            rows={4}
            placeholder="Any special requirements, dietary preferences, or questions?"
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
          />
        </Field>
      </fieldset>

      {/* Required note */}
      <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: 0 }}>
        <span style={{ color: '#DC2626' }}>*</span> Required fields.
      </p>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: status === 'loading' ? '#A9B4C2' : '#0077B6', color: '#fff',
            padding: '14px 32px', borderRadius: '6px', border: 'none',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px',
            cursor: status === 'loading' ? 'wait' : 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#005F8E' }}
          onMouseLeave={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#0077B6' }}
        >
          <Send size={16} />
          {status === 'loading' ? 'Submitting…' : 'Submit Registration'}
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
