import { Camera, Heart, Home, ShoppingBag, Sparkles, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
  { path: '/visual-search', icon: Camera, label: 'Visual Search' },
  { path: '/try-on', icon: Sparkles, label: 'Try On' },
  { path: '/wishlist', icon: Heart, label: 'Wishlist' },
]

export default function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <div className={`fixed left-0 top-0 h-full w-64 bg-white border-r shadow-2xl z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex items-center justify-between">
          <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tighter">
            StyleSphere
          </h1>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 hover:bg-muted rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="px-4 mt-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                    : 'text-muted-foreground hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-6">
          <div className="p-4 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Pro Feature</p>
            <p className="text-sm font-semibold text-slate-800 mb-3">AI Personal Stylist</p>
            <button className="w-full py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
