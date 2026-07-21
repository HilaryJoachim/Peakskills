import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export async function getStudentSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('peakskills_student_session')?.value
  
  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev')
    const { payload } = await jwtVerify(token, secret)
    return payload as { studentId: string; email: string; role: string }
  } catch (error) {
    return null
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('peakskills_admin_session')?.value
  
  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev')
    const { payload } = await jwtVerify(token, secret)
    return payload as { role: string; email: string }
  } catch (error) {
    return null
  }
}
