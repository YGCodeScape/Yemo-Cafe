'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { resetPassword } from '@/lib/auth'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const result = resetPassword(email, newPassword)

    if (!result.success) {
      setError(result.error || 'Failed to reset password.')
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col min-h-dvh p-6 pt-8 bg-[#FDFAF6]">
      {/* Top Back Button */}
      <div className="mb-4">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7362] hover:text-[#2C1A0E] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Sign In
        </Link>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Image
          src="/icons/yemo-logo-bg.png"
          alt="yemo logo"
          width={50}
          height={50}
          className="drop-shadow-sm rounded-2xl"
          priority
        />
        <h1
          className="text-[36px] font-medium text-[#6B3F2A] leading-none tracking-wide"
          style={{ fontFamily: '"Lily Script One", system-ui' }}
        >
          yemo
        </h1>
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h1 className="font-display text-[28px] font-bold text-[#2C1A0E] leading-tight">
          Reset Password
        </h1>
        <p className="text-sm text-[#A89080] mt-1">
          Enter your registered email and set a new password.
        </p>
      </div>

      {success ? (
        <div className="bg-white rounded-3xl p-6 border border-[#EDE2D5] text-center my-auto shadow-xs">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-lg font-bold text-[#2C1A0E] mb-1">Password Reset!</h2>
          <p className="text-xs text-[#8C7362]">
            Your password has been updated. Redirecting to login…
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
          <div>
            <label className="text-xs font-semibold text-[#2C1A0E] block mb-1.5">
              Registered Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
              className="w-full h-12 px-4 bg-[#F2EAE1] border-2 border-[#E2DDD8] rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none focus:border-[#6B3F2A] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#2C1A0E] block mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 6 characters"
              required
              className="w-full h-12 px-4 bg-[#F2EAE1] border-2 border-[#E2DDD8] rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none focus:border-[#6B3F2A] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#2C1A0E] block mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              required
              className="w-full h-12 px-4 bg-[#F2EAE1] border-2 border-[#E2DDD8] rounded-xl text-sm text-[#2C1A0E] placeholder:text-[#A89080] outline-none focus:border-[#6B3F2A] transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 bg-[#6B3F2A] text-[#FDFAF6] rounded-2xl text-sm font-bold mt-2 active:scale-95 transition-transform disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Updating…' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  )
}
