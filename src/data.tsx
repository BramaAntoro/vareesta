import { Wind, Sparkles, Bug, Zap, Droplets, Wrench, Shield, type LucideIcon } from 'lucide-react'
export type Svc = { id: string; name: string; desc: string; price: number; Icon: LucideIcon }
export const SERVICES: Svc[] = [
  { id: 'ac', name: 'Service AC', desc: 'Cuci AC, isi freon, perbaikan, dll', price: 100000, Icon: Wind },
  { id: 'cleaning', name: 'Cleaning Service', desc: 'General cleaning, deep cleaning, dll', price: 150000, Icon: Sparkles },
  { id: 'pest', name: 'Pest Control', desc: 'Anti rayap, kecoa, nyamuk, tikus, dll', price: 200000, Icon: Bug },
  { id: 'electrical', name: 'Electrical', desc: 'Instalasi, perbaikan listrik, lampu, dll', price: 120000, Icon: Zap },
  { id: 'plumbing', name: 'Plumbing', desc: 'Perbaikan pipa, saluran air, wastafel, dll', price: 110000, Icon: Droplets },
  { id: 'maintenance', name: 'General Maintenance', desc: 'Perbaikan umum, handyman, dll', price: 130000, Icon: Wrench },
  { id: 'sanitasi', name: 'Sanitasi & Disinfeksi', desc: 'Fogging, sterilisasi, dll', price: 175000, Icon: Shield },
]
export const rp = (n: number) => 'Rp ' + n.toLocaleString('id-ID')
export const TECHS = ['Andi Firmansyah', 'Budi Santoso', 'Rizky Maulana', 'Dimas Ardi', 'Fahmi Hidayat']
export const DAYS: [string, number][] = [['Sen', 14], ['Sel', 15], ['Rab', 16], ['Kam', 17], ['Jum', 18], ['Sab', 19], ['Min', 20]]
export const TIMES = ['08:00', '09:00', '11:00', '13:00', '14:00', '16:00']
