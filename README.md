# ✨ Style Sphere — Luxury Fashion E-Commerce Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

> A world-class luxury e-commerce experience for **Zainab Clothing House** — featuring AR Virtual Try-On, AI Visual Search, and an elegant editorial-grade UI.

---

## 🚀 Live Deployment

> 🔗 **[Coming Soon on Vercel](#)** — deploying shortly!

---

## 📸 Features

| Feature | Description |
|---|---|
| 🏠 **Home Page** | Cinematic hero banner with editorial product showcases |
| 🛍️ **Shop Page** | Filterable, animated product grid with luxury card design |
| 🪄 **AR Try-On** | Virtual fitting room using device camera |
| 🔍 **Visual Search** | AI-powered image-based product discovery |
| ❤️ **Wishlist** | Save and manage favorite items |
| 🛒 **Cart** | Full cart management with quantity controls |
| 📦 **Product Detail** | Rich product pages with gallery and size selection |

---

## 🛠️ Tech Stack

- **Framework:** [Vite](https://vitejs.dev) + [React 18](https://react.dev)
- **Language:** TypeScript
- **Styling:** TailwindCSS + Custom CSS Animations
- **Backend/DB:** [Supabase](https://supabase.com)
- **Icons:** Lucide React
- **Deployment:** [Vercel](https://vercel.com)

---

## 📁 Project Structure

```
StyleSphere/
├── public/
│   └── images/          # Hero, product & lifestyle images
├── src/
│   ├── components/
│   │   ├── Navbar.tsx   # Top navigation bar
│   │   ├── Sidebar.tsx  # Mobile side drawer
│   │   └── ui/          # Reusable UI components
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Wishlist.tsx
│   │   ├── TryOn.tsx
│   │   └── VisualSearch.tsx
│   ├── lib/
│   │   └── supabase.ts  # Supabase client
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## ⚙️ Getting Started Locally

### Prerequisites
- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/malikmajid161/zainab-clothing-house.git

# Navigate into the project
cd zainab-clothing-house

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

---

## 🌍 Deploying to Vercel

1. Push your code to this GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import `malikmajid161/zainab-clothing-house`
4. Set **Framework Preset** to `Vite`
5. Click **Deploy** 🚀

> **Build Settings:**
> - Build Command: `npm run build`
> - Output Directory: `dist`
> - Install Command: `npm install`

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Add these same variables in your **Vercel project settings → Environment Variables**.

---

## 👤 Author

**Majid** — [github.com/malikmajid161](https://github.com/malikmajid161)

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  <sub>Built with ❤️ for Zainab Clothing House · Powered by Vite + React + Vercel</sub>
</div>