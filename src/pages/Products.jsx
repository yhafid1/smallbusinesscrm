import { useState } from 'react'
import { mockProducts as initial } from '../lib/mockData'
import { Plus, Pencil, Check, X } from 'lucide-react'

const emptyProduct = { sku: '', name: '', product_type: 'single', price: '', cost: '', active: true }

export default function Products() {
  const [products, setProducts] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyProduct)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  const handleSave = () => {
    if (!form.sku || !form.name || !form.price) { setError('SKU, name, and price are required.'); return }
    const payload = { ...form, sku: form.sku.toUpperCase(), price: parseFloat(form.price), cost: form.cost ? parseFloat(form.cost) : null, id: editId || String(Date.now()), created_at: new Date().toISOString() }
    if (editId) setProducts(ps => ps.map(p => p.id === editId ? payload : p))
    else setProducts(ps => [payload, ...ps])
    setShowForm(false); setEditId(null); setForm(emptyProduct); setError('')
  }

  const handleEdit = (p) => { setForm({ ...p, price: p.price?.toString(), cost: p.cost?.toString() || '' }); setEditId(p.id); setShowForm(true) }
  const handleToggle = (p) => setProducts(ps => ps.map(x => x.id === p.id ? { ...x, active: !x.active } : x))

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 13, fontFamily: 'Jost, sans-serif', outline: 'none', background: 'white' }
  const labelStyle = { display: 'block', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }

  return (
    <div>
      <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 300, letterSpacing: '0.04em' }}>Products</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>Your fragrance catalog & SKUs</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyProduct) }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--charcoal)', color: 'var(--cream)', border: 'none', borderRadius: 6, padding: '10px 18px', fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}>
          <Plus size={14} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="fade-up" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, padding: '24px', marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 20 }}>{editId ? 'Edit Product' : 'New Product'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            {[{ key: 'sku', label: 'SKU', placeholder: 'FRG-001' }, { key: 'name', label: 'Product Name', placeholder: 'Oud Noir 50ml' }].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} style={inputStyle} />
              </div>
            ))}
            <div>
              <label style={labelStyle}>Type</label>
              <select value={form.product_type} onChange={e => setForm(f => ({ ...f, product_type: e.target.value }))} style={inputStyle}>
                <option value="single">Single</option>
                <option value="bundle">Bundle</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Price ($)</label>
              <input type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Cost ($)</label>
              <input type="number" step="0.01" value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))} placeholder="0.00" style={inputStyle} />
            </div>
          </div>
          {error && <p style={{ color: '#C07070', fontSize: 12, marginBottom: 12 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--charcoal)', color: 'var(--cream)', border: 'none', borderRadius: 4, padding: '9px 18px', fontSize: 12, cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}><Check size={13} /> Save</button>
            <button onClick={() => { setShowForm(false); setError('') }} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '9px 18px', fontSize: 12, cursor: 'pointer', fontFamily: 'Jost, sans-serif' }}><X size={13} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="fade-up-1" style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--cream)' }}>
              {['SKU', 'Name', 'Type', 'Price', 'Cost', 'Margin', 'Status', ''].map(h => (
                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => {
              const margin = p.price && p.cost ? (((p.price - p.cost) / p.price) * 100).toFixed(1) : null
              return (
                <tr key={p.id} style={{ borderBottom: i < products.length - 1 ? '1px solid var(--border)' : 'none', opacity: p.active ? 1 : 0.45 }}>
                  <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 500, fontFamily: 'monospace', color: 'var(--gold-muted)' }}>{p.sku}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{p.name}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 20, background: p.product_type === 'bundle' ? 'rgba(201,168,76,0.1)' : 'var(--cream)', color: p.product_type === 'bundle' ? 'var(--gold-muted)' : 'var(--muted)' }}>{p.product_type}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>${p.price?.toFixed(2)}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{p.cost ? `$${p.cost.toFixed(2)}` : '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: margin ? '#7AAF8A' : 'var(--muted)' }}>{margin ? `${margin}%` : '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 20, background: p.active ? 'rgba(122,175,138,0.12)' : 'var(--cream)', color: p.active ? '#7AAF8A' : 'var(--muted)' }}>{p.active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => handleEdit(p)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 8px', cursor: 'pointer', color: 'var(--muted)' }}><Pencil size={11} /></button>
                      <button onClick={() => handleToggle(p)} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 8px', cursor: 'pointer', fontSize: 10, color: 'var(--muted)', fontFamily: 'Jost, sans-serif' }}>{p.active ? 'Deactivate' : 'Activate'}</button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p style={{ marginTop: 12, fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>⚡ Demo mode — changes are in-memory only and reset on refresh.</p>
    </div>
  )
}
