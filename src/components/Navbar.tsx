import { Search, ShoppingBag, User, Menu, Heart } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const categories = [
  { name: 'New In', path: '/shop?cat=new' },
  { name: 'Unstitched', path: '/shop?cat=unstitched' },
  { name: 'Ready To Wear', path: '/shop?cat=pret' },
  { name: 'Western', path: '/shop?cat=western' },
  { name: 'Accessories', path: '/shop?cat=accessories' },
  { name: 'Visual Search', path: '/visual-search' },
  { name: 'Try On', path: '/try-on' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6">
        {/* Top Bar (Optional, can add promo text here) */}
        {!isScrolled && (
          <div className="text-center text-[10px] uppercase tracking-[0.2em] mb-4 opacity-60">
            Free Shipping on Orders Over $100 | AI Stylist Available 24/7
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <h1 className={`font-serif text-3xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-black' : 'text-slate-900'}`}>
              STYLE<span className="font-light italic">SPHERE</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="text-[13px] font-medium uppercase tracking-widest hover:text-primary transition-colors relative group"
              >
                {cat.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-transparent hover:text-primary">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-transparent hover:text-primary">
              <Heart className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:text-primary">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                  1
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-transparent hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
