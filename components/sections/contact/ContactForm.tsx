'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

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
                    +255 754 232 863<br />
                    0718 710 361
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
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle size={56} style={{ color: '#2ECC40', margin: '0 auto 20px' }} strokeWidth={1.5} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, color: '#1D2430', marginBottom: '16px' }}>
                    Message Sent Successfully!
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#5C6B7A', lineHeight: 1.6, marginBottom: '32px' }}>
                    Thank you for reaching out to PeakSkills. Our team has received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    style={{
                      background: '#1D2430', color: '#FFFFFF',
                      padding: '12px 28px', borderRadius: '8px',
                      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600, color: '#1D2430', marginBottom: '32px' }}>
                    Send us a message
                  </h3>
                  
                  <form className="flex flex-col gap-6" onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                      const originalText = submitBtn.innerText;
                      submitBtn.disabled = true;
                      submitBtn.innerText = 'Sending...';
                      try {
                        const res = await fetch('/api/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(Object.fromEntries(formData))
                        });
                        if (!res.ok) throw new Error('Failed to send message');
                        form.reset();
                        setStatus('success');
                      } catch (err) {
                        alert('Failed to send message. Please try again later.');
                      } finally {
                        submitBtn.disabled = false;
                        submitBtn.innerText = originalText;
                      }
                    }}>
                    <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>First Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder="John"
                      className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Last Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder="Doe"
                      className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex flex-col gap-2">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="john@company.com"
                      className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="+255 XXX XXX XXX"
                      className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Company / Organization</label>
                  <input 
                    type="text" 
                    name="company"
                    placeholder="Your Company Name"
                    className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#1D2430' }}>Subject</label>
                  <select name="subject" className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all appearance-none">
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
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full bg-[#F8FAFC] border border-[#DDE4EC] rounded-lg px-4 py-3 text-[#1D2430] font-[var(--font-body)] focus:outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6] transition-all resize-none"
                    required
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
              </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
