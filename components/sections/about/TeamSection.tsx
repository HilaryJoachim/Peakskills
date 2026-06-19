'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

interface TeamMember {
  name: string
  title: string
  subtitle: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
  accentColor: string
  accentText: string
  featured?: boolean
}

const team: TeamMember[] = [
  {
    name: 'Amina Osei',
    title: 'Chief Executive Officer',
    subtitle: 'Visionary Leader',
    bio: 'With over 20 years in corporate learning and organizational transformation, Amina has led PeakSkills to become East Africa\'s premier training consultancy. Her philosophy — that people are the greatest asset of any organization — drives every program we deliver.',
    image: '/team_ceo.png',
    accentColor: '#FFB300',
    accentText: '#1D2430',
    featured: true,
  },
  {
    name: 'James Mutua',
    title: 'Chief Operations Officer',
    subtitle: 'Strategy & Delivery',
    bio: 'James architects PeakSkills\' delivery frameworks and ensures every engagement exceeds client expectations. With an MBA from Strathmore and 15+ years in HR consulting, he transforms complex business challenges into actionable training outcomes.',
    image: '/team_coo.png',
    accentColor: '#4DD0E1',
    accentText: '#1D2430',
  },
  {
    name: 'Seren Kamau',
    title: 'Director of Learning Design',
    subtitle: 'Curriculum Architect',
    bio: 'Seren leads our instructional design team, crafting bespoke learning journeys that combine cognitive science with real-world business application. She holds a Masters in Organizational Psychology and has designed programs for Fortune 500 clients.',
    image: '/team_director.png',
    accentColor: '#1D2430',
    accentText: '#FFFFFF',
  },
  {
    name: 'David Njoroge',
    title: 'Head of Corporate Training',
    subtitle: 'Executive Coach',
    bio: 'David brings executive coaching expertise from 12+ years training C-suite leaders across banking, telecoms, and government. His hands-on facilitation style is known for producing measurable behavior change long after the program concludes.',
    image: '/team_lead.png',
    accentColor: '#1D2430',
    accentText: '#FFFFFF',
  },
]

const SocialLinks = ({ member, small }: { member: TeamMember; small?: boolean }) => (
  <div className="flex items-center gap-2 mt-auto pt-4">
    {(member.linkedin || member.twitter) && (
      <a
        href={member.linkedin || member.twitter || '#'}
        className="flex items-center justify-center rounded-full transition-transform hover:scale-110"
        style={{
          width: small ? '32px' : '38px',
          height: small ? '32px' : '38px',
          background: 'rgba(255,255,255,0.15)',
          color: '#FFFFFF',
          backdropFilter: 'blur(4px)',
        }}
        aria-label={`${member.name} profile`}
      >
        <ExternalLink size={small ? 14 : 16} />
      </a>
    )}
  </div>
)

// Featured large card (left side)
const FeaturedCard = ({ member }: { member: TeamMember }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ height: '580px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover object-top transition-transform duration-700"
        style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
      />

      {/* Permanent gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(29,36,48,0.9) 0%, rgba(29,36,48,0.3) 55%, transparent 100%)',
        }}
      />

      {/* Accent tab */}
      <div
        className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
        style={{ backgroundColor: member.accentColor, color: member.accentText }}
      >
        {member.subtitle}
      </div>

      {/* Name + bio overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h3
          style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF', fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}
        >
          {member.name}
        </h3>
        <p style={{ color: member.accentColor, fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>
          {member.title}
        </p>

        {/* Bio — slides up on hover */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: hovered ? '200px' : '0px', opacity: hovered ? 1 : 0 }}
        >
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.7, marginBottom: '12px' }}>
            {member.bio}
          </p>
        </div>

        {/* Arrow icon */}
        <div
          className="flex items-center gap-2 transition-all duration-300"
          style={{ color: member.accentColor, opacity: hovered ? 1 : 0.6 }}
        >
          <ArrowUpRight size={18} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>View Profile</span>
        </div>
      </div>
    </div>
  )
}

// Compact horizontal card (right side list)
const SideCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer flex"
      style={{ height: '160px', transition: 'all 0.3s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo strip */}
      <div className="relative flex-shrink-0" style={{ width: '140px' }}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />
      </div>

      {/* Content area */}
      <div
        className="flex flex-col justify-center px-5 py-4 flex-1 relative overflow-hidden"
        style={{
          background: hovered
            ? isEven ? '#1D2430' : '#4DD0E1'
            : isEven ? '#F4F7FA' : '#E8F8FA',
          transition: 'background 0.3s ease',
        }}
      >
        {/* Accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: member.accentColor }}
        />

        <p
          className="text-xs font-bold tracking-widest uppercase mb-1 transition-colors duration-300"
          style={{ color: hovered ? (isEven ? '#4DD0E1' : '#1D2430') : '#9BAAB8' }}
        >
          {member.subtitle}
        </p>
        <h4
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: 800,
            fontSize: '16px',
            color: hovered ? (isEven ? '#FFFFFF' : '#1D2430') : '#1D2430',
            marginBottom: '3px',
            transition: 'color 0.3s ease',
          }}
        >
          {member.name}
        </h4>
        <p
          className="text-xs font-semibold mb-3 transition-colors duration-300"
          style={{ color: hovered ? (isEven ? '#FFB300' : '#1D2430') : '#5C6B7A' }}
        >
          {member.title}
        </p>

        {/* Bio — reveals on hover */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{ maxHeight: hovered ? '80px' : '0px', opacity: hovered ? 1 : 0 }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{ color: hovered ? (isEven ? 'rgba(255,255,255,0.8)' : 'rgba(29,36,48,0.8)') : 'transparent' }}
          >
            {member.bio.slice(0, 100)}…
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const featured = team.find(m => m.featured)!
  const rest = team.filter(m => !m.featured)

  return (
    <section className="w-full pt-12 pb-20" style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1D2430 50%, #162032 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: '#4DD0E1' }}
            >
              The People Behind PeakSkills
            </p>
            <h2
              style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#FFFFFF', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, lineHeight: 1.1 }}
            >
              Meet the{' '}
              <span style={{ color: '#FFB300' }}>Leadership Team</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Seasoned practitioners, not just consultants. Every leader at PeakSkills has walked the path they now teach.
          </p>
        </div>

        {/* Grid: featured left + 3 stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Featured card — spans 2 columns */}
          <div className="lg:col-span-2">
            <FeaturedCard member={featured} />
          </div>

          {/* Right side: 3 stacked horizontal cards */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {rest.map((member, i) => (
              <SideCard key={member.name} member={member} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
