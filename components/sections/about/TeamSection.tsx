'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

// Custom LinkedIn SVG Icon
const LinkedinIcon = ({ size = 24, fill = "currentColor", className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={fill}
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

// Placeholder for missing images
const PlaceholderAvatar = () => (
  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
    <svg className="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </div>
)

interface TeamMember {
  name: string
  title: string
  bio: string
  image?: string
  theme: 'dark' | 'light'
  linkedin?: string
}

const teamData: TeamMember[] = [
  {
    name: "Piniel S Laizer",
    title: "Managing Director",
    bio: "Mr.Piniel Laizer, armed with an MBA in Business Administration and a Bachelor's degree in Computer Science, is a seasoned professional in business development, training, and coaching. He channels his belief in human potential into actionable strategies. With a concise yet comprehensive approach, Piniel empowers individuals and organizations to thrive in today's dynamic landscape. His leadership is characterized by a relentless pursuit of excellence, underpinned by a commitment to continuous learning and innovation. Piniel's vision transcends mere success; he envisions a world where every individual realizes their full potential. Through personalized coaching and training programs, he equips his clients with the skills and mindset necessary for sustainable growth and achievement. With a firm belief in the power of collaboration and empowerment, Piniel Laizer is driving positive change and making a lasting impact in the realm of business and beyond.",
    image: "/images/Laizer.jpg",
    theme: "dark",
    linkedin: "#"
  },
  {
    name: "Richard F. Kisiraga",
    title: "Director of Operations and Business Development",
    bio: "Mr.Richard Kisiraga is a seasoned finance and accounting professional with extensive experience in finance management spanning over a decade. His expertise includes inventory management, financial planning, budget management, and tax compliance. Currently  collaborates with teams to optimize debt recovery strategies while ensuring regulatory compliance. A senior roles at TPC Ltd, he demonstrated proficiency in operational excellence and financial planning. Richard holds a Master of Business Management from Moshi Cooperatives University and a Bachelor of Business Administration from Tumaini University Dar es Salaam. Registered for CPA (T) exams with the National Board of Accountants and Auditors (NBAA), he actively pursues professional development through seminars and training sessions. With core competencies in people management, accuracy, and punctuality, Richard is poised to excel in dynamic business environments.",
    image: "/images/Richard.jpg",
    theme: "light",
    linkedin: "#"
  },
  {
    name: "Johneudes E. Mwombeki",
    title: "ICT Coordinator",
    bio: "Johneudes Emmanuel Mwombeki is a dedicated professional with a strong background in Information Technology, holding a Bachelor's degree from the Institute of Finance Management and a qualification in ICT from Gukeka Vocational Training Centre. He specializes in interior design and is highly skilled in architectural consultation, blending technology and creativity to deliver exceptional design solutions.",
    image: "/images/Mwombeki.jpg",
    theme: "light",
    linkedin: "#"
  }
]

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedMember])

  return (
    <section className="w-full pt-8 pb-20 bg-[#F4F9F5] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-[#072F12] text-4xl font-bold mb-4 font-sans tracking-tight">
            Leadership
          </h2>
          {/* Decorative dots and line */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D2430]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D2430]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D2430]"></span>
            <span className="w-10 h-1.5 rounded-full bg-[#1D2430] ml-1"></span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.map((member, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer rounded-sm shadow-md overflow-hidden transition-colors duration-300 hover:shadow-xl flex flex-col items-center p-10 bg-white hover:bg-[#4DD0E1] text-[#1D2430]"
            >
              {/* Image Circle */}
              <div className="w-56 h-56 rounded-full overflow-hidden mb-8 border-4 border-transparent group-hover:border-opacity-30 group-hover:border-white transition-all shadow-sm">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <PlaceholderAvatar />
                )}
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold mb-2 text-center">{member.name}</h3>
              <p className="text-sm font-medium text-center mb-6 text-gray-500 group-hover:text-gray-800 transition-colors">
                {member.title}
              </p>

              {/* LinkedIn Icon */}
              {member.linkedin && (
                <div className="mt-auto">
                  <a 
                    href={member.linkedin} 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFB300] text-white hover:bg-[#E5A100] transition-colors shadow-sm"
                  >
                    <LinkedinIcon size={18} fill="currentColor" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedMember && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-md shadow-2xl flex flex-col md:flex-row z-10 animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-[#3F9A28] hover:text-[#2E731D] transition-colors z-20 bg-white rounded-full p-1 shadow-md cursor-pointer"
            >
              <X size={28} strokeWidth={2.5} />
            </button>

            {/* Left Side: Image Area */}
            <div className="w-full md:w-5/12 bg-[#F3F4F6] p-8 md:p-12 flex items-center justify-center min-h-[300px]">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-lg border-4 border-white">
                {selectedMember.image ? (
                  <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                ) : (
                  <PlaceholderAvatar />
                )}
              </div>
            </div>

            {/* Right Side: Details Area */}
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
              <p className="text-sm font-medium text-gray-500 mb-8 pb-4 border-b border-gray-100">
                {selectedMember.title}
              </p>
              
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap">
                {selectedMember.bio}
              </div>

              {selectedMember.linkedin && (
                <div className="mt-auto">
                  <a 
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#3F9A28] text-white hover:bg-[#337C20] transition-colors shadow-sm"
                  >
                    <LinkedinIcon size={18} fill="currentColor" />
                  </a>
                </div>
              )}
            </div>
            
          </div>
        </div>
      )}
    </section>
  )
}
