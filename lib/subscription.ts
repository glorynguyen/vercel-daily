import { cookies } from 'next/headers'
import { API_BASE_URL } from './data'

export const X_SUBCRIPTION_TOKEN_KEY = 'x-subscription-token';
export const SUBCRIPTION_API = `${API_BASE_URL}/subscription`;

export async function getSubscriptionStatusFromCookie() {
  const cookieStore = await cookies()
  return !!cookieStore.get(X_SUBCRIPTION_TOKEN_KEY)?.value
}

export async function verifySubscription() {
  const cookieStore = await cookies()
  const token = cookieStore.get(X_SUBCRIPTION_TOKEN_KEY)?.value

  if (!token) return false

  const res = await fetch(
    SUBCRIPTION_API,
    {
      headers: { [X_SUBCRIPTION_TOKEN_KEY]: token },
    }
  )

  if (!res.ok) {
    cookieStore.delete(X_SUBCRIPTION_TOKEN_KEY)
    return false
  }

  const data = await res.json()
  if (data.data?.status !== 'active') {
    cookieStore.delete(X_SUBCRIPTION_TOKEN_KEY)
    return false
  }

  return true
}