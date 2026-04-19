import { Suspense, lazy } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Navbar from './components/Navbar'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const TryOn = lazy(() => import('./pages/TryOn'))
const VisualSearch = lazy(() => import('./pages/VisualSearch'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-serif text-4xl font-black animate-pulse tracking-tighter text-slate-900">
        STYLE<span className="font-light italic">SPHERE</span>
      </h1>
      <div className="h-[1px] w-24 bg-slate-200 overflow-hidden">
        <div className="h-full w-1/2 bg-slate-900 animate-slide-infinite" />
      </div>
    </div>
  </div>
)

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-slate-900 selection:text-white font-sans text-slate-900">
      <Navbar />
      <main className="pt-20 lg:pt-28">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/visual-search" element={<VisualSearch />} />
            <Route path="/try-on" element={<TryOn />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </main>
      
      {/* Footer (Simplified for now) */}
      <footer className="bg-slate-50 border-t py-20 px-6 mt-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl font-black mb-6">STYLESPHERE</h2>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              We are a next-generation fashion house blending the timeless elegance of haute couture with the precision of Artificial Intelligence.
            </p>
          </div>
          <div>
            <h3 className="font-bold uppercase text-xs tracking-widest mb-6 text-slate-900">Customer Care</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/cart" className="hover:text-black transition-colors">Track Order</Link></li>
              <li><Link to="/wishlist" className="hover:text-black transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/shop" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/visual-search" className="hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold uppercase text-xs tracking-widest mb-6 text-slate-900">The Brand</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="/shop?cat=unstitched" className="hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/shop?cat=western" className="hover:text-black transition-colors">Careers</Link></li>
              <li><Link to="/visual-search" className="hover:text-black transition-colors">Store Locator</Link></li>
              <li><Link to="/try-on" className="hover:text-black transition-colors">Sustainability</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-20 pt-8 border-t text-[10px] uppercase tracking-[0.2em] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 StyleSphere Fashion AI Ltd. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-black">Instagram</Link>
            <Link to="#" className="hover:text-black">Facebook</Link>
            <Link to="#" className="hover:text-black">TikTok</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
