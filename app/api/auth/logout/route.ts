import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  
  cookieStore.delete('peakskills_student_session')
  cookieStore.delete('peakskills_admin_session')
  
  return NextResponse.json({ success: true })
}
