'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getAdminSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { PartnershipService } from '@/lib/supabase'

export async function addPartnershipService(data: Omit<PartnershipService, 'id' | 'created_at'>) {
  const session = await getAdminSession()
  if (!session) throw new Error('Unauthorized')

  const { error } = await supabaseAdmin.from('partnership_services').insert([data])
  if (error) throw new Error(error.message)
  
  revalidatePath('/partnership-services')
  revalidatePath('/admin/cms/partnership-services')
}

export async function updatePartnershipService(id: string, data: Partial<PartnershipService>) {
  const session = await getAdminSession()
  if (!session) throw new Error('Unauthorized')

  const { error } = await supabaseAdmin.from('partnership_services').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/partnership-services')
  revalidatePath('/admin/cms/partnership-services')
}

export async function deletePartnershipService(id: string) {
  const session = await getAdminSession()
  if (!session) throw new Error('Unauthorized')

  const { error } = await supabaseAdmin.from('partnership_services').delete().eq('id', id)
  if (error) throw new Error(error.message)
  
  revalidatePath('/partnership-services')
  revalidatePath('/admin/cms/partnership-services')
}
