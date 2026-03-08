import { useState } from 'react'
import { mockBusinesses as initial } from '../lib/mockData'
import { Plus, ChevronDown, ChevronUp, Check, X } from 'lucide-react'

const STATUSES = ['Prospect', 'Pitched', 'Won', 'Lost']
const STATUS_COLORS = {
  Prospect: { bg: 'rgba(155,142,160,0.12)', color: '#9B8EA0' },
  Pitched: { bg: 'rgba(154,123,58,0.12)', color: 'var(--gold-muted)' },
  Won: { bg: 'rgba(122,175,138,0.12)', color: '#7AAF8A' },
  Lost: { bg: 'rgba(192,112,112,0.12)', color: '#C07070' },
}
const emptyBusiness = { store_name: '', address: '', phone_number: '', email: '', business_type: '', status: 'Prospect', notes: '' }

export default function Businesses() {
  const [businesses, setBusinesses] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyBusiness)
  const [expanded, setExpanded] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  const handleSave = () => {
    if (!form.store_name) return
    setBusinesses(bs => [{ ...form, id: String(Date.now()), created_at: new Date().toISOString(), deals: [] }, ...bs])
    setShowForm(false); setForm(emptyBusiness)
  }

  const handleStatusChange = (id, status) => setBusinesses(bs => bs.map(b => b.id === id ? { ...b, status } : b))
  const filtered = filterStatus === 'All' ? businesses : businesses.filter(b => b.status === filterStatus)

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 13, fontFamily: 'Jost, sans-serif', outline: 'none', background: 'white' }
  const labelStyle = { display: 'block', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }

  return (
    <div>
      <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 300, letterSpacing: '0.04em' }}>Businesses</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>Wholesale pipeline & partnerships</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--charcoal)', color: 'var(--cream)', border: 'none', borderRadius: 6, padding: '10px 18px', fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>
          <Plus size={14} /> Add Business
        </button>
      </div>

      <div className="fade-up-1" style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {['All', ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'Jost, sans-serif', transition: 'all 0.15s', background: filterStatus === s ? 'var(--charcoal)' : 'white', color: filterStatus === s ? 'var(--cream)' : 'var(--muted)', border: filterStatus === s ? 'none' : '1px solid var(--border)' }}>{s}</button>
        ))}
      </div>

      {showForm && (
        <div className="fade-up" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '24px', marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 20 }}>New Business</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            {[{ key: 'store_name', label: 'Store Name' }, { key: 'address', label: 'Address' }, { key: 'phone_number', label: 'Phone' }, { key: 'email', label: 'Email' }, { key: 'business_type', label: 'Business Type' }].map(({ key, label }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} />
              </div>
            ))}
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={inputStyle}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Notes</label>
            <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--charcoal)', color: 'var(--cream)', border: 'none', borderRadius: 4, padding: '9px 18px', fontSize: 12, cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}><Check size={13} /> Save</button>
            <button onClick={() => setShowForm(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '9px 18px', fontSize: 12, cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="fade-up-2" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(b => (
          <div key={b.id} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <div onClick={() => setExpanded(expanded === b.id ? null : b.id)} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', cursor: 'pointer', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 14 }}>{b.store_name}</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, letterSpacing: '0.08em', ...STATUS_COLORS[b.status] }}>{b.status}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{b.business_type}{b.address && ` · ${b.address}`}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginRight: 8 }}>{b.email}</div>
              {expanded === b.id ? <ChevronUp size={14} color="var(--muted)" /> : <ChevronDown size={14} color="var(--muted)" />}
            </div>

            {expanded === b.id && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px', background: 'var(--warm-white)' }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', alignSelf: 'center', marginRight: 4 }}>Move to:</span>
                  {STATUSES.filter(s => s !== b.status).map(s => (
                    <button key={s} onClick={() => handleStatusChange(b.id, s)} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 10, cursor: 'pointer', fontFamily: 'Jost, sans-serif', border: '1px solid var(--border)', background: 'white', color: 'var(--charcoal)' }}>{s}</button>
                  ))}
                </div>
                {b.notes && (
                  <div style={{ marginBottom: 14, padding: '10px 12px', background: 'white', borderRadius: 6, border: '1px solid var(--border)', fontSize: 12 }}>
                    <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Notes: </span>{b.notes}
                  </div>
                )}
                <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>Deal Items</p>
                {!b.deals?.length ? (
                  <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>No deals logged yet.</p>
                ) : b.deals.map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '8px 12px', background: 'white', borderRadius: 6, border: '1px solid var(--border)', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'monospace', color: 'var(--gold-muted)', fontSize: 11 }}>{d.sku}</span>
                    <span>{d.name}</span>
                    <span style={{ color: 'var(--muted)' }}>×{d.quantity}</span>
                    <span style={{ color: '#7AAF8A' }}>Rev: ${d.est_revenue?.toFixed(2)}</span>
                    {d.profit && <span style={{ color: 'var(--gold-muted)' }}>Profit: ${d.profit?.toFixed(2)}</span>}
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
