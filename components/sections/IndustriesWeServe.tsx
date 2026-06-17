// V2.0 Addendum: "Industries We Serve" section — placed directly below hero

const industries = [
  {
    icon: '🏦',
    title: 'Banking & Financial Services',
    description: 'Commercial banks, microfinance institutions, insurance companies, and capital markets firms. Programs aligned to Bank of Tanzania regulatory requirements.',
  },
  {
    icon: '🏛️',
    title: 'Government & Public Sector',
    description: 'National ministries, regional administrations, regulatory authorities, and parastatal organizations. Training designed around public-sector accountability and service delivery.',
  },
  {
    icon: '🌍',
    title: 'NGOs & Development Sector',
    description: 'International and national NGOs, UN agencies, bilateral donors, and community-based organizations operating under donor compliance frameworks.',
  },
  {
    icon: '🎓',
    title: 'Universities & Education',
    description: 'Universities, polytechnics, and vocational training institutions building the professional capacity of their academic and administrative staff.',
  },
  {
    icon: '📡',
    title: 'Telecoms & Technology',
    description: 'Telecommunications operators, IT service companies, and digital-economy businesses managing rapid workforce growth and customer-service scale.',
  },
  {
    icon: '⚓',
    title: 'Port, Transport & Logistics',
    description: 'Port operators, freight companies, and logistics firms operating in high-compliance, high-volume environments with specific operational-safety requirements.',
  },
]

export default function IndustriesWeServe() {
  return (
    <section style={{ background: '#F4F7FA', padding: '80px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <p style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
            fontSize: '12px', color: '#1E88E5', textTransform: 'uppercase',
            letterSpacing: '0.08em', margin: '0 0 12px',
          }}>
            Industries We Serve
          </p>
          <h2 style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
            fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.2, color: '#1D2430',
            margin: '0 0 16px',
          }}>
            Sector-specific training that understands your context
          </h2>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', lineHeight: 1.65, color: '#5C6B7A', margin: 0 }}>
            PeakSkills does not deliver generic programs. We bring working knowledge of the regulatory, operational, and cultural context your teams operate in every day.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {industries.map((industry, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '1px solid #DDE4EC',
                borderRadius: '8px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 4px 16px rgba(29,36,48,0.10)'
                el.style.borderColor = '#1E88E5'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = 'none'
                el.style.borderColor = '#DDE4EC'
              }}
            >
              <div style={{ fontSize: '28px', lineHeight: 1 }}>{industry.icon}</div>
              <h3 style={{
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
                fontSize: '16px', lineHeight: 1.3, color: '#1D2430', margin: 0,
              }}>
                {industry.title}
              </h3>
              <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px', lineHeight: 1.65, color: '#5C6B7A', margin: 0 }}>
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
