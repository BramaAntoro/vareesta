import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import { StoreProvider } from './store'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard'
import AdminPage from './AdminPages'
import MobileApp from './MobileApp'
import Logo from './Logo'

const Landing = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-sky-100 to-white p-6">
    <Logo size="lg" />
    <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
      <Link to="/admin" className="rounded-2xl bg-brand p-6 text-center font-bold text-white shadow-lg">Dashboard Admin</Link>
      <Link to="/app" className="rounded-2xl bg-white p-6 text-center font-bold text-brand shadow-lg">Aplikasi Pelanggan</Link>
    </div>
  </div>)

export default function App() {
  return (
    <StoreProvider><HashRouter><Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin" element={<AdminLayout />}><Route index element={<Dashboard />} /><Route path=":slug" element={<AdminPage />} /></Route>
      <Route path="/app/*" element={<MobileApp />} />
    </Routes></HashRouter></StoreProvider>)
}
