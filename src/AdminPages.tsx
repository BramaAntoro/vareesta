import { useState, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { useStore, type Status } from './store'
import { SERVICES, TECHS, rp } from './data'
const G = 'bg-green-100 text-green-700', B = 'bg-blue-100 text-blue-700', A = 'bg-amber-100 text-amber-700', R = 'bg-red-100 text-red-700'
const BADGE: Record<string, string> = { Selesai: G, Aktif: G, Lunas: G, Terkirim: G, Online: G, Diproses: B, Terjadwal: B, Berlangsung: B, Menunggu: A, Pending: A, Draft: A, Dibatalkan: R, Gagal: R, Offline: R, Nonaktif: R }
type Cell = ReactNode
const cell = (c: Cell) => (typeof c === 'string' && BADGE[c] ? <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${BADGE[c]}`}>{c}</span> : c)
function DataPage({ title, sub, cols, rows, top, action = 'Tambah' }: { title: string; sub: string; cols: string[]; rows: Cell[][]; top?: ReactNode; action?: string }) {
  const [q, setQ] = useState('')
  const f = rows.filter(r => r.filter(x => typeof x === 'string').join(' ').toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-extrabold">{title}</h1><p className="text-sm text-slate-500">{sub}</p></div>
        <button className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white"><Plus size={16} />{action}</button></div>
      {top}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="relative mb-3 max-w-xs"><Search size={14} className="absolute left-3 top-2.5 text-slate-400" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari..." className="w-full rounded-lg border py-2 pl-8 pr-3 text-sm outline-none focus:border-brand" /></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-sm"><thead><tr className="border-b text-left text-xs text-slate-400">{cols.map(c => <th key={c} className="py-2 pr-3 font-medium">{c}</th>)}</tr></thead>
          <tbody>{f.map((r, i) => <tr key={i} className="border-b last:border-0">{r.map((c, j) => <td key={j} className="py-2.5 pr-3">{cell(c)}</td>)}</tr>)}
            {!f.length && <tr><td colSpan={cols.length} className="py-6 text-center text-slate-400">Tidak ada data</td></tr>}</tbody></table></div>
      </div>
    </div>)
}
const Tiles = ({ items }: { items: [string, string][] }) => <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{items.map(([t, v]) => <div key={t} className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-slate-500">{t}</p><p className="text-xl font-extrabold">{v}</p></div>)}</div>

function Pesanan() {
  const { orders, setStatus } = useStore()
  return <DataPage title="Pesanan" sub="Kelola semua pesanan pelanggan (terhubung dengan aplikasi pelanggan)." action="Buat Pesanan"
    top={<Tiles items={[['Total', String(orders.length)], ['Menunggu', String(orders.filter(o => o.status === 'Menunggu').length)], ['Diproses', String(orders.filter(o => o.status === 'Diproses').length)], ['Selesai', String(orders.filter(o => o.status === 'Selesai').length)]]} />}
    cols={['ID', 'Layanan', 'Pelanggan', 'Jadwal', 'Teknisi', 'Total', 'Status']}
    rows={orders.map(o => ['#' + o.id, o.svc, o.customer, `${o.date} ${o.time}`, o.tech, rp(o.price),
      <select key={o.id} value={o.status} onChange={e => setStatus(o.id, e.target.value as Status)} className="rounded-md border px-2 py-1 text-xs">{['Menunggu', 'Diproses', 'Selesai', 'Dibatalkan'].map(s => <option key={s}>{s}</option>)}</select>])} />
}
function Laporan() {
  const m = [['Apr', 18], ['Mei', 21], ['Jun', 19], ['Jul', 24], ['Agu', 26], ['Sep', 28]] as const
  return <DataPage title="Laporan" sub="Ringkasan pendapatan dan performa." action="Unduh Laporan" cols={['Bulan', 'Pendapatan (juta)', 'Pesanan']} rows={m.map(([b, v]) => [b, `Rp ${v}.000.000`, String(v * 4)])}
    top={<><Tiles items={[['Pendapatan Bulan Ini', 'Rp 28.450.000'], ['Total Pesanan', '124'], ['Rating Rata-rata', '4.8'], ['Repeat Order', '42%']]} />
      <div className="flex h-40 items-end gap-3 rounded-2xl bg-white p-4 shadow-sm">{m.map(([b, v]) => <div key={b} className="flex flex-1 flex-col items-center gap-1"><div className="w-full rounded-t bg-blue-600" style={{ height: `${v * 4}px` }} /><span className="text-[10px] text-slate-500">{b}</span></div>)}</div></>} />
}
function Pengaturan() {
  const [saved, setSaved] = useState(false)
  return <div className="max-w-2xl space-y-4"><h1 className="text-2xl font-extrabold">Pengaturan</h1>
    <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm">{['Nama Perusahaan', 'Email Kontak', 'Nomor WhatsApp', 'Alamat'].map((l, i) => <label key={l} className="block text-sm font-medium">{l}<input defaultValue={['Vareesta Home Service', 'halo@vareesta.id', '0812-0000-0000', 'Jakarta'][i]} className="mt-1 w-full rounded-lg border p-2 text-sm font-normal" /></label>)}
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked />Aktifkan notifikasi email</label>
      <button onClick={() => setSaved(true)} className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">Simpan</button>{saved && <span className="ml-3 text-sm text-green-600">Tersimpan ✓</span>}</div></div>
}
const pages: Record<string, () => JSX.Element> = {
  pesanan: Pesanan, laporan: Laporan, pengaturan: Pengaturan,
  pelanggan: () => <DataPage title="Pelanggan" sub="Data pelanggan terdaftar." cols={['Nama', 'Email', 'Kota', 'Pesanan', 'Status']} rows={[['Zakariya', 'zakariya@mail.com', 'Jakarta', '12', 'Aktif'], ['Sinta Dewi', 'sinta@mail.com', 'Bekasi', '8', 'Aktif'], ['PT. Maju Bersama', 'cs@maju.co.id', 'Tangerang', '25', 'Aktif'], ['Riko Pratama', 'riko@mail.com', 'Depok', '3', 'Nonaktif']]} />,
  teknisi: () => <DataPage title="Teknisi" sub="Kelola tim teknisi." cols={['Nama', 'Spesialisasi', 'Tugas Selesai', 'Rating', 'Status']} rows={TECHS.map((t, i) => [t, SERVICES[i].name, String(28 - i * 2), '★ ' + (4.9 - i * 0.075).toFixed(1), i === 4 ? 'Offline' : 'Online'])} />,
  jadwal: () => <DataPage title="Jadwal & Penugasan" sub="Jadwal tugas teknisi hari ini." action="Tugaskan" cols={['Waktu', 'Layanan', 'Lokasi', 'Teknisi', 'Status']} rows={[['08:00 - 10:00', 'Service AC', 'Jl. Jagakarsa Raya No. 123', 'Andi Firmansyah', 'Berlangsung'], ['11:00 - 13:00', 'Cleaning Service', 'Perum. Pesanggrahan Indah', 'Budi Santoso', 'Terjadwal'], ['14:00 - 16:00', 'Pest Control', 'Ruko Maju Bersama', 'Rizky Maulana', 'Terjadwal']]} />,
  layanan: () => <DataPage title="Layanan" sub="Daftar layanan yang tersedia." cols={['Layanan', 'Deskripsi', 'Harga Mulai', 'Status']} rows={SERVICES.map(s => [s.name, s.desc, rp(s.price), 'Aktif'])} />,
  harga: () => <DataPage title="Manajemen Harga" sub="Atur harga dasar layanan." action="Ubah Harga" cols={['Layanan', 'Harga Dasar', 'Biaya Transport', 'Diperbarui']} rows={SERVICES.map(s => [s.name, rp(s.price), rp(15000), '10 Sep 2026'])} />,
  promo: () => <DataPage title="Promo & Voucher" sub="Kelola kampanye promo." cols={['Kode', 'Deskripsi', 'Diskon', 'Berlaku s/d', 'Status']} rows={[['AC20', 'Diskon Service AC', '20%', '30 Sep 2026', 'Aktif'], ['HEMAT50', 'Paket hemat perawatan rumah', 'Rp 50.000', '31 Okt 2026', 'Aktif'], ['AKHIRTAHUN', 'Promo akhir tahun', '20%', '31 Des 2026', 'Draft']]} />,
  pembayaran: () => <DataPage title="Pembayaran" sub="Riwayat transaksi." action="Ekspor" cols={['ID', 'Metode', 'Jumlah', 'Tanggal', 'Status']} rows={[['#INV-001', 'Transfer BCA', rp(100000), '17 Sep 2026', 'Lunas'], ['#INV-002', 'GoPay', rp(150000), '17 Sep 2026', 'Lunas'], ['#INV-003', 'Tunai', rp(200000), '18 Sep 2026', 'Pending'], ['#INV-004', 'OVO', rp(120000), '16 Sep 2026', 'Gagal']]} />,
  ulasan: () => <DataPage title="Ulasan & Feedback" sub="Ulasan dari pelanggan." action="Balas" cols={['Pelanggan', 'Layanan', 'Rating', 'Komentar']} rows={[['Sinta Dewi', 'Cleaning Service', '★ 5', 'Rapi dan tepat waktu!'], ['Zakariya', 'Service AC', '★ 5', 'AC jadi dingin lagi.'], ['Riko Pratama', 'Electrical', '★ 4', 'Bagus, sedikit terlambat.']]} />,
  notifikasi: () => <DataPage title="Notifikasi" sub="Broadcast ke pelanggan dan teknisi." action="Kirim Notifikasi" cols={['Judul', 'Tujuan', 'Waktu', 'Status']} rows={[['Promo Akhir Tahun', 'Semua Pelanggan', '12 Sep 2026', 'Terkirim'], ['Update Aplikasi Teknisi', 'Teknisi', '15 Sep 2026', 'Terkirim'], ['Pengingat Servis AC', 'Pelanggan AC', '20 Sep 2026', 'Terjadwal']]} />,
  cms: () => <DataPage title="CMS & Konten" sub="Banner, artikel, dan pengumuman." cols={['Konten', 'Tipe', 'Diperbarui', 'Status']} rows={[['Banner Diskon 20% Service AC', 'Banner', '14 Sep 2026', 'Aktif'], ['Tips Merawat AC', 'Artikel', '10 Sep 2026', 'Aktif'], ['Paket Hemat Perawatan Rumah', 'Banner', '08 Sep 2026', 'Draft']]} />,
}
export default function AdminPage() {
  const P = pages[useParams().slug ?? '']
  return P ? <P /> : <p>Halaman tidak ditemukan.</p>
}
