'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
    <path d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.763.46 3.486 1.332 5.008L2 22l5.086-1.334A9.986 9.986 0 0 0 12.031 22c5.54 0 10.03-4.49 10.03-10.03S17.571 2 12.031 2Zm5.44 14.282c-.227.638-1.319 1.226-1.815 1.272-.496.046-1.085.122-3.48-1.002-2.871-1.348-4.707-4.304-4.853-4.502-.146-.197-1.157-1.542-1.157-2.94 0-1.398.73-2.09.992-2.366.262-.276.571-.345.76-.345.19 0 .38.001.54.008.172.008.404-.066.632.484.234.552.79 1.93.863 2.078.073.148.117.319.03.553-.09.233-.132.38-.263.535-.132.154-.277.34-.4.47-.132.132-.272.277-.117.545.154.269.686 1.138 1.474 1.839.996.887 1.848 1.162 2.112 1.3.264.138.418.118.572-.054.154-.173.663-.77.839-1.036.176-.266.352-.22.596-.128.244.092 1.54.726 1.805.858.265.132.441.198.507.31.066.111.066.638-.16 1.276Z"/>
  </svg>
)

export default function WhatsAppFAB() {
  const pathname = usePathname()

  // Hide on admin, portal, and authentication pages
  if (
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/portal') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/create-account')
  ) {
    return null
  }

  return (
    <Link
      href="https://wa.me/255718710361"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
        zIndex: 9999,
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'scale(1.1)'
        el.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'scale(1)'
        el.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.4)'
      }}
    >
      <WhatsAppIcon />
    </Link>
  )
}
