'use client'

import React from 'react'
import Image from 'next/image'

const servicesData = [
  {
    id: '1',
    title: 'Corporate Training & Employee Development',
    description: 'PeakSkills designs practical, results-oriented training programs that strengthen leadership, improve employee performance, enhance customer service, and build high-performing teams.',
    included: [
      'Leadership Development Programs',
      'Customer Service Excellence',
      'Team Building & Workforce Development',
      'Personal Effectiveness & Communication Skills',
      'Strategic Planning & Performance Improvement'
    ],
    image: '/services/training1.jpeg'
  },
  {
    id: '2',
    title: 'Business Consulting & Organizational Development',
    description: 'We help organizations improve efficiency, strengthen leadership, optimize business processes, and achieve sustainable growth through strategic consulting services. Our consultants work closely with management teams to identify challenges, develop practical solutions, and implement strategies that deliver measurable business results.',
    included: [
      'Business Strategy Development',
      'Organizational Development',
      'Change Management',
      'Performance Management Systems',
      'Process Improvement & Operational Excellence'
    ],
    image: '/services/training2.jpeg'
  },
  {
    id: '3',
    title: 'Marketing & Business Growth Consulting',
    description: 'Our marketing and business advisory services help organizations strengthen their market position, attract more customers, and develop sustainable growth strategies. We combine practical business insights with modern marketing techniques to improve visibility, customer engagement, and revenue generation.',
    included: [
      'Marketing Strategy Development',
      'Business Development Planning',
      'Sales Performance Improvement',
      'Brand Positioning',
      'Customer Experience Strategy'
    ],
    image: '/services/training3.jpeg'
  },
  {
    id: '4',
    title: 'Leadership Coaching & Executive Development',
    description: 'PeakSkills provides one-on-one and group coaching programs that help executives, managers, supervisors, and emerging leaders improve decision-making, communication, emotional intelligence, and leadership effectiveness. Our coaching focuses on developing confident leaders who inspire high-performing teams.',
    included: [
      'Executive Coaching',
      'Leadership Coaching',
      'Management Development',
      'Emotional Intelligence Coaching',
      'Performance Coaching'
    ],
    image: '/services/training4.jpeg'
  },
  {
    id: '5',
    title: 'Youth Mentorship & Career Development',
    description: 'We prepare young professionals, graduates, and students with the practical skills, confidence, and workplace competencies required to succeed in today\'s competitive job market. Our mentorship programs bridge the gap between education and employment by focusing on career readiness and personal development.',
    included: [
      'Career Readiness Programs',
      'Graduate Employability Training',
      'Professional Mentorship',
      'CV & Interview Preparation',
      'Personal Leadership Development'
    ],
    image: '/services/hero1.jpeg'
  },
  {
    id: '6',
    title: 'Branding & Corporate Identity Solutions',
    description: 'We help organizations build strong, consistent, and professional brands that reflect their values and communicate effectively with customers and stakeholders. From visual identity to brand strategy, we ensure every element strengthens your organization\'s market presence.',
    included: [
      'Corporate Branding',
      'Brand Strategy',
      'Logo & Visual Identity Design',
      'Brand Guidelines Development',
      'Marketing Collateral Design'
    ],
    image: '/services/consulting.png'
  },
  {
    id: '7',
    title: 'Human Resource Development',
    description: 'Our HR development services help organizations build effective people management systems that improve employee engagement, productivity, and long-term organizational performance. We support businesses in developing modern HR practices that attract, retain, and develop talent.',
    included: [
      'HR Policy Development',
      'Talent Management',
      'Performance Appraisal Systems',
      'Employee Engagement Programs',
      'Learning & Development Strategy'
    ],
    image: '/services/training.png'
  },
  {
    id: '8',
    title: 'Organizational Assessments & Strategic Planning',
    description: 'We provide practical assessment tools that help organizations evaluate current performance, identify improvement opportunities, and develop actionable strategies for long-term success. Our evidence-based approach supports informed decision-making and continuous organizational improvement.',
    included: [
      'Organizational Assessments',
      'Strategic Planning Workshops',
      'Capacity Needs Assessment',
      'Business Performance Reviews',
      'Operational Improvement Planning'
    ],
    image: '/services/training1.jpeg'
  },
  {
    id: '9',
    title: 'Monitoring, Evaluation & Capacity Building',
    description: 'PeakSkills supports organizations in measuring program effectiveness, strengthening institutional capacity, and improving project outcomes through practical monitoring and evaluation frameworks. Our services help organizations make informed decisions using reliable data and measurable performance indicators.',
    included: [
      'Monitoring & Evaluation Frameworks',
      'Capacity Building Programs',
      'Results Measurement',
      'Project Performance Reviews',
      'Impact Assessment'
    ],
    image: '/services/training2.jpeg'
  },
  {
    id: '10',
    title: 'In-House Corporate Training Solutions',
    description: 'We deliver customized in-house training programs directly at your organization\'s premises or preferred location. Every program is designed around your team\'s specific needs, business objectives, and operational environment, ensuring maximum relevance and measurable impact.',
    included: [
      'On-site Corporate Training',
      'Customized Learning Programs',
      'Executive Workshops',
      'Department-Specific Training',
      'Corporate Retreats & Team Learning'
    ],
    image: '/services/training3.jpeg'
  }
]

export default function AllServicesGrid() {
  return (
    <section className="w-full flex flex-col bg-[#F9FAFB] py-16 md:py-24 gap-12 lg:gap-16">
      {servicesData.map((service, index) => {
        const isEven = index % 2 === 0; // 0, 2, 4 (1st, 3rd, 5th items)

        return (
          <div
            key={index}
            className="w-[85%] max-w-[1600px] mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

              {/* Image Container */}
              <div className={`w-full md:w-5/12 relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm ${isEven ? 'order-1' : 'order-1 md:order-2'}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text Container */}
              <div className={`w-full md:w-7/12 ${isEven ? 'order-2' : 'order-2 md:order-1'}`}>
                <h3 className="text-2xl md:text-[28px] font-bold text-[#1D2430] mb-4">
                  {service.id}. {service.title}
                </h3>
                <p className="text-[#4b5563] text-base md:text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="mt-4">
                  <h4 className="font-bold text-[#1D2430] text-lg mb-4">
                    Services Included:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {service.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] md:text-base text-[#1f2937]">
                        <svg className="w-1.5 h-1.5 text-[#0077B6] mt-2 flex-shrink-0" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="4" />
                        </svg>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </section>
  )
}
