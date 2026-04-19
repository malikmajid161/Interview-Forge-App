import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Sparkles, ChevronRight, Share2, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useState, useMemo } from 'react'

const products = [
  { id: 1, name: 'Crimson Velvet Pheran', price: 185, category: 'Ready to Wear', image: '/images/product_1.png', tag: 'Handcrafted', description: 'A luxurious velvet pheran featuring intricate hand-embroidery. Perfect for festive occasions, blending traditional Kashmiri silhouettes with modern elegance.' },
  { id: 2, name: 'Midnight Silk Co-ord', price: 210, category: 'Ready to Wear', image: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=800&auto=format&fit=crop', tag: 'Luxury', description: 'This midnight blue silk co-ord set is the epitome of understated luxury. The smooth silk fabric drapes beautifully, making it ideal for evening events.' },
  { id: 3, name: 'Ivory Cotton Kurta', price: 95, category: 'Ready to Wear', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop', tag: 'Daily', description: 'Breathable ivory cotton kurta for daily elegance. Features subtle self-embroidery and a relaxed fit for maximum comfort.' },
  { id: 4, name: 'Saffron Embroidered Tunic', price: 160, category: 'Ready to Wear', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop', tag: 'New', description: 'Vibrant saffron tunic with delicate floral embroidery. A standout piece for your spring wardrobe.' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const [selectedSize, setSelectedSize] = useState('M')
  
  const product = useMemo(() => {
    return products.find(p => p.id === Number(id)) || products[0]
  }, [id])

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-12">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-black">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Image Gallery */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[3/4] bg-slate-100 rounded-[40px] overflow-hidden shadow-2xl"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="aspect-square bg-slate-100 rounded-2xl overflow-hidden cursor-pointer hover:opacity-70 transition-opacity">
                 <img src={product.image} className="w-full h-full object-cover" />
               </div>
             ))}
          </div>
        </div>

        {/* Info & Actions */}
        <div className="flex flex-col">
          <div className="space-y-4 mb-8">
            <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">{product.category}</span>
            <h1 className="font-serif text-5xl md:text-7xl font-black italic">{product.name}</h1>
            <p className="text-3xl font-bold text-slate-900">${product.price}.00</p>
          </div>

          <p className="text-slate-500 text-lg leading-relaxed mb-12 font-light">
            {product.description}
          </p>

          <div className="space-y-8 mb-12">
            <div>
               <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4">Select Size</h3>
               <div className="flex gap-3">
                 {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                   <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-full border-2 transition-all flex items-center justify-center font-bold text-sm ${selectedSize === size ? 'bg-black border-black text-white shadow-xl' : 'border-slate-100 text-slate-400 hover:border-slate-300'}`}
                   >
                     {size}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button className="h-20 flex-1 rounded-full bg-black text-white hover:bg-slate-800 font-black uppercase text-xs tracking-widest shadow-2xl flex items-center justify-center gap-4">
              <ShoppingBag className="w-5 h-5" /> Add to Shopping Bag
            </Button>
            <Button asChild className="h-20 flex-1 rounded-full bg-primary text-white hover:bg-pink-600 font-black uppercase text-xs tracking-widest shadow-2xl flex items-center justify-center gap-4">
              <Link to={`/try-on?img=${encodeURIComponent(product.image)}&name=${encodeURIComponent(product.name)}`}>
                <Sparkles className="w-5 h-5" /> AI Virtual Try-On
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 py-10 border-t border-b">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400"><Truck className="w-5 h-5" /></div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest">Free Shipping</p>
                   <p className="text-xs text-slate-500">Global delivery in 3-5 days</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest">Authentic Quality</p>
                   <p className="text-xs text-slate-500">Certified artisanal pieces</p>
                </div>
             </div>
          </div>

          <div className="flex gap-8 mt-10">
             <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
               <Heart className="w-4 h-4" /> Add to Wishlist
             </button>
             <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
               <Share2 className="w-4 h-4" /> Share Collection
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
