'use server'

import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export async function getApplications() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('applications')
    .select('*, program:programs(title), session:cohorts(start_date), student:students(status, payment_status)')
    .order('submitted_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching applications:', error)
    return []
  }
  return data
}

export async function approveApplication(appId: string) {
  if (!supabase) return

  // Generate activation token
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const studentId = `PS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

  const { data: app, error: appError } = await supabase
    .from('applications')
    .update({ status: 'Approved - Awaiting Payment', approved_at: new Date().toISOString(), activation_token: token })
    .eq('id', appId)
    .select()
    .single()

  if (appError) {
    console.error('Error updating application:', appError)
    throw new Error('Failed to approve application')
  }

  // Create student record
  const { error: studentError } = await supabase
    .from('students')
    .insert({
      id: studentId,
      application_id: app.id,
      status: 'Approved - Awaiting Payment',
      payment_status: 'Unpaid',
      payment_deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days
    })

  if (studentError) {
    console.error('Error creating student:', studentError)
    throw new Error('Failed to create student record')
  }

  // Send Email
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`
  const activationLink = `${baseUrl}/create-account?token=${token}`
  const emailHtml = `
    <h3>Congratulations! Your application has been approved.</h3>
    <p>Dear ${app.full_name},</p>
    <p>Congratulations. Your application has been approved.</p>
    <p>Before your training begins, please activate your student account and secure your seat by paying the course fee within 3 days.</p>
    <br/>
    <a href="${activationLink}" style="display:inline-block;padding:10px 20px;background:#0077B6;color:#fff;text-decoration:none;border-radius:5px;">Activate My Student Portal</a>
  `

  await sendEmail({
    to: app.email,
    subject: 'Congratulations! Your application has been approved.',
    html: emailHtml
  })

  revalidatePath('/admin/applications')
  revalidatePath('/admin')
}

export async function rejectApplication(appId: string) {
  if (!supabase) return
  
  const { error } = await supabase
    .from('applications')
    .update({ status: 'Rejected' })
    .eq('id', appId)

  if (error) {
    console.error('Error rejecting application:', error)
    throw new Error('Failed to reject application')
  }

  revalidatePath('/admin/applications')
}

export async function markAsPaid(appId: string) {
  if (!supabase) return

  const { error } = await supabase
    .from('students')
    .update({ status: 'Active Student', payment_status: 'Paid' })
    .eq('application_id', appId)

  if (error) {
    console.error('Error updating student to paid:', error)
    throw new Error('Failed to mark as paid')
  }

  revalidatePath('/admin/applications')
  revalidatePath('/admin')
}
