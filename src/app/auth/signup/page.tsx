'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, ChevronLeft } from 'lucide-react'

function strengthScore(pw: string) {
  let score = 0
  if (pw.length >= 8)    score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

export default function SignupPage() {
  const router = useRouter()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const score = strengthScore(password)
  const strengthColors = ['bg-[#E2DDD8]', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400']
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (score < 2) { setError('Please use a stronger password'); return }
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    })
    if (error) { setError(error.message); setLoading(false) }
    else { router.push('/home') }
  }

  return (
    <div className='flex flex-col min-h-dvh p-6 pt-10'>

      <div className='mb-6'>
        <h1 className='font-display text-[36px] font-bold text-[#2C1A0E] leading-tight'>
          Be a Part of <br /> <span style={{ fontFamily: '"Lily Script One", system-ui' }} className='text-[#6B3F2A]' >yemo</span> Family
        </h1>
        <p className='text-sm text-[#A89080] mt-2'>Create your account to start ordering</p>
      </div>

      <form onSubmit={handleSignup} className='flex flex-col gap-3 flex-1'>

        {/* Full Name */}
        <div>
          <label className='text-sm font-semibold text-[#2C1A0E] block mb-1.5'>Full Name</label>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Your name'
            required
            className='w-full h-12 px-4 bg-[#F2EAE1] border-2 border-[#E2DDD8] rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none focus:border-[#6B3F2A] transition-colors'
          />
        </div>

        {/* Email */}
        <div>
          <label className='text-sm font-semibold text-[#2C1A0E] block mb-1.5'>Email address</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='you@email.com'
            required
            className='w-full h-12 px-4 bg-[#F2EAE1] border-2 border-[#E2DDD8] rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none focus:border-[#6B3F2A] transition-colors'
          />
        </div>

        {/* Password */}
        <div>
          <label className='text-sm font-semibold text-[#2C1A0E] block mb-1.5'>Password</label>
          <div className='relative'>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Min. 8 characters'
              required
              className='w-full h-12 px-4 pr-11 bg-[#F2EAE1] border-2 border-[#E2DDD8] rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none focus:border-[#6B3F2A] transition-colors'
            />
            <button
              type='button'
              onClick={() => setShowPw(!showPw)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-[#A89080]'
            >
              {showPw ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {password && (
            <div className='mt-2'>
              <div className='flex gap-1'>
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`flex-1 h-1 rounded-full transition-colors ${
                      i <= score ? strengthColors[score] : 'bg-[#E2DDD8]'
                    }`}
                  />
                ))}
              </div>
              <p className='text-xs text-[#A89080] mt-1'>{strengthLabels[score]}</p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className='text-sm font-semibold text-[#2C1A0E] block mb-1.5'>Confirm Password</label>
          <div className='relative'>
            <input
              type={showConfirmPw ? 'text' : 'password'}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder='Repeat password'
              required
              className={`w-full h-12 px-4 pr-11 bg-[#F2EAE1] border-2 rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none transition-colors ${
                confirm && confirm !== password
                  ? 'border-red-400'
                  : 'border-[#E2DDD8] focus:border-[#6B3F2A]'
              }`}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPw(!showConfirmPw)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-[#A89080]'
            >
              {showConfirmPw ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600'>
            {error}
          </div>
        )}

        <button
          type='submit'
          disabled={loading}
          className='h-12 bg-[#6B3F2A] text-[#FDFAF6] rounded-2xl text-sm font-bold mt-3 active:scale-95 transition-transform disabled:opacity-60'
        >
          {loading ? 'Creating account…' : 'Create Account →'}
        </button>

        <p className='text-center text-[14px] text-[#A89080] leading-relaxed'>
          By signing up you agree to our{' '}
          <span className='text-[#D4956A]'>Terms</span>
          {' & '}
          <span className='text-[#D4956A]'>Privacy Policy</span>
        </p>

        <p className='text-center text-md text-[#A89080] mt-auto pt-2'>
          Have an account?{' '}
          <Link href='/auth/login' className='text-[#6B3F2A] font-bold'>Log in</Link>
        </p>
      </form>
    </div>
  )
}
