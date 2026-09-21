export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-dvh bg-[#FDFAF6] flex flex-col'>
      {children}
    </div>
  )
}
