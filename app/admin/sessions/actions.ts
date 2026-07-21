'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getTrainingSessions() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('training_sessions')
    .select('*, cohort:cohorts(start_date, program:programs(title))')
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching sessions:', error)
    return []
  }
  return data
}

export async function getCohortsForDropdown() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('cohorts')
    .select('id, start_date, program:programs(title)')
    .order('start_date', { ascending: false })

  if (error) {
    console.error('Error fetching cohorts:', error)
    return []
  }
  return data
}

export async function createTrainingSession(formData: {
  cohort_id: string
  title: string
  date: string
  time: string
  trainer: string
  venue: string
  meeting_link: string
}) {
  if (!supabase) throw new Error('Supabase client not initialized')

  const { error } = await supabase
    .from('training_sessions')
    .insert([
      {
        cohort_id: formData.cohort_id,
        title: formData.title,
        date: formData.date,
        time: formData.time,
        trainer: formData.trainer,
        venue: formData.venue,
        meeting_link: formData.meeting_link,
        status: 'Scheduled'
      }
    ])

  if (error) {
    console.error('Error creating session:', error)
    throw new Error('Failed to create session')
  }

  revalidatePath('/admin/sessions')
  revalidatePath('/portal/schedule')
}

export async function updateTrainingSession(id: string, formData: any) {
  if (!supabase) throw new Error('Supabase client not initialized')
  const { error } = await supabase
    .from('training_sessions')
    .update({
      cohort_id: formData.cohort_id,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      trainer: formData.trainer,
      venue: formData.venue,
      meeting_link: formData.meeting_link,
    })
    .eq('id', id)

  if (error) throw new Error('Failed to update session')
  revalidatePath('/admin/sessions')
  revalidatePath('/portal/schedule')
}

export async function updateSessionLink(id: string, meeting_link: string) {
  if (!supabase) throw new Error('Supabase client not initialized')
  const { error } = await supabase
    .from('training_sessions')
    .update({ meeting_link })
    .eq('id', id)

  if (error) throw new Error('Failed to update link')
  revalidatePath('/admin/sessions')
  revalidatePath('/portal/schedule')
}
