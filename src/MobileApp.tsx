import { useEffect, useState, type ReactNode } from 'react'
import { Routes, Route, Outlet, Link, NavLink, useNavigate, useParams, useLocation, useSearchParams, Navigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Bell, Search, Home, ClipboardList, Tag, MessageCircle, User, Eye, EyeOff, MoreHorizontal, Check, LogOut, Send } from 'lucide-react'
import Logo from './Logo'
import { SERVICES, DAYS, TIMES, rp } from './data'
import { useStore } from './store'

const Btn = ({ children, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...p} className="w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white disabled:opacity-40">{children}</button>
const Top = ({ t }: { t: string }) => { const n = useNavigate(); return <div className="sticky top-0 z-10 flex items-center gap-3 border-b bg-white px-4 py-3 font-bold"><button onClick={() => n(-1)}><ChevronLeft /></button>{t}</div> }
const Chip = ({ s }: { s: string }) => <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${s === 'Selesai' ? 'bg-green-100 text-green-700' : s === 'Diproses' ? 'bg-blue-100 text-blue-700' : s === 'Dibatalkan' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{s}</span>

function Shell() {
  const { pathname } = useLocation()
  const nav = /\/app\/(home|pesanan|promo|chat|akun)$/.test(pathname)
  const items: [string, string, typeof Home][] = [['Beranda', 'home', Home], ['Pesanan', 'pesanan', ClipboardList], ['Promo', 'promo', Tag], ['Chat', 'chat', MessageCircle], ['Akun', 'akun', User]]
  return (
    <div className="flex min-h-screen justify-center bg-slate-200">
      <div className="relative min-h-screen w-full max-w-md bg-white shadow-xl"><div className={nav ? 'pb-20' : ''}><Outlet /></div>
        {nav && <nav className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 justify-around border-t bg-white py-2">{items.map(([n, p, I]) => <NavLink key={p} to={`/app/${p}`} className={({ isActive }) => `flex flex-col items-center text-[11px] ${isActive ? 'font-bold text-brand' : 'text-slate-500'}`}><I size={20} />{n}</NavLink>)}</nav>}</div>
    </div>)
}
function Splash() {
  const n = useNavigate(); useEffect(() => { const t = setTimeout(() => n('/app/login'), 1800); return () => clearTimeout(t) }, [n])
  return <div onClick={() => n('/app/login')} className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-blue-500 to-sky-100"><div className="rounded-3xl bg-white/90 p-6"><Logo size="lg" /></div><p className="font-serif italic text-blue-900">Cleaner Home, Better Living</p><p className="absolute bottom-6 text-xs">Versi 1.0.0</p></div>
}
function Login() {
  const n = useNavigate(); const [u, setU] = useState(''); const [p, setP] = useState(''); const [show, setShow] = useState(false); const [err, setErr] = useState('')
  const go = () => (u && p ? n('/app/home') : setErr('Email/nomor HP dan password wajib diisi.'))
  return (
    <div className="space-y-4 p-6"><div className="flex justify-center py-4"><Logo /></div><div><h1 className="text-xl font-bold">Selamat Datang</h1><p className="text-sm text-slate-500">Masuk untuk melanjutkan</p></div>
      <input value={u} onChange={e => setU(e.target.value)} placeholder="Email atau Nomor HP" className="w-full rounded-xl border p-3 text-sm" />
      <div className="relative"><input value={p} onChange={e => setP(e.target.value)} type={show ? 'text' : 'password'} placeholder="Password" className="w-full rounded-xl border p-3 text-sm" /><button className="absolute right-3 top-3 text-slate-400" onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
      {err && <p className="text-xs text-red-500">{err}</p>}<Btn onClick={go}>Masuk</Btn><p className="text-center text-xs text-slate-400">atau</p>
      {['Masuk dengan Google', 'Masuk dengan Apple'].map(x => <button key={x} onClick={() => n('/app/home')} className="w-full rounded-xl border p-3 text-sm font-medium">{x}</button>)}
      <p className="text-center text-sm text-slate-500">Belum punya akun? <b className="text-brand">Daftar Sekarang</b></p></div>)
}
function HomePage() {
  const n = useNavigate()
  return (
    <div className="bg-slate-50"><div className="bg-brand p-4 pb-10 text-white"><div className="flex items-center gap-3"><i className="h-10 w-10 rounded-full bg-white/60" /><div className="flex-1 text-sm"><b>Halo, Zakariya 👋</b><p className="text-xs opacity-80">Rumah nyaman, hidup lebih baik bersama Vareesta</p></div><Bell size={20} /></div></div>
      <div className="-mt-6 space-y-4 px-4">
        <div className="rounded-2xl bg-sky-100 p-4"><b className="text-brand">Diskon 20%</b><p className="font-semibold">Service AC</p><p className="text-xs text-slate-500">Rumah Sejuk, Aktivitas Lancar</p><button onClick={() => n('/app/layanan/ac')} className="mt-3 rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white">Pesan Sekarang</button></div>
        <div className="grid grid-cols-4 gap-3 text-center text-[11px]">{[...SERVICES.map(s => ({ ...s, to: s.id })), { id: 'x', name: 'Lainnya', Icon: MoreHorizontal, to: '' }].map(s => <Link key={s.id} to={`/app/layanan/${s.to}`.replace(/\/$/, '')}><div className="mx-auto mb-1 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand shadow-sm"><s.Icon size={22} /></div>{s.name}</Link>)}</div>
        <div className="rounded-2xl bg-blue-600 p-4 text-white"><b>Paket Hemat</b><p className="text-sm">Perawatan Rumah</p><Link to="/app/promo" className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-brand">Lihat Semua</Link></div></div></div>)
}
function Layanan() {
  const [q, setQ] = useState('')
  return (<div><Top t="Layanan Kami" /><div className="space-y-2 p-4"><div className="flex items-center gap-2 rounded-xl border p-3"><Search size={16} className="text-slate-400" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari layanan yang Anda butuhkan..." className="flex-1 text-sm outline-none" /></div>
    {SERVICES.filter(s => (s.name + s.desc).toLowerCase().includes(q.toLowerCase())).map(s => <Link key={s.id} to={`/app/layanan/${s.id}`} className="flex items-center gap-3 border-b py-3"><div className="rounded-xl bg-blue-50 p-2.5 text-brand"><s.Icon size={20} /></div><div className="flex-1"><b className="text-sm">{s.name}</b><p className="text-xs text-slate-500">{s.desc}</p></div><ChevronRight size={16} className="text-slate-400" /></Link>)}</div></div>)
}
const useSvc = () => SERVICES.find(s => s.id === useParams().id)
function Detail() {
  const s = useSvc(); if (!s) return <Navigate to="/app/layanan" />
  return (<div><Top t="Detail Layanan" /><div className="flex h-44 items-center justify-center bg-gradient-to-br from-sky-100 to-blue-300 text-brand"><s.Icon size={64} /></div>
    <div className="space-y-3 p-4"><h2 className="text-xl font-bold">{s.name}</h2><p className="text-sm text-slate-600">{s.desc}. Dikerjakan teknisi profesional bergaransi.</p><p>Mulai dari <b className="text-brand">{rp(s.price)}</b></p><Link to={`/app/jadwal/${s.id}`} className="block rounded-xl bg-brand py-3 text-center text-sm font-semibold text-white">Pilih Jadwal</Link></div></div>)
}
function Jadwal() {
  const s = useSvc(); const n = useNavigate(); const [d, setD] = useState(0); const [t, setT] = useState('')
  if (!s) return <Navigate to="/app/layanan" />
  return (<div><Top t="Pilih Jadwal" /><div className="space-y-4 p-4"><b>Pilih Tanggal</b><div className="flex gap-2 overflow-x-auto">{DAYS.map(([h, x], i) => <button key={x} onClick={() => setD(i)} className={`min-w-[3.2rem] rounded-xl py-2 text-xs ${d === i ? 'bg-brand text-white' : 'bg-slate-100'}`}>{h}<b className="block text-base">{x}</b></button>)}</div>
    <b>Pilih Waktu</b><div className="grid grid-cols-3 gap-2">{TIMES.map(x => <button key={x} onClick={() => setT(x)} className={`rounded-xl border py-2 text-sm ${t === x ? 'border-brand bg-blue-50 font-bold text-brand' : ''}`}>{x}</button>)}</div>
    <Btn disabled={!t} onClick={() => n(`/app/konfirmasi/${s.id}?d=${DAYS[d][1]}&t=${t}`)}>Lanjutkan</Btn></div></div>)
}
function Konfirmasi() {
  const s = useSvc(); const [sp] = useSearchParams(); const { add } = useStore(); const n = useNavigate(); const [addr, setAddr] = useState('Jl. Jagakarsa Raya No. 123, Jakarta Selatan')
  if (!s) return <Navigate to="/app/layanan" />
  const date = `${sp.get('d')} Sep 2026`, time = sp.get('t') ?? ''
  return (<div><Top t="Konfirmasi Pesanan" /><div className="space-y-4 p-4"><div className="flex items-center gap-3 rounded-2xl border p-3"><div className="rounded-xl bg-blue-50 p-3 text-brand"><s.Icon /></div><div><b>{s.name}</b><p className="text-xs text-slate-500">{s.desc}</p><b className="text-brand">{rp(s.price)}</b></div></div>
    <div className="rounded-2xl border p-3 text-sm"><p>📅 {date}</p><p>🕒 {time} WIB</p></div>
    <label className="block text-sm font-medium">Alamat<textarea value={addr} onChange={e => setAddr(e.target.value)} className="mt-1 w-full rounded-xl border p-3 font-normal" rows={3} /></label>
    <div className="flex justify-between border-t pt-3 font-bold"><span>Total</span><span>{rp(s.price)}</span></div>
    <Btn onClick={() => n(`/app/tracking/${add({ svc: s.name, customer: 'Zakariya', date, time, price: s.price }).id}`, { replace: true })}>Konfirmasi Pesanan</Btn></div></div>)
}
function Tracking() {
  const { orders, setStatus } = useStore(); const o = orders.find(x => x.id === useParams().id); if (!o) return <Navigate to="/app/pesanan" />
  const step = { Menunggu: 1, Diproses: 3, Selesai: 4, Dibatalkan: 0 }[o.status]; const L = ['Diterima', 'Teknisi Ditugaskan', 'Menuju Lokasi', 'Selesai']
  const next = o.status === 'Menunggu' ? 'Diproses' : 'Selesai'
  return (<div><Top t="Tracking Pesanan" /><div className="space-y-4 p-4"><div className="flex justify-between"><b>Pesanan #{o.id}</b><Chip s={o.status} /></div>
    <div className="rounded-2xl bg-blue-50 p-4 text-center font-semibold text-brand">{o.status === 'Selesai' ? 'Pesanan selesai 🎉' : o.status === 'Dibatalkan' ? 'Pesanan dibatalkan' : o.status === 'Diproses' ? 'Teknisi sedang menuju lokasi' : 'Menunggu teknisi'}{o.status === 'Diproses' && <p className="text-xs font-normal text-slate-500">Estimasi tiba 15 menit lagi</p>}</div>
    <ol className="space-y-3">{L.map((l, i) => <li key={l} className="flex items-center gap-3 text-sm"><span className={`flex h-7 w-7 items-center justify-center rounded-full ${i < step ? 'bg-brand text-white' : 'bg-slate-200'}`}>{i < step ? <Check size={14} /> : i + 1}</span>{l}</li>)}</ol>
    <p className="text-sm text-slate-500">Teknisi: <b className="text-slate-800">{o.tech}</b> · {o.date} {o.time}</p>
    {(o.status === 'Menunggu' || o.status === 'Diproses') && <Btn onClick={() => setStatus(o.id, next)}>Simulasikan: {next === 'Diproses' ? 'Teknisi Berangkat' : 'Selesaikan Pesanan'}</Btn>}</div></div>)
}
function Pesanan() {
  const { orders, setStatus } = useStore(); const [tab, setTab] = useState(true)
  const list = orders.filter(o => (o.status === 'Menunggu' || o.status === 'Diproses') === tab)
  return (<div><div className="p-4 text-lg font-bold">Pesanan Saya</div><div className="mx-4 grid grid-cols-2 gap-2">{['Aktif', 'Riwayat'].map((t, i) => <button key={t} onClick={() => setTab(i === 0)} className={`rounded-xl py-2 text-sm font-semibold ${tab === (i === 0) ? 'bg-brand text-white' : 'bg-slate-100'}`}>{t}</button>)}</div>
    <div className="space-y-3 p-4">{list.map(o => <div key={o.id} className="rounded-2xl border p-3 text-sm"><Link to={`/app/tracking/${o.id}`} className="flex items-center justify-between"><div><p className="text-[11px] text-slate-400">#{o.id}</p><b>{o.svc}</b><p className="text-xs text-slate-500">{o.date} | {o.time}</p></div><Chip s={o.status} /></Link>
      {o.status === 'Menunggu' && <button onClick={() => setStatus(o.id, 'Dibatalkan')} className="mt-2 text-xs font-semibold text-red-500">Batalkan</button>}</div>)}{!list.length && <p className="py-10 text-center text-sm text-slate-400">Belum ada pesanan</p>}</div></div>)
}
const Promo = () => <div className="space-y-3 p-4"><h1 className="text-lg font-bold">Promo</h1>{[['AC20', 'Diskon 20% Service AC'], ['HEMAT50', 'Potongan Rp 50.000 Paket Hemat'], ['AKHIRTAHUN', 'Diskon 20% semua layanan']].map(([c, d]) => <div key={c} className="rounded-2xl bg-gradient-to-r from-blue-600 to-sky-400 p-4 text-white"><b>{c}</b><p className="text-sm">{d}</p></div>)}</div>
function Chat() {
  const [m, setM] = useState<[boolean, string][]>([[false, 'Halo! Ada yang bisa kami bantu?']]); const [v, setV] = useState('')
  const send = () => { if (!v.trim()) return; setM(x => [...x, [true, v]]); setV(''); setTimeout(() => setM(x => [...x, [false, 'Terima kasih, tim kami akan segera membalas.']]), 800) }
  return (<div className="flex h-[calc(100vh-5rem)] flex-col"><div className="p-4 text-lg font-bold">Chat</div><div className="flex-1 space-y-2 overflow-y-auto px-4">{m.map(([me, t], i) => <div key={i} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${me ? 'ml-auto bg-brand text-white' : 'bg-slate-100'}`}>{t}</div>)}</div>
    <div className="flex gap-2 p-3"><input value={v} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Tulis pesan..." className="flex-1 rounded-xl border px-3 text-sm" /><button onClick={send} className="rounded-xl bg-brand p-3 text-white"><Send size={16} /></button></div></div>)
}
function Akun() {
  const n = useNavigate()
  return (<div className="space-y-4 p-4"><div className="flex items-center gap-3"><i className="h-16 w-16 rounded-full bg-blue-200" /><div><b className="text-lg">Zakariya</b><p className="text-sm text-slate-500">zakariya@mail.com</p></div></div>
    {['Alamat Tersimpan', 'Metode Pembayaran', 'Bantuan'].map(x => <div key={x} className="flex justify-between border-b py-3 text-sm">{x}<ChevronRight size={16} /></div>)}
    <Link to="/admin" className="block text-sm font-semibold text-brand">Buka Dashboard Admin →</Link><button onClick={() => n('/app/login')} className="flex items-center gap-2 text-sm font-semibold text-red-500"><LogOut size={16} />Keluar</button></div>)
}
export default function MobileApp() {
  return <Routes><Route element={<Shell />}><Route index element={<Splash />} /><Route path="login" element={<Login />} /><Route path="home" element={<HomePage />} />
    <Route path="layanan" element={<Layanan />} /><Route path="layanan/:id" element={<Detail />} /><Route path="jadwal/:id" element={<Jadwal />} /><Route path="konfirmasi/:id" element={<Konfirmasi />} />
    <Route path="tracking/:id" element={<Tracking />} /><Route path="pesanan" element={<Pesanan />} /><Route path="promo" element={<Promo />} /><Route path="chat" element={<Chat />} /><Route path="akun" element={<Akun />} /></Route></Routes>
}
