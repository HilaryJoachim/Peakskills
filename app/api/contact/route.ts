import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, company, subject, message } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const adminEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0077B6; border-bottom: 2px solid #0077B6; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0 0 10px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 0 0 10px;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p style="margin: 0 0 10px;"><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p style="margin: 0 0 10px;"><strong>Subject:</strong> <span style="display:inline-block; padding:3px 8px; background:#e0f2fe; color:#0369a1; border-radius:4px; font-size:14px;">${subject || 'General Inquiry'}</span></p>
        </div>

        <h3 style="color: #333; margin-top: 24px;">Message:</h3>
        <div style="background-color: #fff; padding: 15px; border-left: 4px solid #0077B6; margin-top: 10px; font-size: 15px; line-height: 1.6; color: #444;">
          ${message.replace(/\n/g, '<br />')}
        </div>
        
        <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
          Submitted at: ${new Date().toLocaleString('en-TZ', { timeZone: 'Africa/Dar_es_Salaam' })}
        </p>
      </div>
    `

    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@peakskills.co.tz',
      subject: `Contact Inquiry: ${subject || 'Website Visitor'}`,
      html: adminEmail,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
