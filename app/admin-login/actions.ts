'use server'

import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { redirect } from 'next/navigation'

export async function adminLogin(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  // Get credentials from environment variables, fallback for local dev if not set
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@peakskills.com'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // Generate secure JWT session
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev')
    const token = await new SignJWT({ role: 'admin', email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('peakskills_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return { success: true }
  } else {
    return { error: 'Invalid email or password.' }
  }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('peakskills_admin_session')
  redirect('/admin-login')
}
