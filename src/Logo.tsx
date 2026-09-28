export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = { sm: 'text-base', md: 'text-xl', lg: 'text-3xl' }[size]
  return (
    <div className="flex flex-col items-center leading-none">
      <svg viewBox="0 0 48 40" className={size === 'lg' ? 'h-14' : 'h-8'} fill="none">
        <path d="M24 2 4 16l4 3 16-12 16 12 4-3z" fill="#1e3a8a" />
        <path d="M6 16h10l8 18 8-18h10L26 38h-4z" fill="#2563eb" />
        <rect x="21" y="9" width="6" height="6" fill="#fff" />
      </svg>
      <span className={`${s} font-black tracking-tight text-blue-900`}>VAREESTA</span>
      <span className="text-[6px] tracking-widest text-slate-500">HOME SERVICE &amp; PROPERTY CARE</span>
    </div>
  )
}
