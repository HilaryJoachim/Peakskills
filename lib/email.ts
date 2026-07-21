import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    // If SMTP_USER is not configured, we'll just log it for local testing
    if (!process.env.SMTP_USER) {
      console.log(`[Email Mock] To: ${to} | Subject: ${subject}`)
      console.log(`[Email Mock] Body: ${html}`)
      return { success: true, mocked: true }
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"PeakSkills Admissions" <admissions@peakskills.co.tz>',
      to,
      subject,
      html,
    })

    console.log(`Email sent: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}
