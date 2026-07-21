import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      fullName, email, phoneNumber, organization, jobTitle,
      programId, sessionId, learningMode, participantsCount
    } = body

    if (!fullName || !email || !phoneNumber || !organization || !jobTitle || !programId || !sessionId || !learningMode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!supabase) {
      // Fallback for mock environment if no Supabase configured
      console.log('Mock Application Submission:', body)
      return NextResponse.json({ success: true, mocked: true })
    }

    // Insert into Supabase
    const { data, error } = await supabase.from('applications').insert({
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      organization,
      job_title: jobTitle,
      program_id: programId,
      session_id: sessionId,
      learning_mode: learningMode,
      participants_count: participantsCount ? parseInt(participantsCount, 10) : 1,
      status: 'Application Submitted'
    }).select('id').single()

    if (error) {
      console.error('Error inserting application:', error)
      return NextResponse.json({ error: 'Database error', details: error.message, hint: error.hint }, { status: 500 })
    }

    // Send emails
    const applicantEmail = `
      <h3>Thank you for applying to PeakSkills.</h3>
      <p>Your application has been received successfully.</p>
      <p>Our admissions team will review your application shortly.</p>
      <p>You will receive another email once your application has been approved.</p>
    `

    await sendEmail({
      to: email,
      subject: 'Application Received',
      html: applicantEmail,
    })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
    const adminEmail = `
      <h3>New Training Application</h3>
      <p><strong>Applicant Name:</strong> ${fullName}</p>
      <p><strong>Organization:</strong> ${organization}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Learning Mode:</strong> ${learningMode}</p>
      <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
      <a href="${baseUrl}/admin/applications" style="display:inline-block;padding:10px 20px;background:#0077B6;color:#fff;text-decoration:none;border-radius:5px;">Review Application</a>
    `

    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@peakskills.co.tz',
      subject: 'New Training Application',
      html: adminEmail,
    })

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
