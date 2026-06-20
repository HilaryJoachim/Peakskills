'use client'

import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactForm() {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#F4F7FA' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Contact Details Side */}
          <div 
            className="w-full lg:w-1/3"
            style={{
              background: 'linear-gradient(135deg, #1D2430, #0B1221)',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 12px 40px rgba(29,36,48,0.15)',
            }}
          >
            <h2 
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 'clamp(28px, 3.5vw, 36px)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: '24px'
              }}
            >
              Get in Touch
            </h2>
            <p 
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.7,
                marginBottom: '40px'
              }}
            >
              Whether you need to register for an upcoming training, request a custom corporate program, or inquire about our consulting services, our team is ready to assist you.
            </p>

            <div className="flex flex-col gap-6">
              <div 
                className="flex items-start gap-4"
                style={{ padding: '8px 0' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.1)', color: '#4DD0E1', padding: '14px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>Our Office</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 500 }}>
                    7th Floor, ABC Building<br />
                    Ali Hassan Mwinyi Road<br />
                    Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>

              <div 
                className="flex items-start gap-4"
                style={{ padding: '8px 0' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.1)', color: '#4DD0E1', padding: '14px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>Phone Number</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 500 }}>
                    +255 700 000 000<br />
                    +255 700 000 001
                  </p>
                </div>
              </div>

              <div 
                className="flex items-start gap-4"
                style={{ padding: '8px 0' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.1)', color: '#4DD0E1', padding: '14px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>Email Address</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 500 }}>
                    info@peakskills.co.tz<br />
                    training@peakskills.co.tz
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-2/3">
            <div 
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 12px 40px rgba(29,36,48,0.06)',
                border: '1px solid #DDE4EC'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, color: '#1D2430', marginBottom: '32px' }}>
                Send us a message
              </h3>
              
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>First Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="John"
                      className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Last Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+255 XXX XXX XXX"
                      className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Company / Organization</label>
                  <input 
                    type="text" 
                    placeholder="Your Company Name"
                    className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Subject</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all appearance-none">
                    <option value="">Select a topic...</option>
                    <option value="training">Corporate Training Inquiry</option>
                    <option value="consulting">Consulting Services</option>
                    <option value="mentorship">Mentorship Program</option>
                    <option value="other">General Inquiry</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Message <span className="text-red-500">*</span></label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  style={{
                    background: '#0077B6', color: '#FFFFFF',
                    padding: '16px 32px', borderRadius: '8px',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '16px',
                    transition: 'background 0.2s',
                    marginTop: '16px',
                    boxShadow: '0 4px 12px rgba(30,136,229,0.2)'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#005F8E')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0077B6')}
                >
                  Send Message
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
