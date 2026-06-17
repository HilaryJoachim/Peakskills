import { Client } from '@/lib/supabase'

interface TrustStripProps {
  clients: Client[]
}

// Fallback clients if database is empty
const FALLBACK_CLIENTS = [
  'CRDB Bank PLC', 'Tanzania Revenue Authority', 'National Microfinance Bank',
  'Oxfam Tanzania', 'Tanzania Ports Authority', 'Stanbic Bank Tanzania',
  'Ministry of Finance', 'World Vision Tanzania', 'University of Dar es Salaam', 'Vodacom Tanzania',
]

export default function TrustStrip({ clients }: TrustStripProps) {
  const names = clients.length > 0 ? clients.map(c => c.name) : FALLBACK_CLIENTS

  return (
    <section style={{ background: '#fff', padding: '40px 24px', borderBottom: '1px solid #DDE4EC', borderTop: '1px solid #DDE4EC' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{
          textAlign: 'center',
          fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
          fontSize: '11px', color: '#5C6B7A',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          margin: '0 0 28px',
        }}>
          Organizations We&apos;ve Trained
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px 24px',
          alignItems: 'center',
        }}>
          {names.map((name, i) => (
            <span key={i} style={{
              fontFamily: 'IBM Plex Sans, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              color: '#5C6B7A',
              letterSpacing: '0.01em',
              padding: '6px 16px',
              borderRadius: '4px',
              border: '1px solid #DDE4EC',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s, border-color 0.15s',
            }}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
