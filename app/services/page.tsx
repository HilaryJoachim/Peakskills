import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServicesHero from '@/components/sections/services/ServicesHero'
import ServiceDetail from '@/components/sections/services/ServiceDetail'
import WhyChoosePeakSkills from '@/components/sections/services/WhyChoosePeakSkills'


export const metadata: Metadata = {
  title: 'Services & Programs',
  description: 'Corporate training, business consulting, mentorship, and branding services by PeakSkills in Tanzania and East Africa.',
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        
        <ServiceDetail 
          headline="Develop Skilled, Confident, and High-Performing Teams"
          description="PeakSkills designs and delivers practical training programs that help organizations strengthen leadership, improve customer service, increase workplace professionalism, and enhance operational performance."
          services={[
            'Leadership Development',
            'Customer Service Excellence',
            'Workplace Ethics & Professionalism',
            'Communication Skills',
            'Team Building Programs',
            'Project Management',
            'Financial Management',
            'Human Resource Development'
          ]}
          industries={['Banking', 'Government', 'Manufacturing', 'NGOs', 'Education', 'Corporate Organizations']}
          ctaLabel="View Training Programs"
          ctaHref="/programs"
          imageSrc="/services/training.png"
          imageAlt="Interactive corporate training session"
          imagePosition="left"
        />

        <ServiceDetail 
          headline="Turning Business Challenges Into Growth Opportunities"
          description="PeakSkills helps organizations identify growth opportunities, improve operational efficiency, strengthen customer engagement, and develop sustainable business strategies."
          services={[
            'Business Growth Strategy',
            'Marketing Strategy',
            'Customer Experience Improvement',
            'Market Research',
            'Sales Performance Optimization',
            'Organizational Development',
            'Strategic Planning Workshops',
            'Performance Improvement Programs'
          ]}
          ctaLabel="Book a Consultation"
          ctaHref="/contact"
          imageSrc="/services/consulting.png"
          imageAlt="Business executives analyzing strategy"
          imagePosition="right"
        />

        <ServiceDetail 
          headline="Preparing Future Leaders for Career Success"
          description="PeakSkills supports students, graduates, and young professionals through mentorship programs designed to build confidence, workplace readiness, leadership capability, and professional growth."
          services={[
            'Career Readiness Training',
            'Leadership Development',
            'Professional Communication',
            'Interview Preparation',
            'Workplace Ethics',
            'Entrepreneurship Mentorship',
            'Personal Development Coaching',
            'Youth Leadership Programs'
          ]}
          ctaLabel="Join a Mentorship Program"
          ctaHref="/programs"
          imageSrc="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
          imageAlt="Senior leader mentoring a young professional"
          imagePosition="left"
        />

        <ServiceDetail 
          headline="Building Brands People Recognize and Trust"
          description="PeakSkills helps organizations strengthen their brand identity, improve visibility, communicate value effectively, and establish a professional market presence."
          services={[
            'Brand Strategy',
            'Corporate Identity Development',
            'Organizational Positioning',
            'Marketing Materials Development',
            'Digital Brand Presence',
            'Communication Frameworks',
            'Employer Branding',
            'Brand Awareness Campaigns'
          ]}
          ctaLabel="Discuss Your Brand"
          ctaHref="/contact"
          imageSrc="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop"
          imageAlt="Creative professionals working on branding"
          imagePosition="right"
        />

        <WhyChoosePeakSkills />
      </main>
      <Footer />
    </>
  )
}
