import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactHero from '@/components/sections/contact/ContactHero'
import ContactForm from '@/components/sections/contact/ContactForm'

export const metadata: Metadata = { 
  title: 'Contact PeakSkills', 
  description: 'Send us an enquiry. Tell us about your requirements and our experts will provide you with the best solution.' 
}

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#F4F7FA', minHeight: '100vh' }}>
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
