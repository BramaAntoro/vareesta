import { Link } from 'react-router-dom'
import { Search, Bell, Plus, ShoppingCart, Users, UserCog, Calendar, Wrench, DollarSign, Ticket, CreditCard,
  BarChart3, MessageSquare, FileText, Settings, Home, Wind, Sparkles, Bug, Zap, Droplets, Hammer, Shield,
  Star, ChevronLeft, ChevronRight, Megaphone, Clock, TrendingUp, type LucideIcon } from 'lucide-react'
import Logo from './Logo'

const menu: [string, LucideIcon][] = [['Dashboard', Home], ['Pesanan', ShoppingCart], ['Pelanggan', Users], ['Teknisi', UserCog],
  ['Jadwal & Penugasan', Calendar], ['Layanan', Wrench], ['Manajemen Harga', DollarSign], ['Promo & Voucher', Ticket],
  ['Pembayaran', CreditCard], ['Laporan', BarChart3], ['Ulasan & Feedback', MessageSquare], ['Notifikasi', Bell],
  ['CMS & Konten', FileText], ['Pengaturan', Settings]]

const stats: [string, string, string, string, LucideIcon][] = [
  ['Pesanan Hari Ini', '24', '↑ 33%', 'dari kemarin', ShoppingCart], ['Pelanggan Aktif', '1.248', '↑ 12%', 'dari bulan lalu', Users],
  ['Teknisi Aktif', '12', '● Online', 'dari total 15 teknisi', UserCog], ['Pendapatan Bulan Ini', 'Rp 28.450.000', '↑ 18%', 'dari bulan lalu', BarChart3]]

const status = [['Selesai', 68, '#10b981'], ['Dalam Proses', 28, '#3b82f6'], ['Menunggu', 16, '#fbbf24'], ['Dibatalkan', 8, '#ef4444'], ['Lainnya', 4, '#9ca3af']] as const
const services: [string, number, number, LucideIcon][] = [['Service AC', 38, 31, Wind], ['Cleaning Service', 32, 26, Sparkles], ['Pest Control', 18, 15, Bug],
  ['Electrical', 14, 11, Zap], ['Plumbing', 10, 8, Droplets], ['General Maintenance', 8, 6, Hammer], ['Sanitasi & Disinfeksi', 4, 3, Shield]]
const techs = [['Andi Firmansyah', 28, 4.9], ['Budi Santoso', 25, 4.8], ['Rizky Maulana', 22, 4.7], ['Dimas Ardi', 20, 4.7], ['Fahmi Hidayat', 18, 4.6]] as const
const orders: [string, string, string, string, string, LucideIcon][] = [['#VA20260917001', 'Service AC', 'Bapak Riko Pratama', 'Dalam Proses', '10:12', Wind],
  ['#VA20260917002', 'Cleaning Service', 'Ibu Sinta Dewi', 'Selesai', '09:45', Sparkles], ['#VA20260917003', 'Pest Control', 'PT. Maju Bersama', 'Menunggu', '09:20', Bug],
  ['#VA20260917004', 'Electrical', 'Bapak Andi', 'Selesai', '08:50', Zap], ['#VA20260917005', 'General Maintenance', 'Ibu Rina', 'Dalam Proses', '08:10', Hammer]]
const badge: Record<string, string> = { 'Dalam Proses': 'bg-blue-100 text-blue-700', Selesai: 'bg-green-100 text-green-700', Menunggu: 'bg-amber-100 text-amber-700', Berlangsung: 'bg-blue-100 text-blue-700' }
const days: [string, number, number][] = [['Sen', 14, 8], ['Sel', 15, 10], ['Rab', 17, 12], ['Kam', 18, 9], ['Jum', 19, 8], ['Sab', 20, 6], ['Min', 21, 4]]
const tasks = [['08:00 - 10:00', 'Service AC', 'Jl. Jagakarsa Raya No. 123', 'Berlangsung'], ['11:00 - 13:00', 'Cleaning Service', 'Perum. Pesanggrahan Indah', 'Menunggu'], ['14:00 - 16:00', 'Pest Control', '', 'Menunggu']]

const Card = ({ title, link = 'Lihat Semua', className = '', children }: { title: string; link?: string; className?: string; children: React.ReactNode }) => (
  <section className={`rounded-2xl bg-white p-4 shadow-sm ${className}`}>
    <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">{title}</h3><a className="text-xs font-semibold text-brand">{link}</a></div>{children}
  </section>)

function LineChart() {
  const w = 620, h = 170
  const mk = (a: number[]) => a.map((v, i) => `${(i / (a.length - 1)) * w},${h - (v / 50) * h}`).join(' ')
  const a = Array.from({ length: 30 }, (_, i) => Math.round(18 + i * 0.6 + Math.sin(i / 2) * 6 + (i > 20 ? 6 : 0)))
  const b = a.map((v, i) => Math.max(8, v - 6 + Math.round(Math.cos(i / 2) * 3)))
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-44 w-full">
      {[0, 10, 20, 30, 40, 50].map(y => <line key={y} x1="0" x2={w} y1={h - (y / 50) * h} y2={h - (y / 50) * h} stroke="#e2e8f0" />)}
      <polyline points={`0,${h} ${mk(a)} ${w},${h}`} fill="#3b82f622" />
      <polyline points={mk(a)} fill="none" stroke="#1e40af" strokeWidth="2.5" />
      <polyline points={mk(b)} fill="none" stroke="#60a5fa" strokeWidth="2.5" />
    </svg>)
}

