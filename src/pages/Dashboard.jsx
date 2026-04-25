import React from 'react'
import { LayoutDashboard, BookOpen, CheckSquare, MessageSquare, Calendar, BarChart3, Settings, LogOut, Search, Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'

const Dashboard = ({ navigate, session }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('landing')
  }

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'Question Bank', icon: <BookOpen size={20} /> },
    { name: 'MCQ Quiz', icon: <CheckSquare size={20} /> },
    { name: 'Mock Interview', icon: <MessageSquare size={20} /> },
    { name: 'Study Plan', icon: <Calendar size={20} /> },
    { name: 'Progress', icon: <BarChart3 size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ]

  return (
    <div className="dashboard-layout" style={{ display: 'flex', height: '100vh', background: 'var(--warm-white)' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', background: 'var(--navy)', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '32px', fontSize: '20px', fontWeight: 600 }}>Interview Forge</div>
        
        <nav style={{ flex: 1, padding: '0 16px' }}>
          {navItems.map(item => (
            <div key={item.name} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '12px 16px', 
              marginBottom: '4px',
              borderRadius: '8px',
              cursor: 'pointer',
              background: item.active ? 'rgba(255,255,255,0.05)' : 'transparent',
              borderLeft: item.active ? '3px solid var(--teal)' : '3px solid transparent',
              color: item.active ? 'white' : 'rgba(255,255,255,0.6)',
              transition: 'all 0.2s ease'
            }}>
              {item.icon}
              <span style={{ fontSize: '14px', fontWeight: item.active ? 600 : 400 }}>{item.name}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
              {session?.user?.email?.[0].toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{session?.user?.email?.split('@')[0]}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Pro Plan</div>
            </div>
          </div>
          <button onClick={handleSignOut} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            width: '100%', 
            background: 'none', 
            border: 'none', 
            color: 'rgba(255,255,255,0.6)', 
            cursor: 'pointer',
            fontSize: '13px'
          }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '4px' }}>Good morning, {session?.user?.email?.split('@')[0]} 👋</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Ready to crush your next interview?</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input type="text" className="input-field" placeholder="Search roles..." style={{ width: '280px', paddingLeft: '40px' }} />
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted)' }} />
            </div>
            <button className="btn-primary" style={{ height: '48px' }}>
              <Plus size={18} style={{ marginRight: '8px' }} /> Generate
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: 'Questions Practiced', value: '128', change: '+12% this week' },
            { label: 'MCQ Accuracy', value: '84%', change: '+5% improvement' },
            { label: 'Mock Sessions', value: '12', change: '2 today' }
          ].map(stat => (
            <div key={stat.label} className="card">
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{stat.label}</div>
              <div className="mono" style={{ fontSize: '32px', fontWeight: 600, marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--teal)' }}>{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity & Quick Start */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '24px' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { type: 'Question Bank', title: 'React Frontend Developer', time: '2 hours ago', icon: <BookOpen size={16} /> },
                { type: 'MCQ Quiz', title: 'Technical JavaScript Essentials', time: 'Yesterday', icon: <CheckSquare size={16} /> },
                { type: 'Mock Interview', title: 'Product Manager Behavioral', time: '2 days ago', icon: <MessageSquare size={16} /> }
              ].map((activity, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {activity.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{activity.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{activity.type}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '24px' }}>Quick Start</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Jump back into your top practiced roles.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer'].map(role => (
                <div key={role} className="badge badge-navy" style={{ cursor: 'pointer', padding: '8px 16px' }}>{role}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
