import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { Search, Bell, Menu as MenuIcon, ShoppingCart, Users, UserCog, Calendar, Wrench, DollarSign, Ticket, CreditCard, BarChart3, MessageSquare, FileText, Settings, Home, type LucideIcon } from 'lucide-react'
import Logo from './Logo'
export const menu: [string, string, LucideIcon][] = [['Dashboard', '', Home], ['Pesanan', 'pesanan', ShoppingCart], ['Pelanggan', 'pelanggan', Users], ['Teknisi', 'teknisi', UserCog],
  ['Jadwal & Penugasan', 'jadwal', Calendar], ['Layanan', 'layanan', Wrench], ['Manajemen Harga', 'harga', DollarSign], ['Promo & Voucher', 'promo', Ticket],
  ['Pembayaran', 'pembayaran', CreditCard], ['Laporan', 'laporan', BarChart3], ['Ulasan & Feedback', 'ulasan', MessageSquare], ['Notifikasi', 'notifikasi', Bell],
  ['CMS & Konten', 'cms', FileText], ['Pengaturan', 'pengaturan', Settings]]
export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-screen">
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col overflow-y-auto bg-white p-3 transition-transform lg:static lg:translate-x-0 ${open ? '' : '-translate-x-full'}`}>
        <div className="mb-5 mt-2"><Logo /></div>
        <nav className="flex-1 space-y-0.5">{menu.map(([n, p, I]) => (
          <NavLink key={n} end={p === ''} to={p ? `/admin/${p}` : '/admin'} onClick={() => setOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}><I size={16} />{n}</NavLink>))}</nav>
        <Link to="/app" className="mt-3 rounded-xl bg-gradient-to-br from-sky-200 to-blue-400 p-3 text-sm font-bold text-blue-900">Cleaner Home<br />Better Living<span className="mt-1 block text-[10px] font-normal">Buka aplikasi pelanggan →</span></Link>
        <p className="mt-3 text-[10px] text-slate-400">© 2026 Vareesta. v1.0.0</p>
      </aside>
      <main className="min-w-0 flex-1 space-y-4 p-4 md:p-5">
        <header className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setOpen(true)}><MenuIcon /></button>
          <div className="relative max-w-md flex-1"><Search size={16} className="absolute left-3 top-2.5 text-slate-400" /><input placeholder="Cari pesanan, pelanggan, teknisi..." className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand" /></div>
          <div className="relative ml-auto"><Bell size={20} /><span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-[9px] text-white">3</span></div>
          <div className="flex items-center gap-2 border-l pl-3"><div className="h-9 w-9 rounded-full bg-blue-600" /><div className="hidden text-xs leading-tight sm:block"><b className="text-sm">Zakariya</b><br />Administrator</div></div>
        </header>
        <Outlet />
      </main>
    </div>)
}
