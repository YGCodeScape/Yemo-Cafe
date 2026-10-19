'use client'

/**
 * Yemo Café - Beta Local Authentication Utility
 * 
 * Stores user dataset in localStorage with SHA-256 hashed passwords.
 * Manages active session in localStorage & syncs session cookie for Next.js middleware and SSR.
 * Completely self-contained without backend or Supabase dependencies.
 */

export interface StoredUser {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
}

export interface CurrentUserSession {
  id: string
  name: string
  email: string
  loggedInAt: string
}

const STORAGE_USERS_KEY = 'yemo_users'
const STORAGE_CURRENT_USER_KEY = 'yemo_current_user'
const SESSION_COOKIE_NAME = 'yemo_session'

/**
 * Pure JavaScript SHA-256 implementation.
 * Guaranteed to work in all browser environments (HTTP, LAN IPs, WebView)
 * without depending on window.crypto.subtle (which requires HTTPS).
 */
export function hashPassword(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount))
  }

  const mathPow = Math.pow
  const maxWord = mathPow(2, 32)
  const lengthProperty = 'length'
  let i = 0
  let j = 0
  let result = ''
  let words: number[] = []
  const asciiBitLength = ascii[lengthProperty] * 8

  let hash: number[] = []
  const k: number[] = []
  let primeCounter = 0

  const isComposite: { [key: number]: boolean } = {}
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let composite = candidate * candidate; composite < 313; composite += candidate) {
        isComposite[composite] = true
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0
      k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0
      primeCounter++
    }
  }

  ascii += '\x80'
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00'
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i)
    if (j >> 8) return '' // Only ASCII characters
    words[i >> 2] |= j << (((3 - i) % 4) * 8)
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0
  words[words[lengthProperty]] = asciiBitLength | 0

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16))
    const oldHash = [...hash]

    hash = hash.slice(0, 8)
    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15]
      const w2 = w[i - 2]
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6])
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2])
      const temp1 =
        (hash[7] +
          (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) +
          ch +
          k[i] +
          (w[i] = i < 16 ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0)) |
        0
      const temp2 =
        ((rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) +
          maj) |
        0

      hash = [
        (temp1 + temp2) | 0,
        hash[0],
        hash[1],
        hash[2],
        (hash[3] + temp1) | 0,
        hash[4],
        hash[5],
        hash[6],
      ]
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0
    }
  }

  for (i = 0; i < 8; i++) {
    for (let b = 3; b >= 0; b--) {
      const byteVal = (hash[i] >> (8 * b)) & 255
      result += (byteVal < 16 ? '0' : '') + byteVal.toString(16)
    }
  }
  return result
}

// ── Cookie Helpers ──
function setSessionCookie(session: CurrentUserSession) {
  if (typeof document === 'undefined') return
  const serialized = encodeURIComponent(JSON.stringify(session))
  document.cookie = `${SESSION_COOKIE_NAME}=${serialized}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`
}

function clearSessionCookie() {
  if (typeof document === 'undefined') return
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`
}

// ── Local Storage Helpers ──
export function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveStoredUsers(users: StoredUser[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users))
  } catch (err) {
    console.error('Failed to save users in localStorage:', err)
  }
}

export function getCurrentUser(): CurrentUserSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setCurrentSession(session: CurrentUserSession): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(session))
    setSessionCookie(session)
  } catch (err) {
    console.error('Failed to set current user session:', err)
  }
}

/**
 * Signs up a new user:
 * - Checks if user email already exists.
 * - Hashes password with pure JS SHA-256.
 * - Stores user in localStorage dataset (yemo_users).
 * - Creates active session in localStorage & cookie.
 */
export function signUpUser(
  name: string,
  email: string,
  password: string
): { success: boolean; error?: string; user?: CurrentUserSession } {
  const cleanEmail = email.trim().toLowerCase()
  const cleanName = name.trim()

  if (!cleanName) {
    return { success: false, error: 'Please enter your name' }
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please enter a valid email address' }
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' }
  }

  const users = getStoredUsers()
  const existing = users.find((u) => u.email === cleanEmail)
  if (existing) {
    return { success: false, error: 'An account with this email already exists. Please log in.' }
  }

  const passwordHash = hashPassword(password)
  const newUser: StoredUser = {
    id: 'user_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    name: cleanName,
    email: cleanEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveStoredUsers(users)

  // Clear orders, cart and old profile data for fresh user signup
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('yemo_orders_store')
      localStorage.removeItem('yemo_cart_store')
      localStorage.removeItem('yemo_profile_store')
    } catch {}
  }

  const session: CurrentUserSession = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    loggedInAt: new Date().toISOString(),
  }
  setCurrentSession(session)

  return { success: true, user: session }
}

/**
 * Logs in user:
 * - Finds user by email in localStorage dataset.
 * - Hashes password and compares.
 * - Sets active session in localStorage & cookie.
 */
export function loginUser(
  email: string,
  password: string
): { success: boolean; error?: string; user?: CurrentUserSession } {
  const cleanEmail = email.trim().toLowerCase()
  const users = getStoredUsers()

  const found = users.find((u) => u.email === cleanEmail)
  if (!found) {
    return { success: false, error: 'Account not found. Please sign up first.' }
  }

  const candidateHash = hashPassword(password)
  if (found.passwordHash !== candidateHash) {
    return { success: false, error: 'Incorrect password. Please try again.' }
  }

  const session: CurrentUserSession = {
    id: found.id,
    name: found.name,
    email: found.email,
    loggedInAt: new Date().toISOString(),
  }
  setCurrentSession(session)

  return { success: true, user: session }
}

/**
 * Resets password for an existing account by email in localStorage.
 */
export function resetPassword(
  email: string,
  newPassword: string
): { success: boolean; error?: string } {
  const cleanEmail = email.trim().toLowerCase()
  const users = getStoredUsers()
  const foundIndex = users.findIndex((u) => u.email === cleanEmail)
  if (foundIndex === -1) {
    return { success: false, error: 'No account found with this email address.' }
  }
  if (newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' }
  }
  users[foundIndex].passwordHash = hashPassword(newPassword)
  saveStoredUsers(users)
  return { success: true }
}

/**
 * Logout:
 * Clears the active session and clears the stored dataset so the user can test / sign up fresh,
 * as requested for the beta test environment.
 */
export function logoutUser(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY)
    localStorage.removeItem(STORAGE_USERS_KEY)
    localStorage.removeItem('yemo_orders_store')
    localStorage.removeItem('yemo_cart_store')
    localStorage.removeItem('yemo_profile_store')
    clearSessionCookie()
  } catch (err) {
    console.error('Failed to logout:', err)
  }
}
