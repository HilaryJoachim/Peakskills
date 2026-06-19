import { Quote } from 'lucide-react'

export default function ServicesTestimonials() {
  const testimonials = [
    {
      quote: "PeakSkills delivered a leadership program that transformed how our mid-level managers operate. We've seen a measurable improvement in cross-departmental collaboration and decision-making speed.",
      name: "David Mwakalebela",
      role: "Head of Human Resources",
      company: "National Banking Consortium"
    },
    {
      quote: "Unlike generic training providers, they took the time to understand our specific operational challenges. The customized customer service excellence workshop resulted in a 40% drop in client complaints.",
      name: "Sarah Kessy",
      role: "Operations Director",
      company: "East African Logistics"
    },
    {
      quote: "Their strategic consulting helped us clarify our market positioning. The branding and communication framework they developed is now the foundation of our entire corporate identity.",
      name: "Emmanuel Chacha",
      role: "Chief Executive Officer",
      company: "Tanzania Agro-Processing Ltd"
    }
  ]

  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '96px 24px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)',
              color: '#1D2430',
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 700,
              lineHeight: 1.2
            }}
          >
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              style={{
                backgroundColor: '#F4F7FA',
                borderRadius: '16px',
                padding: '40px 32px',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(29,36,48,0.03)'
              }}
            >
              <Quote size={32} className="text-[#0077B6] mb-6 opacity-40" />
              <p 
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#1D2430',
                  fontSize: '16.5px',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '32px'
                }}
              >
                &quot;{t.quote}&quot;
              </p>
              <div>
                <h4 
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: '#1D2430',
                    fontSize: '17px',
                    fontWeight: 700,
                    marginBottom: '4px'
                  }}
                >
                  {t.name}
                </h4>
                <p 
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#5C6B7A',
                    fontSize: '14px',
                    fontWeight: 500,
                    marginBottom: '2px'
                  }}
                >
                  {t.role}
                </p>
                <p 
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#0077B6',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
