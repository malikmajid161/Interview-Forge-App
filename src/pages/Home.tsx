import { motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, Sparkles, Instagram, Facebook, Twitter } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

const featuredProducts = [
  {
    id: 1,
    name: 'Midnight Silk Embroidered Kurta',
    price: 185,
    category: 'Ready to Wear',
    image: '/images/product_1.png',
    tag: 'Limited Edition'
  },
  {
    id: 2,
    name: 'Champagne Organza Festive Suit',
    price: 320,
    category: 'Unstitched Luxury',
    image: 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=800&auto=format&fit=crop',
    tag: 'Bestseller'
  },
  {
    id: 3,
    name: 'Hand-Embellished Velvet Pheran',
    price: 245,
    category: 'Winter Collection',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop',
    tag: 'Handcrafted'
  },
  {
    id: 4,
    name: 'Abstract Printed Raw Silk Co-ord',
    price: 165,
    category: 'Western Edit',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    tag: 'Trending'
  }
]

export default function Home() {
  return (
    <div className="space-y-32 pb-20 overflow-x-hidden">
      {/* Hero Section - Full Height Editorial */}
      <section className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero.png"
            alt="Editorial Banner"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative h-full container mx-auto px-6 flex flex-col items-center justify-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.8em] mb-8 drop-shadow-md"
          >
            Spring / Summer 2026 Collection
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-6xl md:text-[10rem] text-white font-black leading-none drop-shadow-2xl mb-12"
          >
            BEYOND <br /> <span className="italic font-light">ELEGANCE</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="h-20 px-16 rounded-full bg-white text-black hover:bg-slate-100 border-none text-xs font-bold uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-105">
              <Link to="/shop">Explore Collection <ArrowRight className="ml-3 w-5 h-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid - Modest Layout */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:h-[800px]">
          <div className="lg:col-span-7 group relative overflow-hidden rounded-[40px] shadow-2xl aspect-[4/3] lg:aspect-auto">
            <img src="https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
            <div className="absolute bottom-12 left-12 md:bottom-16 md:left-16 text-white max-w-md space-y-4">
              <h3 className="font-serif text-4xl md:text-6xl font-black">The Western <br /> Edit</h3>
              <p className="text-slate-200 font-light leading-relaxed text-sm md:text-base">Modern silhouettes redefined for the contemporary aesthetic.</p>
              <Link to="/shop?cat=Western" className="inline-block text-xs font-bold underline underline-offset-8 uppercase tracking-widest pt-4">Shop Now</Link>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-10">
             <div className="group relative overflow-hidden rounded-[40px] shadow-xl flex-1 aspect-[16/9] lg:aspect-auto">
               <img src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
               <div className="absolute bottom-10 left-10 text-white">
                 <h3 className="font-serif text-3xl font-bold mb-2 italic">Unstitched Luxury</h3>
                 <p className="text-xs font-medium uppercase tracking-widest opacity-80">View Collection</p>
               </div>
             </div>
             <div className="group relative overflow-hidden rounded-[40px] shadow-xl flex-1 aspect-[16/9] lg:aspect-auto">
               <img src="https://images.unsplash.com/photo-1605100804763-247f67b3f416?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
               <div className="absolute bottom-10 left-10 text-white">
                 <h3 className="font-serif text-3xl font-bold mb-2 italic">Festive Accessories</h3>
                 <p className="text-xs font-medium uppercase tracking-widest opacity-80">Launch Gallery</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Product Feed */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-primary font-bold uppercase text-[10px] tracking-[0.5em] block">Curated Excellence</span>
            <h2 className="font-serif text-5xl md:text-7xl font-black">Trending Now</h2>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-[0.3em] border-b-2 border-black pb-2 hover:text-primary hover:border-primary transition-all">
            See All Creations
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-24">
          {featuredProducts.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -15 }}
              className="flex flex-col group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-200 rounded-[24px] mb-8 shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-xl rounded-sm">
                  {product.tag}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-2">
                  <Button asChild size="icon" className="h-12 w-12 rounded-full bg-white text-black hover:bg-primary hover:text-white shadow-2xl">
                    <Link to={`/try-on?img=${encodeURIComponent(product.image)}&name=${encodeURIComponent(product.name)}`}>
                      <Sparkles className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="icon" className="h-12 w-12 rounded-full bg-white text-black hover:bg-black hover:text-white shadow-2xl">
                    <Link to={`/product/${product.id}`}>
                      <ShoppingBag className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">{product.category}</p>
                <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors leading-tight min-h-[3.5rem] flex items-center justify-center">{product.name}</h3>
                <p className="font-bold text-xl text-slate-900">${product.price}.00</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="bg-slate-950 text-white py-40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-20 lg:gap-32 relative z-10">
          <div className="flex-1 space-y-10 text-center lg:text-left">
             <h2 className="font-serif text-6xl md:text-8xl font-black leading-none italic">AI Fashion <br /> <span className="text-primary">Mirror</span></h2>
             <p className="text-slate-400 text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
               Experience our revolutionary AR Virtual Fitting Room. Our neural engine drapes premium fabrics onto your silhouette with 99.2% accuracy.
             </p>
             <div className="flex justify-center lg:justify-start gap-6">
                <Button variant="outline" className="h-16 px-12 rounded-full border-white/20 text-white hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest">
                  Explore Tech
                </Button>
                <Button asChild className="h-16 px-12 rounded-full bg-white text-black hover:bg-primary hover:text-white font-black uppercase text-[10px] tracking-widest transition-all">
                  <Link to="/try-on">Try It Now</Link>
                </Button>
             </div>
          </div>
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="w-full aspect-square rounded-full border border-white/5 p-20 animate-spin-slow">
               <div className="w-full h-full rounded-full border border-white/10 p-20">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/30 to-purple-600/30 blur-[120px]" />
               </div>
            </div>
            <img 
              src="/images/lifestyle.png" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[28rem] md:w-96 md:h-[32rem] object-cover rounded-[60px] shadow-[0_0_150px_rgba(236,72,153,0.4)] border-8 border-white/5"
            />
          </div>
        </div>
      </section>

      {/* Social Feed */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
           <h2 className="font-serif text-4xl md:text-5xl font-black italic">#StyleSphereLuxury</h2>
           <div className="flex gap-8">
              <Instagram className="w-6 h-6 text-slate-400 hover:text-primary transition-colors cursor-pointer" />
              <Facebook className="w-6 h-6 text-slate-400 hover:text-primary transition-colors cursor-pointer" />
              <Twitter className="w-6 h-6 text-slate-400 hover:text-primary transition-colors cursor-pointer" />
           </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            '/images/lifestyle.png',
            'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=400&auto=format&fit=crop'
          ].map((url, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 0.95 }}
              className="aspect-square overflow-hidden rounded-[20px] group cursor-pointer relative shadow-sm"
            >
               <img src={url} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[9px] font-black uppercase tracking-[0.4em] border border-white/40 px-4 py-2 rounded-full">Explore Post</span>
               </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
