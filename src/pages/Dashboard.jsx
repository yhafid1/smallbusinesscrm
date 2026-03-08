import { useState, useEffect } from 'react'
import { mockCustomers, mockBusinesses, mockProducts } from '../lib/mockData'
import { Users, Building2, Package, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 50) }, [])

  const totalRevenue = mockBusinesses
    .flatMap(b => b.deals)
    .reduce((sum, d) => sum + (d.est_revenue || 0), 0)

  const pipeline = mockBusinesses.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1
    return acc
  }, {})

  const recentCustomers = [...mockCustomers]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  const statCards = [
    { label: 'Total Customers', value: mockCustomers.length, icon: Users, delay: 'fade-up-1' },
    { label: 'Businesses Tracked', value: mockBusinesses.length, icon: Building2, delay: 'fade-up-2' },
    { label: 'Active Products', value: mockProducts.filter(p => p.active).length, icon: Package, delay: 'fade-up-3' },
    { label: 'Wholesale Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, delay: 'fade-up-4', highlight: true },
  ]

  const pipelineStages = [
    { key: 'Prospect', color: '#9B8EA0' },
    { key: 'Pitched', color: 'var(--gold-muted)' },
    { key: 'Won', color: '#7AAF8A' },
    { key: 'Lost', color: '#C07070' },
  ]

  return (
    <div>
      <div className="fade-up" style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 36, fontWeight: 300, letterSpacing: '0.04em', color: 'var(--charcoal)' }}>Overview</h1>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {statCards.map(({ label, value, icon: Icon, delay, highlight }) => (
          <div key={label} className={delay} style={{
            background: highlight ? 'var(--sidebar-bg)' : 'white',
            border: `1px solid ${highlight ? 'rgba(201,168,76,0.3)' : 'var(--border)'}`,
            borderRadius: 8, padding: '20px 22px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: highlight ? 'var(--gold-muted)' : 'var(--muted)', marginBottom: 8 }}>{label}</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: highlight ? 'var(--gold)' : 'var(--charcoal)' }}>{value}</p>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 6, background: highlight ? 'rgba(201,168,76,0.1)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} color={highlight ? 'var(--gold)' : 'var(--muted)'} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="fade-up-3" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '22px 24px' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, marginBottom: 20 }}>Business Pipeline</h3>
          {pipelineStages.map(({ key, color }) => (
            <div key={key} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.04em' }}>{key}</span>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{pipeline[key] || 0}</span>
              </div>
              <div style={{ height: 3, background: 'var(--cream)', borderRadius: 2 }}>
                <div style={{ height: '100%', borderRadius: 2, background: color, width: `${((pipeline[key] || 0) / mockBusinesses.length) * 100}%`, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="fade-up-4" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '22px 24px' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, marginBottom: 20 }}>Recent Customers</h3>
          {recentCustomers.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < recentCustomers.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--gold-muted)', fontWeight: 500 }}>
                  {c.name?.[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize: 13 }}>{c.name}</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date(c.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
