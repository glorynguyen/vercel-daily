'use server'

import { cookies } from 'next/headers'
import { requestInit } from '../data'
import { SUBCRIPTION_API, X_SUBCRIPTION_TOKEN_KEY } from '../subscription';

export async function subscribe() {
  const createRes = await fetch(`${SUBCRIPTION_API}/create`, {
    method: 'POST',
    ...requestInit,
  })
  const token = createRes.headers.get(X_SUBCRIPTION_TOKEN_KEY);
  if (!token) throw new Error('Failed to create subscription');

  const activateRes = await fetch(
    SUBCRIPTION_API,
    {
      method: 'POST',
      headers: { [X_SUBCRIPTION_TOKEN_KEY]: token, ...requestInit.headers },
    }
  )

  if (!activateRes.ok) throw new Error('Failed to activate subscription')

  const cookieStore = await cookies()
  cookieStore.set({
    name: X_SUBCRIPTION_TOKEN_KEY,
    value: token,
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  })
}

export async function unsubscribe() {
  const cookieStore = await cookies()
  const token = cookieStore.get(X_SUBCRIPTION_TOKEN_KEY)?.value

  if (!token) return;
  const res = await fetch(
    SUBCRIPTION_API,
    {
      method: 'DELETE',
      headers: { [X_SUBCRIPTION_TOKEN_KEY]: token, ...requestInit.headers },
    }
  )

  if (!res.ok) throw new Error('Failed to unsubscribe')

  cookieStore.delete(X_SUBCRIPTION_TOKEN_KEY)
}
