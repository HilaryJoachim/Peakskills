import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 })
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Find the application by activation token
    const { data: app, error: appError } = await supabase
      .from('applications')
      .select('id, email')
      .eq('activation_token', token)
      .single()

    if (appError || !app) {
      return NextResponse.json({ error: 'Invalid or expired activation link' }, { status: 400 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Update the student record
    const { data: student, error: studentError } = await supabase
      .from('students')
      .update({ password_hash: passwordHash })
      .eq('application_id', app.id)
      .select('id')
      .single()

    if (studentError || !student) {
      console.error(studentError)
      return NextResponse.json({ error: 'Failed to update student account' }, { status: 500 })
    }

    // Clear the activation token
    await supabase
      .from('applications')
      .update({ activation_token: null })
      .eq('id', app.id)

    // Create session (JWT in cookies)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev')
    const jwt = await new SignJWT({ studentId: student.id, email: app.email, role: 'student' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret)

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('peakskills_student_session', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Activation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
