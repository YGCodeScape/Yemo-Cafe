'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function VerifyForm() {
  const router  = useRouter()
  const params  = useSearchParams()
  const email   = params.get('email') ?? ''

  const [otp, setOtp]             = useState(['', '', '', '', '', ''])
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [countdown, setCountdown] = useState(60)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 0), 1000)
    return () => clearInterval(t)
  }, [])

  function handleChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 5) inputs.current[i + 1]?.focus()
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  async function handleVerify() {
    const token = otp.join('')
    if (token.length < 6) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/home')
  }

  async function handleResend() {
    const supabase = createClient()
    await supabase.auth.resend({ type: 'signup', email })
    setCountdown(60)
  }

  const code = otp.join('')

  return (
    <div className='flex flex-col min-h-dvh p-6 pt-16 items-center text-center'>
      <div className='w-20 h-20 bg-[#F2EAE1] rounded-[28px] flex items-center justify-center text-4xl mb-5 border border-[#E2DDD8] shadow-sm'>
        📬
      </div>

      <h1 className='font-display text-[24px] font-bold text-[#2C1A0E] leading-tight mb-3'>
        Check your<br />inbox
      </h1>

      <p className='text-sm text-[#A89080] leading-relaxed mb-8'>
        We sent a 6-digit code to<br />
        <span className='text-[#6B3F2A] font-bold'>{email}</span>
      </p>

      {/* OTP boxes */}
      <div className='flex gap-2.5 mb-8'>
        {otp.map((d, i) => (
          <input
            key={i}
            ref={el => { inputs.current[i] = el }}
            type='text'
            inputMode='numeric'
            maxLength={1}
            value={d}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            className={`w-11 h-14 text-center text-xl font-bold text-[#2C1A0E] bg-[#F2EAE1] border-2 rounded-2xl outline-none transition-colors ${
              d ? 'border-[#6B3F2A]' : 'border-[#E2DDD8]'
            } focus:border-[#D4956A]`}
          />
        ))}
      </div>

      {error && (
        <div className='w-full bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600 mb-4'>
          {error}
        </div>
      )}

      <button
        onClick={handleVerify}
        disabled={code.length < 6 || loading}
        className='w-full h-12 bg-[#6B3F2A] text-[#FDFAF6] rounded-2xl text-sm font-bold mb-5 active:scale-95 transition-transform disabled:opacity-50'
      >
        {loading ? 'Verifying…' : 'Verify Email'}
      </button>

      {countdown > 0 ? (
        <p className='text-xs text-[#A89080]'>
          Resend code in{' '}
          <span className='text-[#D4956A] font-mono font-semibold'>
            0:{String(countdown).padStart(2, '0')}
          </span>
        </p>
      ) : (
        <button onClick={handleResend} className='text-xs text-[#6B3F2A] font-semibold'>
          Resend code
        </button>
      )}

      <p className='text-xs text-[#A89080] mt-3'>
        Wrong email?{' '}
        <span
          className='text-[#6B3F2A] font-semibold cursor-pointer'
          onClick={() => router.push('/auth/signup')}
        >
          Change
        </span>
      </p>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className='flex min-h-dvh items-center justify-center text-[#A89080] text-sm'>Loading…</div>}>
      <VerifyForm />
    </Suspense>
  )
}


