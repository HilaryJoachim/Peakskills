'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getProgramsForDropdown() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('programs')
    .select('id, title')
    .order('title', { ascending: true })

  if (error) {
    console.error('Error fetching programs:', error)
    return []
  }
  return data
}

export async function getCurriculum(programId: string) {
  if (!supabase) return []
  
  // Fetch modules along with their materials and assignments
  const { data, error } = await supabase
    .from('modules')
    .select(`
      *,
      course_materials(*),
      assignments(*)
    `)
    .eq('program_id', programId)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching curriculum:', error)
    return []
  }
  return data
}

export async function createModule(programId: string, title: string, description: string) {
  if (!supabase) throw new Error('Supabase client not initialized')
  const { error } = await supabase
    .from('modules')
    .insert([{ program_id: programId, title, description, order_index: 0 }])

  if (error) throw new Error('Failed to create module')
  revalidatePath('/admin/curriculum')
  revalidatePath('/portal/classes')
}

export async function deleteModule(moduleId: string) {
  if (!supabase) return
  await supabase.from('modules').delete().eq('id', moduleId)
  revalidatePath('/admin/curriculum')
  revalidatePath('/portal/classes')
}

export async function createMaterial(moduleId: string, title: string, url: string, type: string = 'Link') {
  if (!supabase) throw new Error('Supabase client not initialized')
  const { error } = await supabase
    .from('course_materials')
    .insert([{ module_id: moduleId, title, url, type }])

  if (error) throw new Error('Failed to add material')
  revalidatePath('/admin/curriculum')
  revalidatePath('/portal/classes')
}

export async function deleteMaterial(materialId: string) {
  if (!supabase) return
  await supabase.from('course_materials').delete().eq('id', materialId)
  revalidatePath('/admin/curriculum')
  revalidatePath('/portal/classes')
}

export async function createAssignment(moduleId: string, title: string, description: string) {
  if (!supabase) throw new Error('Supabase client not initialized')
  const { error } = await supabase
    .from('assignments')
    .insert([{ module_id: moduleId, title, description }])

  if (error) throw new Error('Failed to add assignment')
  revalidatePath('/admin/curriculum')
  revalidatePath('/portal/classes')
}

export async function deleteAssignment(assignmentId: string) {
  if (!supabase) return
  await supabase.from('assignments').delete().eq('id', assignmentId)
  revalidatePath('/admin/curriculum')
  revalidatePath('/portal/classes')
}
