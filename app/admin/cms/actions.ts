'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getAdminSession } from '@/lib/auth'

import { revalidatePath } from 'next/cache'

export async function upsertProgram(formData: FormData) {
  const session = await getAdminSession()
  if (!session) return { error: 'Unauthorized' }

  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category_id = formData.get('category_id') as string
  const short_description = formData.get('short_description') as string
  const overview = formData.get('overview') as string
  const target_audience = formData.get('target_audience') as string
  const duration_days = parseInt(formData.get('duration_days') as string)
  const format = formData.get('format') as string
  const price_type = formData.get('price_type') as string
  const price_per_person = formData.get('price_per_person') ? parseFloat(formData.get('price_per_person') as string) : null
  const hero_image_url = formData.get('hero_image_url') as string
  const card_image_url = formData.get('card_image_url') as string
  const is_featured = formData.get('is_featured') === 'true'

  let learning_outcomes: string[] = []
  try {
    learning_outcomes = JSON.parse(formData.get('learning_outcomes') as string || '[]')
  } catch (e) {
    // skip
  }

  const payload = {
    title,
    slug,
    category_id: category_id || null,
    short_description,
    overview,
    learning_outcomes,
    target_audience,
    duration_days,
    format,
    price_type,
    price_per_person,
    hero_image_url,
    card_image_url,
    is_featured
  }

  try {
    if (id) {
      const { error } = await supabaseAdmin.from('programs').update(payload).eq('id', id)
      if (error) throw error
    } else {
      const { error } = await supabaseAdmin.from('programs').insert([payload])
      if (error) throw error
    }
    
    // Clear cache so changes appear on live website
    revalidatePath('/')
    revalidatePath('/programs')
    revalidatePath('/admin/cms')
    
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to save program' }
  }
}

export async function deleteProgram(id: string) {
  const session = await getAdminSession()
  if (!session) return { error: 'Unauthorized' }

  try {
    const { error } = await supabaseAdmin.from('programs').delete().eq('id', id)
    if (error) throw error
    
    revalidatePath('/')
    revalidatePath('/programs')
    revalidatePath('/admin/cms')
    
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to delete program' }
  }
}

export async function updateCompanySettings(formData: FormData) {
  const session = await getAdminSession()
  if (!session) return { error: 'Unauthorized' }

  const id = formData.get('id') as string | null
  
  const payload = {
    company_name: formData.get('company_name') as string,
    description: formData.get('description') as string,
    phone_numbers: JSON.parse(formData.get('phone_numbers') as string || '[]'),
    email_addresses: JSON.parse(formData.get('email_addresses') as string || '[]'),
    office_address: formData.get('office_address') as string,
    whatsapp_number: formData.get('whatsapp_number') as string,
    social_media_links: JSON.parse(formData.get('social_media_links') as string || '{}'),
    google_maps_location: formData.get('google_maps_location') as string,
    updated_at: new Date().toISOString()
  }

  try {
    if (id) {
      const { error } = await supabaseAdmin.from('company_settings').update(payload).eq('id', id)
      if (error) throw error
    } else {
      const { error } = await supabaseAdmin.from('company_settings').insert([payload])
      if (error) throw error
    }
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to save company settings' }
  }
}

export async function upsertGalleryItem(formData: FormData) {
  const session = await getAdminSession()
  if (!session) return { error: 'Unauthorized' }

  const id = formData.get('id') as string | null
  const event_title = formData.get('event_title') as string
  const event_date = formData.get('event_date') as string || null
  const location = formData.get('location') as string
  const image_url = formData.get('image_url') as string
  const tag = formData.get('tag') as string || 'EVENT'
  
  const payload = {
    event_title,
    event_date,
    location,
    image_url,
    tag
  }

  try {
    if (id) {
      const { error } = await supabaseAdmin.from('gallery_items').update(payload).eq('id', id)
      if (error) throw error
    } else {
      const { error } = await supabaseAdmin.from('gallery_items').insert([payload])
      if (error) throw error
    }
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to save gallery item' }
  }
}

export async function deleteGalleryItem(id: string) {
  const session = await getAdminSession()
  if (!session) return { error: 'Unauthorized' }

  try {
    const { error } = await supabaseAdmin.from('gallery_items').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to delete gallery item' }
  }
}
