'use client'

import Image from 'next/image'

const clients = [
  '/client/img258.jpg',
  '/client/img259.jpg',
  '/client/img260.jpg',
  '/client/img261.jpg',
  '/client/img262.jpg',
  '/client/img263.jpg',
  '/client/img264.jpg',
  '/client/img265.jpg',
  '/client/img266.jpg',
]

// Duplicate the array to create a seamless infinite loop
const infiniteClients = [...clients, ...clients, ...clients]

export default function ClienteleSection() {
  return (
    <section className="w-full py-16 bg-white overflow-hidden border-t border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1D2430] mb-4" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
          Trusted By Industry Leaders
        </h2>
        <p className="text-[#5C6B7A] text-lg max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
          We partner with leading organizations across Tanzania and East Africa to build high-performing teams.
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden py-4">
        {/* Gradient overlays to fade the edges */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* The scrolling track */}
        <div className="flex animate-marquee hover:animation-pause items-center gap-12 md:gap-20 whitespace-nowrap pl-6">
          {infiniteClients.map((src, index) => (
            <div 
              key={index} 
              className="relative w-[140px] h-[70px] md:w-[180px] md:h-[90px] flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={src}
                alt={`Client logo ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
        .hover\\:animation-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