function Donut() {
  const total = status.reduce((s, x) => s + x[1], 0); let acc = 0
  const grad = status.map(([, v, c]) => { const s = (acc / total) * 100; acc += v; return `${c} ${s}% ${(acc / total) * 100}%` }).join(',')
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-32 w-32 shrink-0 rounded-full" style={{ background: `conic-gradient(${grad})` }}>
        <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white"><b className="text-2xl">{total}</b><span className="text-[10px] text-slate-500">Total Pesanan</span></div>
      </div>
      <ul className="flex-1 space-y-1.5 text-xs">
        {status.map(([n, v, c]) => <li key={n} className="flex items-center gap-2"><i className="h-2 w-2 rounded-full" style={{ background: c }} /><span className="flex-1">{n}</span><b>{v}</b><span className="text-slate-400">({Math.round((v / total) * 100)}%)</span></li>)}
      </ul>
    </div>)
}

export default function Dashboard() {
  return (
    <div className="space-y-4">
<div className="flex flex-wrap items-end justify-between gap-3">
          <div><h1 className="text-2xl font-extrabold">Selamat Datang, Zakariya 👋</h1><p className="text-sm text-slate-500">Kelola layanan, tim, dan pelanggan dengan lebih mudah.</p></div>
          <div className="flex items-center gap-4"><div className="text-right text-xs text-slate-600"><Calendar size={12} className="mr-1 inline" />Rabu, 17 September 2026<br /><Clock size={12} className="mr-1 inline" />10:24 WIB</div>
            <Link to="/app/layanan" className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white"><Plus size={16} />Buat Pesanan Baru</Link></div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(([t, v, d, s, I]) => <div key={t} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"><div className="rounded-xl bg-blue-100 p-3 text-brand"><I size={22} /></div>
            <div><p className="text-xs text-slate-500">{t}</p><p className="text-xl font-extrabold">{v}</p><p className="text-[11px]"><span className="font-semibold text-green-600">{d}</span> <span className="text-slate-400">{s}</span></p></div></div>)}
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Grafik Pesanan" link="September 2026 ⌄" className="xl:col-span-2"><div className="mb-1 flex justify-end gap-4 text-[11px]"><span className="text-blue-800">● Pesanan Masuk</span><span className="text-blue-400">● Pesanan Selesai</span></div><LineChart />
            <div className="flex justify-between text-[10px] text-slate-400"><span>1 Sep</span><span>10 Sep</span><span>20 Sep</span><span>30 Sep</span></div></Card>
          <Card title="Status Pesanan" link="Bulan Ini ⌄"><Donut /></Card>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Performa Layanan"><ul className="space-y-2.5">{services.map(([n, v, p, I]) => <li key={n} className="flex items-center gap-2 text-xs"><I size={14} className="text-brand" /><span className="w-32 truncate">{n}</span>
            <div className="h-2 flex-1 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-blue-600" style={{ width: `${(v / 38) * 100}%` }} /></div><b className="w-6 text-right">{v}</b><span className="w-10 text-slate-400">({p}%)</span></li>)}</ul></Card>
          <Card title="Performa Teknisi"><table className="w-full text-xs"><thead className="text-slate-400"><tr><th className="pb-2 text-left font-normal">Nama Teknisi</th><th className="font-normal">Tugas Selesai</th><th className="text-right font-normal">Rating</th></tr></thead>
            <tbody>{techs.map(([n, t, r]) => <tr key={n}><td className="flex items-center gap-2 py-1.5"><i className="h-7 w-7 rounded-full bg-slate-300" />{n}</td><td className="text-center">{t}</td><td className="text-right font-semibold"><Star size={12} className="mr-0.5 inline fill-amber-400 text-amber-400" />{r}</td></tr>)}</tbody></table></Card>
          <Card title="Pesanan Terbaru"><ul className="space-y-3">{orders.map(([id, s, c, st, t, I]) => <li key={id} className="flex items-center gap-3 text-xs"><div className="rounded-lg bg-blue-50 p-2 text-brand"><I size={18} /></div>
            <div className="flex-1"><p className="text-[10px] text-slate-400">{id}</p><b>{s}</b><p className="text-slate-500">{c}</p></div><div className="text-right"><span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${badge[st]}`}>{st}</span><p className="mt-1 text-slate-400">{t}</p></div></li>)}</ul></Card>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          <Card title="Kalender Jadwal" link="Hari Ini"><p className="mb-2 flex items-center justify-center gap-3 text-xs"><ChevronLeft size={14} />September 2026<ChevronRight size={14} /></p>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px]">{days.map(([d, n, t]) => <div key={d} className={`rounded-lg py-2 ${n === 17 ? 'bg-brand text-white' : 'bg-slate-50'}`}>{d}<b className="block text-base">{n}</b><span className="text-[9px] opacity-70">{t} tugas</span></div>)}</div></Card>
          <Card title="Pengumuman"><ul className="space-y-3 text-xs">{[['Update Aplikasi Teknisi', 'Fitur tracking lokasi sudah tersedia.', '15 Sep 2026'], ['Promo Akhir Tahun', 'Diskon 20% untuk semua layanan.', '12 Sep 2026']].map(([t, d, dt]) =>
            <li key={t} className="flex gap-3"><Megaphone size={28} className="rounded-lg bg-blue-50 p-1.5 text-brand" /><div className="flex-1"><b>{t}</b><p className="text-slate-500">{d}</p></div><span className="text-slate-400">{dt}</span></li>)}</ul></Card>
          <Card title="Tugas Hari Ini"><ul className="space-y-3 text-xs">{tasks.map(([tm, s, a, st]) => <li key={s} className="flex items-center gap-3"><Clock size={14} className="text-slate-400" />
            <div className="flex-1"><p className="text-slate-500">{tm}</p><b>{s}</b><p className="text-slate-400">{a}</p></div><span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${badge[st] ?? 'bg-slate-100 text-slate-600'}`}>{st}</span></li>)}</ul></Card>
        </div>
          </div>)
}
