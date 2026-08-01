import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Find all applications by email
    const { data: apps, error: appsError } = await supabase
      .from('applications')
      .select('id, email, full_name')
      .eq('email', email)
      .order('submitted_at', { ascending: false })

    if (appsError || !apps || apps.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    let targetApp = null
    let targetStudent = null

    // Check which application has an associated active student account
    for (const app of apps) {
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('id, password_hash, status')
        .eq('application_id', app.id)
        .single()

      if (student && !studentError) {
        targetApp = app
        targetStudent = student
        break
      }
    }

    if (!targetApp || !targetStudent) {
      return NextResponse.json({ error: 'Student account not found or not approved' }, { status: 401 })
    }

    const app = targetApp
    const student = targetStudent

    if (!student.password_hash) {
      return NextResponse.json({ error: 'Account not activated. Please check your email for the activation link.' }, { status: 401 })
    }

    // Compare passwords
    const isValid = await bcrypt.compare(password, student.password_hash)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Create session (JWT in cookies)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev')
    const jwt = await new SignJWT({ studentId: student.id, email: app.email, role: 'student', name: app.full_name })
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

    return NextResponse.json({ success: true, redirect: '/portal' })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
