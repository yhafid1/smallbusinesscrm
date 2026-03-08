import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Building2, Package } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/businesses', icon: Building2, label: 'Businesses' },
  { to: '/products', icon: Package, label: 'Products' },
]

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 'var(--sidebar-width)', background: 'var(--sidebar-bg)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, borderRight: '1px solid rgba(201,168,76,0.12)', zIndex: 100 }}>
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'var(--gold)', fontSize: 18 }}>✦</span>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 400, color: 'var(--cream)', letterSpacing: '0.06em' }}>XYZ</div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--gold-muted)', textTransform: 'uppercase', marginTop: -2 }}>CRM — Demo</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 6, marginBottom: 2,
                textDecoration: 'none', fontSize: 13, letterSpacing: '0.04em',
                fontWeight: isActive ? 400 : 300,
                color: isActive ? 'var(--gold)' : 'rgba(245,240,232,0.5)',
                background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
                transition: 'all 0.15s',
                borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent'
              })}>
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px 16px 20px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
          <p style={{ fontSize: 10, color: 'rgba(245,240,232,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>⚡ Demo Mode</p>
        </div>
      </aside>

      <main style={{ marginLeft: 'var(--sidebar-width)', flex: 1, padding: '36px 40px', minHeight: '100vh', background: 'var(--warm-white)' }}>
        {children}
      </main>
    </div>
  )
}
