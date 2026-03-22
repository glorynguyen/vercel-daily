import { cookies } from 'next/headers'
import { API_BASE_URL, requestInit } from './data'

export const X_SUBCRIPTION_TOKEN_KEY = 'x-subscription-token';
export const SUBCRIPTION_API = `${API_BASE_URL}/subscription`;

export async function getSubscriptionStatusFromCookie() {
  const cookieStore = await cookies()
  const token = cookieStore.get(X_SUBCRIPTION_TOKEN_KEY)?.value

  if (!token) return false

  const res = await fetch(
    SUBCRIPTION_API,
    {
      headers: { [X_SUBCRIPTION_TOKEN_KEY]: token, ...requestInit.headers as Record<string, string> },
    }
  )

  if (!res.ok) {
    return false
  }

  const data = await res.json()
  if (data.data?.status !== 'active') {
    return false
  }

  return true
}