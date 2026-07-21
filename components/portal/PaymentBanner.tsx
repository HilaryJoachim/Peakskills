'use client'

import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

export default function PaymentBanner({ daysRemaining }: { daysRemaining: number }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div style={{ background: '#FFFBEB', borderBottom: '1px solid #FEF3C7', padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle size={18} color="#D97706" />
          <span style={{ fontSize: '14px', color: '#92400E', fontWeight: 500 }}>
            Your admission has been approved. Course payment is required within <strong>3 Days</strong> to keep your seat reserved.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#D97706', background: '#FEF3C7', padding: '4px 12px', borderRadius: '12px' }}>
            {daysRemaining} Days Remaining
          </span>
          <button 
            onClick={() => setShowModal(true)}
            style={{ background: '#D97706', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            View Payment Instructions
          </button>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '90%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5C6B7A' }}>
              <X size={20} />
            </button>
            <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '20px', color: '#1D2430', margin: '0 0 16px' }}>
              Maelekezo ya Malipo
            </h2>
            <ul style={{ paddingLeft: '20px', margin: 0, color: '#5C6B7A', fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><strong>Lipa Ada ya Usajili:</strong> TZS 30,000 kupitia benki au mtandao wowote wa simu.</li>
              <li><strong>Tumia account namba:</strong> NMB 12XXXXX90</li>
              <li>Tuma risiti ya muamala kupitia WhatsApp au Email ya PeakSkills.</li>
              <li>Uthibitisho wa malipo utafanyika ndani ya masaa 24.</li>
              <li>Baada ya kuthibitishwa, utasajiliwa rasmi na utafunguliwa matumizi kamili ya Student Portal, pamoja na kupata taarifa zote za kozi, ratiba za madarasa, na vifaa vya kujifunzia.</li>
            </ul>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ background: '#0077B6', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                Sawa, Nimeelewa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
