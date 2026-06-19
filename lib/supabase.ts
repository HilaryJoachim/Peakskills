import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ── Client ────────────────────────────────────────────────────
// Guard: only create a real client if env vars are present.
// Without them (e.g. during local dev before Supabase is wired up),
// all data-fetch helpers return empty arrays / null gracefully.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function makeClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null
  // Validate URL format before calling createClient (which throws on bad URLs)
  try {
    new URL(supabaseUrl)
  } catch {
    console.warn('[PeakSkills] NEXT_PUBLIC_SUPABASE_URL is not a valid URL — running without database.')
    return null
  }
  try {
    // Use a 60-second timeout — first TLS handshake to Supabase can be slow
    const customFetch = (url: RequestInfo | URL, init?: RequestInit) =>
      fetch(url, { ...init, signal: AbortSignal.timeout(60000) })
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: { fetch: customFetch as typeof fetch },
    })
  } catch (e) {
    console.warn('[PeakSkills] Supabase client init failed — running without database.', e)
    return null
  }
}

export const supabase = makeClient()

function isConfigured(): boolean {
  return supabase !== null
}

// ── Types ─────────────────────────────────────────────────────

export type ProgramFormat = 'in-person' | 'online' | 'hybrid'
export type PriceType = 'paid' | 'free'
export type CohortStatus = 'open' | 'filling-fast' | 'full' | 'completed'
export type ResourceType = 'guide' | 'template' | 'report' | 'video'

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
}

export interface Program {
  id: string
  title: string
  slug: string
  category_id: string | null
  short_description: string | null
  overview: string | null
  learning_outcomes: string[]
  target_audience: string | null
  duration_days: number
  format: ProgramFormat
  price_type: PriceType
  price_per_person: number | null
  hero_image_url: string | null
  card_image_url: string | null
  certification_info: string | null
  is_featured: boolean
  created_at: string
  category?: Category
  cohorts?: Cohort[]
}

export interface Cohort {
  id: string
  program_id: string
  start_date: string
  end_date: string
  location: string | null
  seats_available: number
  status: CohortStatus
}

export interface Testimonial {
  id: string
  author_name: string
  role: string | null
  organization: string | null
  sector: string | null
  quote: string
  rating: number
  avatar_url: string | null
  is_featured: boolean
}

export interface Client {
  id: string
  name: string
  logo_url: string | null
  sector: string | null
  display_order: number
}

export interface TeamMember {
  id: string
  name: string
  role: string | null
  bio: string | null
  credentials: string[]
  photo_url: string | null
  linkedin_url: string | null
  display_order: number
}

// ── Data fetching helpers ─────────────────────────────────────
// Each helper returns an empty value if Supabase is not configured,
// preventing hangs during local development before env vars are set.

export async function getPrograms(options?: {
  featured?: boolean
  categorySlug?: string
  limit?: number
}): Promise<Program[]> {
  if (!isConfigured()) return []

  let query = supabase!
    .from('programs')
    .select('*, category:categories(*), cohorts(*)')
    .order('created_at', { ascending: false })

  if (options?.featured) {
    query = query.eq('is_featured', true)
  }

  if (options?.categorySlug) {
    const { data: cat } = await supabase!
      .from('categories')
      .select('id')
      .eq('slug', options.categorySlug)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching programs:', error.message)
    return []
  }
  return (data as Program[]) ?? []
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  if (!isConfigured()) return null

  const { data, error } = await supabase!
    .from('programs')
    .select('*, category:categories(*), cohorts(*)')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching program:', error.message)
    return null
  }
  return data as Program
}

export async function getAllProgramSlugs(): Promise<string[]> {
  if (!isConfigured()) return []
  const { data } = await supabase!.from('programs').select('slug')
  return (data ?? []).map((p: { slug: string }) => p.slug)
}

export async function getCategories(): Promise<Category[]> {
  if (!isConfigured()) return []
  const { data } = await supabase!
    .from('categories')
    .select('*')
    .order('display_order')
  return (data as Category[]) ?? []
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  if (!isConfigured()) return []
  const { data } = await supabase!
    .from('testimonials')
    .select('*')
    .eq('is_featured', true)
    .limit(3)
  return (data as Testimonial[]) ?? []
}

export async function getClients(): Promise<Client[]> {
  if (!isConfigured()) return []
  const { data } = await supabase!
    .from('clients')
    .select('*')
    .order('display_order')
  return (data as Client[]) ?? []
}

export async function getUpcomingCohorts(limit = 6) {
  if (!isConfigured()) return []
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase!
    .from('cohorts')
    .select('*, program:programs(title, slug, format)')
    .gte('start_date', today)
    .neq('status', 'completed')
    .order('start_date')
    .limit(limit)
  return data ?? []
}
