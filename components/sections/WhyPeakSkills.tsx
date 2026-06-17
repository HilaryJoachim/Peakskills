import { CheckCircle } from 'lucide-react'

const differentiators = [
  {
    title: 'Facilitators with practitioner credentials',
    body: 'Our facilitators are not academics who have studied the subjects they teach. They are former banking officers, HR directors, and government officials who have done the work. They bring credibility, current examples, and the authority of lived experience into every session.',
  },
  {
    title: 'Programs designed around your operating context',
    body: 'We study the regulatory environment, organizational culture, and specific constraints of each sector we serve before we design anything. The scenarios in our programs come from actual situations that participants recognize and engage with, not textbook cases from another country\'s context.',
  },
  {
    title: 'Measurable, outcome-focused design',
    body: 'Every program is built back from clearly defined behavioral outcomes — what participants should be able to do differently after training, not just what they should know. Organizations who commission our programs can assess those outcomes in post-training observation and performance review.',
  },
  {
    title: 'Institutional-scale delivery capacity',
    body: 'We regularly deliver programs for 30, 80, or 200 participants across multiple cohorts — maintaining consistent quality across sites and facilitator teams. We are built for institutional training budgets, not individual learner transactions.',
  },
]

export default function WhyPeakSkills() {
  return (
    <section style={{ background: '#fff', padding: '88px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '80px',
          alignItems: 'center',
        }} className="why-grid">
          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '3/4', boxShadow: '0 12px 40px rgba(29,36,48,0.15)' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85&auto=format&fit=crop"
                alt="PeakSkills facilitator leading a leadership development workshop"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
            {/* Accent card */}
            <div style={{
              position: 'absolute', bottom: '-24px', right: '-24px',
              background: '#1E88E5', borderRadius: '8px', padding: '20px 24px',
              boxShadow: '0 8px 24px rgba(30,136,229,0.25)',
            }}>
              <p style={{ margin: 0, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: '32px', color: '#fff', lineHeight: 1 }}>
                12+
              </p>
              <p style={{ margin: '4px 0 0', fontFamily: 'Source Sans 3, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Years of practice
              </p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: '12px', color: '#1E88E5', textTransform: 'uppercase',
              letterSpacing: '0.08em', margin: '0 0 12px',
            }}>
              Why PeakSkills
            </p>
            <h2 style={{
              fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
              fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.2, color: '#1D2430',
              margin: '0 0 16px',
            }}>
              Built for institutional training requirements, not individual learners
            </h2>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', lineHeight: 1.65, color: '#5C6B7A', margin: '0 0 40px' }}>
              Most training providers in East Africa are designed primarily around individual course purchases. PeakSkills was built from the beginning to serve the procurement, delivery, and reporting requirements of large organizations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {differentiators.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <CheckCircle size={22} style={{ color: '#1E88E5', flexShrink: 0, marginTop: '2px' }} strokeWidth={2} />
                  <div>
                    <h3 style={{
                      fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 600,
                      fontSize: '16px', color: '#1D2430', margin: '0 0 6px',
                    }}>
                      {d.title}
                    </h3>
                    <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', lineHeight: 1.65, color: '#5C6B7A', margin: 0 }}>
                      {d.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
