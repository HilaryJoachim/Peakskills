'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

const INDUSTRIES = [
  'Banking & Financial Services', 'Government & Public Sector', 'NGO & Development Sector',
  'Telecommunications & Technology', 'Education & Research', 'Port, Transport & Logistics',
  'Healthcare', 'Manufacturing & Industry', 'Insurance', 'Other',
]

const DELIVERY_METHODS = ['In-Person (at our premises)', 'In-House (at your premises)', 'Online / Virtual', 'Hybrid (in-person + online)']
const BUDGET_RANGES = ['Under TZS 1 million', 'TZS 1–5 million', 'TZS 5–15 million', 'TZS 15–30 million', 'TZS 30 million +', 'To be discussed']

type FormData = {
  organizationName: string
  industry: string
  contactPerson: string
  position: string
  email: string
  phoneNumber: string
  numberOfParticipants: string
  trainingTopic: string
  preferredDeliveryMethod: string
  preferredDates: string
  trainingLocation: string
  budgetRange: string
  additionalRequirements: string
}

const INITIAL: FormData = {
  organizationName: '', industry: '', contactPerson: '', position: '',
  email: '', phoneNumber: '', numberOfParticipants: '', trainingTopic: '',
  preferredDeliveryMethod: '', preferredDates: '', trainingLocation: '',
  budgetRange: '', additionalRequirements: '',
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

export default function RequestTrainingForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = '#1E88E5'
  }
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = '#DDE4EC'
  }

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    const required: (keyof FormData)[] = ['organizationName', 'industry', 'contactPerson', 'position', 'email', 'phoneNumber', 'numberOfParticipants', 'trainingTopic', 'preferredDeliveryMethod']
    required.forEach(k => { if (!form[k].trim()) errs[k] = 'This field is required' })
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <CheckCircle size={56} style={{ color: '#2ECC40', marginBottom: '20px' }} strokeWidth={1.5} />
        <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1D2430', margin: '0 0 12px' }}>
          Request received
        </h2>
        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', lineHeight: 1.65, color: '#5C6B7A', maxWidth: '480px', margin: '0 auto 28px' }}>
          Thank you, {form.contactPerson}. A member of our training consultancy team will contact you within two working days to discuss your requirements.
        </p>
        <button
          onClick={() => { setForm(INITIAL); setStatus('idle') }}
          style={{
            background: '#1D2430', color: '#fff', padding: '11px 24px', borderRadius: '6px', border: 'none',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
          }}
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Section 1 — Organization */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <legend style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', paddingBottom: '16px', borderBottom: '2px solid #DDE4EC', width: '100%', marginBottom: '4px' }}>
          Organization Details
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
          <Field label="Organization Name" required>
            <input id="organizationName" type="text" value={form.organizationName} onChange={set('organizationName')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.organizationName ? '#DC2626' : '#DDE4EC' }}
              aria-required aria-describedby={errors.organizationName ? 'err-org' : undefined} />
            {errors.organizationName && <span id="err-org" role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.organizationName}</span>}
          </Field>
          <Field label="Industry" required>
            <select id="industry" value={form.industry} onChange={set('industry')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.industry ? '#DC2626' : '#DDE4EC', appearance: 'none', cursor: 'pointer' }}
              aria-required>
              <option value="">Select industry</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            {errors.industry && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.industry}</span>}
          </Field>
        </div>
      </fieldset>

      {/* Section 2 — Contact Person */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <legend style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', paddingBottom: '16px', borderBottom: '2px solid #DDE4EC', width: '100%', marginBottom: '4px' }}>
          Contact Person
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
          <Field label="Contact Person" required>
            <input type="text" value={form.contactPerson} onChange={set('contactPerson')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.contactPerson ? '#DC2626' : '#DDE4EC' }} aria-required />
            {errors.contactPerson && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.contactPerson}</span>}
          </Field>
          <Field label="Position / Title" required>
            <input type="text" value={form.position} onChange={set('position')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.position ? '#DC2626' : '#DDE4EC' }} aria-required />
            {errors.position && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.position}</span>}
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

      {/* Section 3 — Training Requirements */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <legend style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1D2430', paddingBottom: '16px', borderBottom: '2px solid #DDE4EC', width: '100%', marginBottom: '4px' }}>
          Training Requirements
        </legend>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
          <Field label="Number of Participants" required>
            <input type="number" min={1} value={form.numberOfParticipants} onChange={set('numberOfParticipants')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.numberOfParticipants ? '#DC2626' : '#DDE4EC' }} aria-required />
            {errors.numberOfParticipants && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.numberOfParticipants}</span>}
          </Field>
          <Field label="Preferred Delivery Method" required>
            <select value={form.preferredDeliveryMethod} onChange={set('preferredDeliveryMethod')}
              onFocus={focus} onBlur={blur}
              style={{ ...inputStyle, borderColor: errors.preferredDeliveryMethod ? '#DC2626' : '#DDE4EC', appearance: 'none', cursor: 'pointer' }} aria-required>
              <option value="">Select delivery method</option>
              {DELIVERY_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {errors.preferredDeliveryMethod && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.preferredDeliveryMethod}</span>}
          </Field>
        </div>

        <Field label="Training Topic / Program of Interest" required>
          <input type="text" value={form.trainingTopic} onChange={set('trainingTopic')}
            onFocus={focus} onBlur={blur} placeholder="e.g. Leadership Development, Customer Service Excellence, Banking Compliance…"
            style={{ ...inputStyle, borderColor: errors.trainingTopic ? '#DC2626' : '#DDE4EC' }} aria-required />
          {errors.trainingTopic && <span role="alert" style={{ fontSize: '13px', color: '#DC2626', marginTop: '4px', display: 'block' }}>{errors.trainingTopic}</span>}
        </Field>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-2">
          <Field label="Preferred Dates">
            <input type="text" value={form.preferredDates} onChange={set('preferredDates')}
              onFocus={focus} onBlur={blur} placeholder="e.g. July 2026, Q3 2026, flexible"
              style={inputStyle} />
          </Field>
          <Field label="Training Location">
            <input type="text" value={form.trainingLocation} onChange={set('trainingLocation')}
              onFocus={focus} onBlur={blur} placeholder="City, venue, or 'at our premises'"
              style={inputStyle} />
          </Field>
        </div>

        <Field label="Approximate Budget Range">
          <select value={form.budgetRange} onChange={set('budgetRange')}
            onFocus={focus} onBlur={blur}
            style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
            <option value="">Select range (optional)</option>
            {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </Field>

        <Field label="Additional Requirements or Context">
          <textarea
            value={form.additionalRequirements}
            onChange={set('additionalRequirements')}
            onFocus={focus} onBlur={blur}
            rows={5}
            placeholder="Describe any specific objectives, audience characteristics, past training history, or other context that would help us design the right program."
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
          />
        </Field>
      </fieldset>

      {/* Required note */}
      <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: '#5C6B7A', margin: 0 }}>
        <span style={{ color: '#DC2626' }}>*</span> Required fields. We will respond within two working days.
      </p>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: '#1E88E5', color: '#fff',
            padding: '14px 32px', borderRadius: '6px', border: 'none',
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '16px',
            cursor: status === 'loading' ? 'wait' : 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#1565C0' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1E88E5' }}
        >
          <Send size={16} />
          {status === 'loading' ? 'Submitting…' : 'Submit Training Request'}
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
