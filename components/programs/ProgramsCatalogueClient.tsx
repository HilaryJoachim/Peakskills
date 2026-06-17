'use client'

import { useState, useMemo } from 'react'
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
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [formatFilter, setFormatFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    return programs.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.short_description?.toLowerCase().includes(search.toLowerCase())) return false
      if (categoryFilter && p.category_id !== categoryFilter) return false
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
      <div style={{ background: '#1D2430', padding: '56px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              <li><a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a></li>
              <li aria-hidden>/</li>
              <li aria-current="page" style={{ color: '#fff' }}>Programs</li>
            </ol>
          </nav>
          <h1 style={{
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15,
            color: '#fff', margin: '0 0 12px',
          }}>
            Training Programs
          </h1>
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.7)', margin: 0, maxWidth: '560px' }}>
            Open-enrollment courses and in-house programs across 11 professional categories. Each course links to a dedicated page with full program details, learning outcomes, and scheduling.
          </p>
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
          <div style={{ display: 'flex', border: '1.5px solid #DDE4EC', borderRadius: '6px', overflow: 'hidden' }}>
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
                background: '#1E88E5', color: '#fff', border: 'none',
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
            gridTemplateColumns: view === 'list' ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
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
