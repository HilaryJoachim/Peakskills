import { Metadata } from 'next'
import { Target, BookOpen, Award, Lightbulb, LineChart, Users, Scale } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Timeline from '@/components/sections/about/Timeline'
import TeamSection from '@/components/sections/about/TeamSection'

export const metadata: Metadata = { 
  title: 'About PeakSkills', 
  description: 'Our mission, history, methodology, and the team behind PeakSkills.' 
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="w-full flex flex-col" style={{ backgroundColor: '#F8FAFC' }}>
      
      {/* SECTION 1: Intro — Premium Dark Hero */}
      <section
        className="w-full relative overflow-hidden pt-40 pb-28 text-center"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1D2430 45%, #0D2137 100%)' }}
      >
        {/* Decorative dot-grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Glowing cyan orb — top right */}
        <div
          className="absolute z-0 rounded-full"
          style={{
            width: '500px', height: '500px',
            top: '-150px', right: '-120px',
            background: 'radial-gradient(circle, rgba(77,208,225,0.18) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Glowing amber orb — bottom left */}
        <div
          className="absolute z-0 rounded-full"
          style={{
            width: '400px', height: '400px',
            bottom: '-100px', left: '-80px',
            background: 'radial-gradient(circle, rgba(255,179,0,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16">
          <p style={{ color: '#4DD0E1', fontFamily: 'Arial, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Who We Are
          </p>
          <h1
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 'clamp(32px, 5vw, 54px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '24px',
            }}
          >
            Empowering a{' '}
            <span style={{ color: '#4DD0E1' }}>
              workforce-ready future
            </span>
            , one professional at a time
          </h1>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, marginBottom: '20px', fontWeight: 400 }}>
            PeakSkills is a professional training and business consultancy firm headquartered in Arusha with branches in Kilimanjaro and Manyara. We partner with organizations to develop practical workplace skills, strengthen leadership, improve customer service, and increase organizational performance.
          </p>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, marginBottom: '20px', fontWeight: 400 }}>
            Rather than delivering theoretical training, we focus on practical, industry-relevant learning that organizations can immediately apply in the workplace.
          </p>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, fontWeight: 400 }}>
            Our clients include government institutions, NGOs, manufacturing companies, educational institutions, healthcare organizations, hospitality businesses, and private companies throughout Tanzania and East Africa.
          </p>
        </div>
      </section>

      {/* SECTION 2: Mission Image with Overlapping Card */}
      <section className="max-w-[1000px] mx-auto px-6 w-full relative">
        <div 
          className="relative w-full overflow-hidden"
          style={{ 
            height: '500px', 
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(29,36,48,0.1)'
          }}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/about_mission.png)',
            }}
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to bottom, rgba(29,36,48,0.1), rgba(29,36,48,0.3))' }} />
        </div>

        {/* Overlapping Card */}
        <div 
          className="absolute z-10 left-6 right-6 md:right-auto md:left-16 -bottom-16 md:-bottom-12 md:w-[380px]"
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 24px 50px -12px rgba(29,36,48,0.2)'
          }}
        >
          {/* Icon */}
          <div 
            style={{ 
              width: '56px', height: '56px', borderRadius: '16px', 
              background: '#FFB300', color: '#1D2430', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(255,179,0,0.3)'
            }}
          >
            <Target size={28} />
          </div>
          
          <h3 
            style={{ 
              fontFamily: 'Arial, Helvetica, sans-serif', 
              fontSize: '24px', 
              fontWeight: 800, 
              color: '#1D2430', 
              marginBottom: '16px' 
            }}
          >
            Vision & Mission
          </h3>
          
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '15.5px', 
              color: '#5C6B7A', 
              lineHeight: 1.7,
              fontWeight: 500
            }}
          >
            Our mission is to empower individuals and organizations through comprehensive training and consultancy services, fostering a culture of continuous improvement and efficiency. We envision a workforce equipped with the necessary skills to thrive in today's dynamic business environment, ultimately contributing to societal development.
          </p>
        </div>
      </section>

      {/* SECTION 3: Our Story / Image Collage */}
      <section className="w-full py-24 mt-8" style={{ backgroundColor: '#1D2430', color: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image Collage */}
          <div className="relative h-[500px] md:h-[600px] w-full">
            {/* Top Left Image */}
            <div className="absolute top-0 left-0 w-[55%] h-[45%] rounded-2xl overflow-hidden border-4 border-[#1D2430] z-10 shadow-xl">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url(/about_team_1a.jpeg)' }}
              />
              <div className="absolute top-0 right-0 bg-[#4DD0E1] text-[#1D2430] text-[11px] md:text-xs font-bold px-3 py-1.5 rounded-bl-lg">Core Facilitators</div>
            </div>
            
            {/* Middle Right Image */}
            <div className="absolute top-[20%] right-0 w-[60%] h-[45%] rounded-2xl overflow-hidden border-4 border-[#1D2430] z-20 shadow-2xl">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url(/about_team2a.jpeg)' }}
              />
              <div className="absolute top-0 right-0 bg-[#FFB300] text-[#1D2430] text-[11px] md:text-xs font-bold px-3 py-1.5 rounded-bl-lg">Consulting Team</div>
            </div>
            
            {/* Bottom Left Image */}
            <div className="absolute bottom-0 left-[10%] w-[65%] h-[40%] rounded-2xl overflow-hidden border-4 border-[#1D2430] z-30 shadow-xl">
              <div 
                className="w-full h-full bg-cover bg-top"
                style={{ backgroundImage: 'url(/about_team3a.jpeg)' }}
              />
              <div className="absolute top-0 right-0 bg-[#4DD0E1] text-[#1D2430] text-[11px] md:text-xs font-bold px-3 py-1.5 rounded-bl-lg">Executive Coaches</div>
            </div>
          </div>

          {/* Right Side: Text & Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-[#4DD0E1]">
              <BookOpen size={20} />
              <span className="font-semibold tracking-wide uppercase text-sm">Our Story</span>
            </div>
            
            <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF' }} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Pioneering excellence in corporate training and development
            </h2>
            
            <p className="text-gray-300 text-[17px] leading-relaxed mb-10 font-[var(--font-body)]">
              We are a leading provider of comprehensive learning and development solutions. Our customized programs replace generic training with highly tailored, industry-specific curriculum. Unlike many alternatives in the market, our solutions stand out by being intensely practical, ensuring measurable outcomes and sustained growth for both individuals and organizations.
            </p>

            <h3 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF' }} className="text-2xl font-bold mb-4">Our Core Values</h3>
            <p className="text-gray-300 text-[16px] leading-relaxed mb-8 font-[var(--font-body)]">
              Our core values serve as the foundation of our operations:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
              
              {/* Value 1 */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-700">
                <div className="p-3 bg-[rgba(77,208,225,0.1)] rounded-xl text-[#4DD0E1]">
                  <BookOpen size={26} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF' }} className="font-bold text-lg mb-1">1. Self-development</h4>
                </div>
              </div>

              {/* Value 2 */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-700">
                <div className="p-3 bg-[rgba(77,208,225,0.1)] rounded-xl text-[#4DD0E1]">
                  <Lightbulb size={26} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF' }} className="font-bold text-lg mb-1">2. Creativeness</h4>
                </div>
              </div>

              {/* Value 3 */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-700">
                <div className="p-3 bg-[rgba(77,208,225,0.1)] rounded-xl text-[#4DD0E1]">
                  <Users size={26} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF' }} className="font-bold text-lg mb-1">3. Customer focus</h4>
                </div>
              </div>

              {/* Value 4 */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-700 sm:border-b-0">
                <div className="p-3 bg-[rgba(77,208,225,0.1)] rounded-xl text-[#4DD0E1]">
                  <LineChart size={26} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF' }} className="font-bold text-lg mb-1">4. Profitability</h4>
                </div>
              </div>

              {/* Value 5 */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[rgba(77,208,225,0.1)] rounded-xl text-[#4DD0E1]">
                  <Scale size={26} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF' }} className="font-bold text-lg mb-1">5. Harmonization</h4>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 4: Timeline */}
      <Timeline />

      {/* SECTION 5: Team */}
      <TeamSection />

      </main>
      <Footer />
    </>
  )
}
