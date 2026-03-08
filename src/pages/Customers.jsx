import { useState } from 'react'
import { mockCustomers as initial } from '../lib/mockData'
import { Plus, ChevronDown, ChevronUp, Check, X } from 'lucide-react'

const emptyCustomer = { name: '', email: '', mailing_address: '' }

export default function Customers() {
  const [customers, setCustomers] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyCustomer)
  const [expanded, setExpanded] = useState(null)
  const [error, setError] = useState('')

  const handleSave = () => {
    if (!form.name) { setError('Name is required.'); return }
    setCustomers(cs => [{ ...form, id: String(Date.now()), created_at: new Date().toISOString(), orders: [] }, ...cs])
    setShowForm(false); setForm(emptyCustomer); setError('')
  }

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 13, fontFamily: 'Jost, sans-serif', outline: 'none' }
  const labelStyle = { display: 'block', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }

  return (
    <div>
      <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 300, letterSpacing: '0.04em' }}>Customers</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{customers.length} total customers</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--charcoal)', color: 'var(--cream)', border: 'none', borderRadius: 6, padding: '10px 18px', fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>
          <Plus size={14} /> Add Customer
        </button>
      </div>

      {showForm && (
        <div className="fade-up" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '24px', marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 20 }}>New Customer</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            {[{ key: 'name', label: 'Full Name' }, { key: 'email', label: 'Email' }, { key: 'mailing_address', label: 'Mailing Address' }].map(({ key, label }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} />
              </div>
            ))}
          </div>
          {error && <p style={{ color: '#C07070', fontSize: 12, marginBottom: 12 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--charcoal)', color: 'var(--cream)', border: 'none', borderRadius: 4, padding: '9px 18px', fontSize: 12, cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}><Check size={13} /> Save</button>
            <button onClick={() => { setShowForm(false); setError('') }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '9px 18px', fontSize: 12, cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="fade-up-1" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {customers.map(c => (
          <div key={c.id} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <div onClick={() => setExpanded(expanded === c.id ? null : c.id)} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', cursor: 'pointer', gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--gold-muted)', fontWeight: 500, flexShrink: 0 }}>
                {c.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 400 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{c.email}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginRight: 8 }}>{c.mailing_address}</div>
              {expanded === c.id ? <ChevronUp size={14} color="var(--muted)" /> : <ChevronDown size={14} color="var(--muted)" />}
            </div>

            {expanded === c.id && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', background: 'var(--warm-white)' }}>
                <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>Purchase History</p>
                {!c.orders?.length ? (
                  <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>No orders yet.</p>
                ) : c.orders.map(order => (
                  <div key={order.id} style={{ marginBottom: 10, padding: '10px 12px', background: 'white', borderRadius: 6, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>{new Date(order.date_of_sale).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    {order.items.map((li, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0' }}>
                        <span style={{ fontFamily: 'monospace', color: 'var(--gold-muted)', fontSize: 11 }}>{li.sku}</span>
                        <span>{li.name}</span>
                        <span style={{ color: 'var(--muted)' }}>×{li.quantity}</span>
                        <span>${(li.unit_price * li.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12, fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>⚡ Demo mode — changes are in-memory only and reset on refresh.</p>
    </div>
  )
}
