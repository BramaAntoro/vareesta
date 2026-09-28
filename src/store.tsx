import { createContext, useContext, useState, type ReactNode } from 'react'
export type Status = 'Menunggu' | 'Diproses' | 'Selesai' | 'Dibatalkan'
export type Order = { id: string; svc: string; customer: string; status: Status; date: string; time: string; price: number; tech: string }
const init: Order[] = [
  { id: 'VA20260917001', svc: 'Service AC', customer: 'Zakariya', status: 'Diproses', date: '17 Sep 2026', time: '11:00', price: 100000, tech: 'Andi Firmansyah' },
  { id: 'VA20260917002', svc: 'Cleaning Service', customer: 'Sinta Dewi', status: 'Selesai', date: '17 Sep 2026', time: '09:00', price: 150000, tech: 'Budi Santoso' },
  { id: 'VA20260917003', svc: 'Pest Control', customer: 'PT. Maju Bersama', status: 'Menunggu', date: '18 Sep 2026', time: '13:00', price: 200000, tech: '-' },
]
type Ctx = { orders: Order[]; add: (o: Omit<Order, 'id' | 'status' | 'tech'>) => Order; setStatus: (id: string, s: Status) => void }
const C = createContext<Ctx>(null!)
export const useStore = () => useContext(C)
export function StoreProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState(init)
  const add: Ctx['add'] = o => {
    const n: Order = { ...o, id: 'VA2026092' + String(8000 + orders.length + 1), status: 'Menunggu', tech: '-' }
    setOrders(p => [n, ...p]); return n
  }
  const setStatus: Ctx['setStatus'] = (id, s) => setOrders(p => p.map(o => (o.id === id ? { ...o, status: s, tech: o.tech === '-' && s !== 'Menunggu' ? 'Rizky Maulana' : o.tech } : o)))
  return <C.Provider value={{ orders, add, setStatus }}>{children}</C.Provider>
}
