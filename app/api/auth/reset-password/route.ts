import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 })
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 })
    }

    // Find the application by the token
    const { data: app, error: appError } = await supabase
      .from('applications')
      .select('id')
      .eq('activation_token', token)
      .single()

    if (appError || !app) {
      return NextResponse.json({ error: 'Invalid or expired password reset token' }, { status: 400 })
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update the student's password
    const { error: studentError } = await supabase
      .from('students')
      .update({ password_hash: hashedPassword })
      .eq('application_id', app.id)

    if (studentError) {
      console.error('Error updating student password:', studentError)
      return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
    }

    // Clear the token so it can't be used again
    const { error: clearTokenError } = await supabase
      .from('applications')
      .update({ activation_token: null })
      .eq('id', app.id)

    if (clearTokenError) {
      console.error('Error clearing token:', clearTokenError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
