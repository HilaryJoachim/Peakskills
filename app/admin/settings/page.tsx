'use client'

import { useState, useEffect } from 'react'
import { Save, Percent } from 'lucide-react'

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [threshold, setThreshold] = useState(80)

  useEffect(() => {
    const saved = localStorage.getItem('attendance_threshold')
    if (saved) {
      setThreshold(parseInt(saved, 10))
    }
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    localStorage.setItem('attendance_threshold', threshold.toString())
    window.dispatchEvent(new Event('settingsUpdated'))
    
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600, fontSize: '24px', color: '#F8FAFC', margin: '0 0 8px' }}>
            Settings
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', color: '#94A3B8', margin: 0 }}>
            Configure basic organizational details and portal settings.
          </p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          style={{ padding: '10px 20px', borderRadius: '8px', background: 'linear-gradient(135deg, #0FAFAF, #0C8C8C)', color: '#fff', border: 'none', fontWeight: 600, fontSize: '14px', cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: isSaving ? 0.7 : 1, boxShadow: '0 4px 12px rgba(15, 175, 175, 0.2)' }}
        >
          {saveSuccess ? 'Saved Successfully' : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      <div style={{ background: 'rgba(255, 255, 255, 0.04)', backdropFilter: 'blur(12px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>

        <div style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: 600, color: '#F8FAFC' }}>Academic Rules</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', alignItems: 'center', gap: '24px' }}>
            <div>
              <label style={{ fontSize: '14px', fontWeight: 500, color: '#F8FAFC' }}>Default Attendance Threshold</label>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94A3B8' }}>Required for certificate eligibility.</p>
            </div>
            <div style={{ position: 'relative', width: '120px' }}>
              <Percent size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input 
                type="number" 
                value={threshold} 
                onChange={(e) => setThreshold(Number(e.target.value))}
                min={0} 
                max={100} 
                style={{ width: '100%', padding: '10px 36px 10px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', outline: 'none', background: 'rgba(0,0,0,0.2)', color: '#F8FAFC' }} 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
