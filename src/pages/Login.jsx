import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await signIn(email, password)
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sidebar-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div className="fade-up" style={{ width: '100%', maxWidth: 400, padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: '1px solid var(--gold-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', background: 'rgba(201,168,76,0.08)' }}>
            <span style={{ fontSize: 22, color: 'var(--gold)' }}>✦</span>
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 300, color: 'var(--cream)', letterSpacing: '0.08em', marginBottom: 6 }}>XYZ CRM</h1>
          <p style={{ color: 'var(--gold-muted)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Demo Version</p>
        </div>

        {/* Demo hint */}
        <div style={{ marginBottom: 24, padding: '12px 16px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 6 }}>
          <p style={{ fontSize: 11, color: 'var(--gold-muted)', letterSpacing: '0.04em', textAlign: 'center' }}>
            ⚡ Demo — enter any email & password to explore
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-muted)', marginBottom: 8 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="demo@example.com"
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 4, color: 'var(--cream)', fontSize: 14, fontFamily: 'Jost, sans-serif', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-muted)', marginBottom: 8 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="anything"
              style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 4, color: 'var(--cream)', fontSize: 14, fontFamily: 'Jost, sans-serif', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'} />
          </div>
          {error && <p style={{ color: '#E07070', fontSize: 13, marginBottom: 16, padding: '10px 14px', background: 'rgba(224,112,112,0.08)', borderRadius: 4 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: loading ? 'rgba(201,168,76,0.3)' : 'var(--gold)', border: 'none', borderRadius: 4, color: 'var(--dark)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Jost, sans-serif', fontWeight: 500, cursor: 'pointer' }}>
            {loading ? 'Signing in...' : 'Enter Demo'}
          </button>
        </form>
      </div>
    </div>
  )
}
