'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Coffee } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/home')
    }
  }

  return (
    <div className='flex flex-col min-h-dvh p-6 pt-8'>
        {/* Logo */}
      <div className="relative z-10 flex items-center justify-center gap-2" >
        <Image
          src="/icons/yemo-logo-bg.png"
          alt="yemo logo"
          width={55}
          height={55}
          className="drop-shadow-sm rounded-2xl"
          priority
        />
        <h1
          className="text-[40px] font-medium text-[#6B3F2A] leading-none tracking-wide"
          style={{ fontFamily: '"Lily Script One", system-ui' }}
        >
          yemo
        </h1>
      </div>

      {/* Heading */}
      <div className=' mt-6 mb-4'>
        <h1 className='font-display text-[32px] font-bold text-[#2C1A0E] leading-tight'>
          Welcome back.
        </h1>
        <p className='text-md text-[#A89080]'>Sign in to continue your order</p>
      </div>

      <div className='h-px bg-[#E2DDD8] mb-8' />

      {/* Form */}
      <form onSubmit={handleLogin} className='flex flex-col gap-4 flex-1'>
        <div>
          <label className='text-xs font-semibold text-[#2C1A0E] block mb-1.5'>Email address</label>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='you@email.com'
            required
            className='w-full h-12 px-4 bg-[#F2EAE1] border-2 border-[#6B3F2A] rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none focus:border-[#D4956A] transition-colors'
          />
        </div>

        <div>
          <label className='text-xs font-semibold text-[#2C1A0E] block mb-1.5'>Password</label>
          <div className='relative'>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='••••••••'
              required
              className='w-full h-12 px-4 pr-11 bg-[#F2EAE1] border-2 border-[#E2DDD8] rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none focus:border-[#6B3F2A] transition-colors'
            />
            <button type='button' onClick={() => setShowPw(!showPw)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-[#A89080]'>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className='text-right mt-1'>
            <Link href='/auth/forgot' className='text-xs text-[#D4956A] font-semibold'>Forgot password?</Link>
          </div>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600'>{error}</div>
        )}

        <button type='submit' disabled={loading}
          className='h-12 bg-[#6B3F2A] text-[#FDFAF6] rounded-2xl text-md font-bold mt-2 active:scale-95 transition-transform disabled:opacity-60'>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <div className='flex items-center gap-3'>
          <div className='flex-1 h-px bg-[#E2DDD8]' />
          <span className='text-xs text-[#A89080]'>or</span>
          <div className='flex-1 h-px bg-[#E2DDD8]' />
        </div>

        <Link href='/home'
          className='h-12 border-2 border-[#E2DDD8] rounded-2xl text-md font-semibold text-[#A89080] flex items-center justify-center gap-2 active:bg-[#F2EAE1] transition-colors'>
          👋 Continue as Guest
        </Link>

        <p className='text-center text-md text-[#A89080] mt-auto'>
          New here?{'  '}
          <Link href='/auth/signup' className='text-[#6B3F2A] font-bold'>Create account →</Link>
        </p>
      </form>
    </div>
  )
}
