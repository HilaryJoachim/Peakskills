import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Find all applications for this email
    const { data: apps, error: appsError } = await supabase
      .from('applications')
      .select('id, full_name, email')
      .eq('email', email)
      .order('submitted_at', { ascending: false })

    if (appsError || !apps || apps.length === 0) {
      // Don't leak that the email doesn't exist for security reasons, just return success
      return NextResponse.json({ success: true })
    }

    let targetApp = null
    let targetStudent = null

    // Check which application has an associated active student account
    for (const app of apps) {
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('id')
        .eq('application_id', app.id)
        .single()

      if (student && !studentError) {
        targetApp = app
        targetStudent = student
        break
      }
    }

    if (!targetApp) {
      // Again, don't leak information
      return NextResponse.json({ success: true })
    }

    const app = targetApp

    // Generate a reset token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    // Store the token in the application's activation_token field
    const { error: updateError } = await supabase
      .from('applications')
      .update({ activation_token: token })
      .eq('id', app.id)

    if (updateError) {
      console.error('Error updating reset token:', updateError)
      return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
    }

    // Send email
    const host = request.headers.get('host') || 'localhost:3000'
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`
    const resetLink = `${baseUrl}/reset-password?token=${token}`

    const emailHtml = `
      <h3>Password Reset Request</h3>
      <p>Dear ${app.full_name},</p>
      <p>We received a request to reset your password for the PeakSkills Student Portal.</p>
      <p>Click the button below to choose a new password:</p>
      <br/>
      <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#0FAFAF;color:#fff;text-decoration:none;border-radius:5px;font-weight:bold;">Reset Password</a>
      <br/><br/>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `

    await sendEmail({
      to: app.email,
      subject: 'Reset your PeakSkills password',
      html: emailHtml
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
