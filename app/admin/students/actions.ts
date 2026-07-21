'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getStudents() {
  if (!supabase) return []

  const { data, error } = await supabase
    .from('students')
    .select('*, application:applications(full_name, email, phone_number, learning_mode, program:programs(title), session:cohorts(start_date))')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching students:', error)
    return []
  }
  return data
}

export async function updateStudentStatus(studentId: string, status: string) {
  if (!supabase) return

  const { error } = await supabase
    .from('students')
    .update({ status })
    .eq('id', studentId)

  if (error) {
    console.error('Error updating status:', error)
    throw new Error('Failed to update student status')
  }

  revalidatePath('/admin/students')
}

export async function updatePaymentStatus(studentId: string, paymentStatus: string) {
  if (!supabase) return

  let statusUpdate = {}
  if (paymentStatus === 'Paid') {
    // If they were waiting for payment, activate them
    statusUpdate = { payment_status: 'Paid', status: 'Active Student' }
  } else {
    statusUpdate = { payment_status: paymentStatus }
  }

  const { error } = await supabase
    .from('students')
    .update(statusUpdate)
    .eq('id', studentId)

  if (error) {
    console.error('Error updating payment status:', error)
    throw new Error('Failed to update payment status')
  }

  revalidatePath('/admin/students')
}
