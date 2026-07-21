import type { Metadata } from 'next'
import './globals.css'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'

export const metadata: Metadata = {
  title: {
    default: 'PeakSkills — Corporate Training, Consulting & Coaching | Tanzania',
    template: '%s | PeakSkills',
  },
  description:
    'PeakSkills delivers practical corporate training, consulting, mentorship and coaching for banks, government institutions, NGOs, and growing organizations across Tanzania and East Africa.',
  keywords: [
    'corporate training Tanzania',
    'leadership development Dar es Salaam',
    'HR training East Africa',
    'banking training Tanzania',
    'government capacity building',
    'professional development Tanzania',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peakskills.co.tz'),
  openGraph: {
    siteName: 'PeakSkills',
    type: 'website',
    locale: 'en_TZ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <WhatsAppFAB />
      </body>
    </html>
  )
}
