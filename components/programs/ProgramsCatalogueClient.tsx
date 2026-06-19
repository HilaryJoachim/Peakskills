'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react'
import ProgramCard from '@/components/cards/ProgramCard'
import { Program, Category } from '@/lib/supabase'

interface ProgramsCatalogueClientProps {
  programs: Program[]
  categories: Category[]
}

const FORMAT_OPTIONS = [
  { value: '', label: 'All Formats' },
  { value: 'in-person', label: 'In-Person' },
  { value: 'online', label: 'Online' },
  { value: 'hybrid', label: 'Hybrid' },
]

const PRICE_OPTIONS = [
  { value: '', label: 'All Programs' },
  { value: 'paid', label: 'Paid' },
  { value: 'free', label: 'Free' },
]

export default function ProgramsCatalogueClient({ programs, categories }: ProgramsCatalogueClientProps) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState(initialCategory)
  const [formatFilter, setFormatFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && view !== 'grid') {
        setView('grid')
      }
    }
    window.addEventListener('resize', handleResize)
    // Run once on mount to catch initial mobile loads
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [view])

  // Update filter if URL param changes (e.g. browser back/forward)
  useEffect(() => {
    const cat = searchParams.get('category') || ''
    setCategoryFilter(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    return programs.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.short_description?.toLowerCase().includes(search.toLowerCase())) return false
      if (categoryFilter && p.category?.slug !== categoryFilter) return false
      if (formatFilter && p.format !== formatFilter) return false
      if (priceFilter && p.price_type !== priceFilter) return false
      return true
    })
  }, [programs, search, categoryFilter, formatFilter, priceFilter])

  const selectStyle: React.CSSProperties = {
    padding: '9px 36px 9px 12px',
    border: '1.5px solid #DDE4EC',
    borderRadius: '6px',
    background: '#fff',
    color: '#1D2430',
    fontFamily: 'Source Sans 3, sans-serif',
    fontSize: '14px',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C6B7A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    minWidth: '160px',
  }

  return (
    <div style={{ background: '#F4F7FA', minHeight: '100vh', paddingTop: '72px' }}>
      {/* Page header */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: '520px', backgroundColor: '#1D2430' }}>
        {/* Background Image / Composition */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url(/programs_hero.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Gradient overlay to ensure text readability on the left */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(29,36,48,1) 0%, rgba(29,36,48,0.92) 45%, rgba(29,36,48,0.2) 100%)'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-24 pb-24" style={{ minHeight: '520px' }}>
          <div className="max-w-2xl">
            
            {/* Breadcrumb */}
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontFamily: 'var(--font-body)', marginBottom: '16px' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</a>
              <span style={{ margin: '0 8px' }}>/</span>
              <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Programs</span>
            </div>

            {/* Badge */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{ 
                background: '#009B91', 
                color: '#FFFFFF', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: 700,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Catalogue
              </span>
            </div>

            <h1 
              style={{ 
                fontFamily: 'Arial, Helvetica, sans-serif',
                color: '#FFFFFF',
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}
            >
              Elevate Your Team.<br />
              Transform <span style={{ color: '#4DD0E1' }}>Potential</span> Into<br />
              <span style={{ color: '#FFB300' }}>Performance</span>
            </h1>

            {/* Divider Line */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0', opacity: 0.8 }}>
              <div style={{ width: '120px', height: '2px', background: '#FFFFFF' }}></div>
              <div style={{ 
                width: '16px', height: '16px', borderRadius: '50%', 
                border: '2px solid #FFFFFF', background: 'transparent', 
                margin: '0 16px' 
              }}></div>
              <div style={{ width: '120px', height: '2px', background: '#FFFFFF' }}></div>
            </div>

            <p 
              style={{ 
                fontFamily: 'var(--font-body)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '18px',
                lineHeight: 1.7,
                maxWidth: '560px'
              }}
            >
              Open-enrollment courses and in-house programs across 11 professional categories. Each course links to a dedicated page with full program details, learning outcomes, and scheduling.
            </p>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #DDE4EC', padding: '16px 24px', position: 'sticky', top: '72px', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <SlidersHorizontal size={16} style={{ color: '#5C6B7A', flexShrink: 0 }} />

          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: '280px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#5C6B7A' }} />
            <input
              type="search"
              aria-label="Search programs"
              placeholder="Search programs…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '9px 12px 9px 32px',
                border: '1.5px solid #DDE4EC', borderRadius: '6px',
                background: '#F4F7FA', color: '#1D2430',
                fontFamily: 'Source Sans 3, sans-serif', fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>

          {/* Category */}
          <select
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Format */}
          <select aria-label="Filter by format" value={formatFilter} onChange={e => setFormatFilter(e.target.value)} style={selectStyle}>
            {FORMAT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Price */}
          <select aria-label="Filter by price" value={priceFilter} onChange={e => setPriceFilter(e.target.value)} style={selectStyle}>
            {PRICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Count */}
          <span style={{ fontSize: '13px', color: '#5C6B7A', whiteSpace: 'nowrap' }}>
            {filtered.length} program{filtered.length !== 1 ? 's' : ''}
          </span>

          {/* View toggle */}
          <div className="hidden md:flex" style={{ border: '1.5px solid #DDE4EC', borderRadius: '6px', overflow: 'hidden' }}>
            <button
              onClick={() => setView('grid')}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              style={{
                padding: '7px 10px', border: 'none', cursor: 'pointer',
                background: view === 'grid' ? '#1D2430' : '#fff',
                color: view === 'grid' ? '#fff' : '#5C6B7A',
                display: 'flex', alignItems: 'center',
              }}
            ><LayoutGrid size={15} /></button>
            <button
              onClick={() => setView('list')}
              aria-label="List view"
              aria-pressed={view === 'list'}
              style={{
                padding: '7px 10px', border: 'none', borderLeft: '1.5px solid #DDE4EC', cursor: 'pointer',
                background: view === 'list' ? '#1D2430' : '#fff',
                color: view === 'list' ? '#fff' : '#5C6B7A',
                display: 'flex', alignItems: 'center',
              }}
            ><List size={15} /></button>
          </div>
        </div>
      </div>

      {/* Programs */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', color: '#5C6B7A' }}>
              No programs match your current filters.
            </p>
            <button
              onClick={() => { setSearch(''); setCategoryFilter(''); setFormatFilter(''); setPriceFilter('') }}
              style={{
                marginTop: '16px', padding: '10px 24px',
                background: '#0077B6', color: '#fff', border: 'none',
                borderRadius: '6px', fontFamily: 'IBM Plex Sans, sans-serif',
                fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: view === 'list' ? '1fr' : 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '24px',
          }}>
            {filtered.map(program => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
