'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

type TimelineTheme = 'grey' | 'primary' | 'secondary' | 'accent'

interface TimelineItemProps {
  year: string
  side: 'left' | 'right'
  theme: TimelineTheme
  content: string
  imageSrc?: string
  nodeActive?: boolean
}

const themeStyles = {
  grey: {
    bg: '#F4F7FA',
    text: '#1D2430',
    arrowLeft: 'border-r-[#F4F7FA]',
    arrowRight: 'border-l-[#F4F7FA]',
  },
  primary: {
    bg: '#1D2430',
    text: '#FFFFFF',
    arrowLeft: 'border-r-[#1D2430]',
    arrowRight: 'border-l-[#1D2430]',
  },
  secondary: {
    bg: '#4DD0E1',
    text: '#1D2430',
    arrowLeft: 'border-r-[#4DD0E1]',
    arrowRight: 'border-l-[#4DD0E1]',
  },
  accent: {
    bg: '#FFB300',
    text: '#1D2430',
    arrowLeft: 'border-r-[#FFB300]',
    arrowRight: 'border-l-[#FFB300]',
  },
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, side, theme, content, imageSrc, nodeActive = true }) => {
  const styles = themeStyles[theme]
  const isLeft = side === 'left'

  return (
    <div className="relative w-full mb-12 md:mb-24 flex flex-col md:flex-row items-center justify-center">
      
      {/* Center Node (Desktop) - Absolutely positioned in the center */}
      <motion.div 
           className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full items-center justify-center shadow-lg font-bold text-sm"
           initial={{ backgroundColor: '#FFFFFF', color: '#64748B', border: '2px solid #E2E8F0' }}
           whileInView={{ backgroundColor: '#FFB300', color: '#1D2430', border: '2px solid #FFB300' }}
           viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
           transition={{ duration: 0.4 }}
      >
        {year}
      </motion.div>

      {/* Mobile Node (Visible only on mobile) */}
      <motion.div 
           className="md:hidden flex w-16 h-16 rounded-full items-center justify-center shadow-lg font-bold text-sm mb-4 z-10"
           initial={{ backgroundColor: '#FFFFFF', color: '#64748B', border: '2px solid #E2E8F0' }}
           whileInView={{ backgroundColor: '#FFB300', color: '#1D2430', border: '2px solid #FFB300' }}
           viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
           transition={{ duration: 0.4 }}
      >
        {year}
      </motion.div>

      {/* Left Side Container */}
      <div className={`w-full md:w-1/2 flex ${isLeft ? 'md:pr-16 md:justify-end' : 'md:pr-16 md:justify-start hidden md:flex'}`}>
        {isLeft && (
          <div className="relative w-full md:max-w-md flex flex-col items-end">
            <div 
              className="w-full p-6 md:p-8 rounded-lg shadow-sm relative"
              style={{ backgroundColor: styles.bg, color: styles.text }}
            >
              <p className="text-[15px] md:text-[16px] leading-relaxed font-medium">{content}</p>
              
              {/* Arrow pointing to center */}
              <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[16px] ${styles.arrowRight}`} />
            </div>
          </div>
        )}
        
        {/* If this is a right-sided item, we might show the image on the left side (like 2022 in reference) */}
        {!isLeft && imageSrc && (
          <div className="relative w-full md:max-w-md">
            <div className="rounded-lg overflow-hidden shadow-lg w-full h-[200px] relative">
               <Image src={imageSrc} alt={`Timeline ${year}`} fill className="object-cover" />
            </div>
          </div>
        )}
      </div>

      {/* Right Side Container */}
      <div className={`w-full md:w-1/2 flex mt-6 md:mt-0 ${!isLeft ? 'md:pl-16 md:justify-start' : 'md:pl-16 md:justify-start hidden md:flex'}`}>
        {!isLeft && (
          <div className="relative w-full md:max-w-md flex flex-col items-start">
            <div 
              className="w-full p-6 md:p-8 rounded-lg shadow-sm relative"
              style={{ backgroundColor: styles.bg, color: styles.text }}
            >
              <p className="text-[15px] md:text-[16px] leading-relaxed font-medium">{content}</p>
              
              {/* Arrow pointing to center */}
              <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 -left-4 w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[16px] ${styles.arrowLeft}`} />
            </div>

            {/* In case a right-aligned item has its image directly under it (not cross-placed) */}
            {/* The reference design is a bit flexible, but let's support an image here if cross-placement wasn't used */}
          </div>
        )}

        {/* If this is a left-sided item, we might show the image on the right side (like 2019 in reference) */}
        {isLeft && imageSrc && (
          <div className="relative w-full md:max-w-md">
            <div className="rounded-lg overflow-hidden shadow-lg w-full h-[200px] relative">
               <Image src={imageSrc} alt={`Timeline ${year}`} fill className="object-cover" />
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default function Timeline() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Track scroll progress relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Map scroll progress to scaleY from 0 to 1
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const timelineData: TimelineItemProps[] = [
    { 
      year: '2022', side: 'left', theme: 'primary', nodeActive: true,
      content: 'Founded PeakSkills with a vision to bridge the gap between theoretical education and practical industry execution in East Africa.' 
    },
    { 
      year: '2022', side: 'right', theme: 'secondary', nodeActive: true,
      content: 'Expanded our operations to offer specialized corporate consulting and strategic HR development programs.' 
    },
    { 
      year: '2023', side: 'left', theme: 'primary', nodeActive: false,
      content: 'Recognized as a leading corporate training partner by top-tier financial institutions in Tanzania.',
      imageSrc: '/about_timeline1.jpeg' 
    },
    { 
      year: '2024', side: 'left', theme: 'secondary', nodeActive: true,
      content: 'Launched our flagship Executive Leadership Mentorship program, empowering over 500+ C-suite professionals.' 
    },
    { 
      year: '2025', side: 'right', theme: 'primary', nodeActive: true,
      content: 'Awarded "Best Corporate Training Firm" for innovative and measurable learning outcomes.' 
    },
    { 
      year: '2025', side: 'left', theme: 'secondary', nodeActive: false,
      content: 'Successfully executed 100+ training projects across government and private sectors.',
      imageSrc: '/about_timeline2.jpeg'
    },
    { 
      year: '2026', side: 'right', theme: 'primary', nodeActive: true,
      content: 'Pioneering state-of-the-art digital learning facilities to hybridize corporate training across Africa.' 
    },
  ]

  return (
    <section className="w-full py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.1, color: '#1D2430' }}>
            Empowering{' '}
            <span style={{ color: '#0077B6' }}>Growth</span>{' '}
            Since{' '}
            <span style={{ color: '#FFB300' }}>2022</span>
          </h2>
        </div>

        <div ref={containerRef} className="relative w-full flex flex-col items-center">
          {/* Central Vertical Line (Grey Background) - Desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-200 z-0" />
          
          {/* Central Vertical Line (Grey Background) - Mobile */}
          <div className="md:hidden absolute left-8 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-200 z-0" />

          {/* Animated Central Vertical Line (Yellow Fill) - Desktop */}
          <motion.div 
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#FFB300] z-0 origin-top"
            style={{ scaleY }}
          />

          {/* Animated Central Vertical Line (Yellow Fill) - Mobile */}
          <motion.div 
            className="md:hidden absolute left-8 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#FFB300] z-0 origin-top"
            style={{ scaleY }}
          />

          {/* Render Items */}
          <div className="w-full z-10 flex flex-col">
            {timelineData.map((item, index) => (
              <TimelineItem key={index} {...item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
