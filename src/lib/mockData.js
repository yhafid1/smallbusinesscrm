// Mock data for demo purposes — no database required

export const mockProducts = [
  { id: '1', sku: 'FRG-001', name: 'Noir Oud 50ml', product_type: 'single', price: 85.00, cost: 28.00, active: true, created_at: '2024-01-10' },
  { id: '2', sku: 'FRG-002', name: 'Velvet Rose 50ml', product_type: 'single', price: 75.00, cost: 22.00, active: true, created_at: '2024-01-10' },
  { id: '3', sku: 'FRG-003', name: 'Amber Dusk 30ml', product_type: 'single', price: 55.00, cost: 16.00, active: true, created_at: '2024-01-15' },
  { id: '4', sku: 'FRG-004', name: 'Cedar & Smoke 50ml', product_type: 'single', price: 80.00, cost: 25.00, active: true, created_at: '2024-02-01' },
  { id: '5', sku: 'BDL-001', name: 'Signature Duo — Noir & Rose', product_type: 'bundle', price: 145.00, cost: 55.00, active: true, created_at: '2024-02-15' },
  { id: '6', sku: 'BDL-002', name: 'Discovery Set (3 x 10ml)', product_type: 'bundle', price: 95.00, cost: 30.00, active: true, created_at: '2024-03-01' },
  { id: '7', sku: 'FRG-005', name: 'White Musk 30ml', product_type: 'single', price: 50.00, cost: 14.00, active: false, created_at: '2024-01-10' },
]

export const mockCustomers = [
  {
    id: '1', name: 'Jordan Mills', email: 'jordan.mills@email.com',
    mailing_address: '142 Maple Ave, Austin TX 78701', created_at: '2024-02-03',
    orders: [
      { id: 'o1', date_of_sale: '2024-02-03', items: [{ sku: 'FRG-001', name: 'Noir Oud 50ml', quantity: 1, unit_price: 85.00 }, { sku: 'FRG-002', name: 'Velvet Rose 50ml', quantity: 1, unit_price: 75.00 }] },
      { id: 'o2', date_of_sale: '2024-04-18', items: [{ sku: 'BDL-001', name: 'Signature Duo', quantity: 1, unit_price: 145.00 }] },
    ]
  },
  {
    id: '2', name: 'Priya Nair', email: 'priya.n@gmail.com',
    mailing_address: '88 Sunset Blvd, Los Angeles CA 90028', created_at: '2024-02-20',
    orders: [
      { id: 'o3', date_of_sale: '2024-02-20', items: [{ sku: 'FRG-003', name: 'Amber Dusk 30ml', quantity: 2, unit_price: 55.00 }] },
    ]
  },
  {
    id: '3', name: 'Marcus Webb', email: 'mwebb@outlook.com',
    mailing_address: '310 Oak Street, Nashville TN 37201', created_at: '2024-03-05',
    orders: [
      { id: 'o4', date_of_sale: '2024-03-05', items: [{ sku: 'BDL-002', name: 'Discovery Set', quantity: 1, unit_price: 95.00 }] },
    ]
  },
  {
    id: '4', name: 'Sofia Reyes', email: 'sofia.reyes@icloud.com',
    mailing_address: '27 Elm Court, Miami FL 33101', created_at: '2024-03-22',
    orders: [
      { id: 'o5', date_of_sale: '2024-03-22', items: [{ sku: 'FRG-001', name: 'Noir Oud 50ml', quantity: 1, unit_price: 85.00 }] },
      { id: 'o6', date_of_sale: '2024-05-10', items: [{ sku: 'FRG-004', name: 'Cedar & Smoke 50ml', quantity: 1, unit_price: 80.00 }, { sku: 'FRG-002', name: 'Velvet Rose 50ml', quantity: 1, unit_price: 75.00 }] },
    ]
  },
  {
    id: '5', name: 'Devon Clarke', email: 'dclarke@email.com',
    mailing_address: '501 Pine Rd, Portland OR 97201', created_at: '2024-04-11',
    orders: [
      { id: 'o7', date_of_sale: '2024-04-11', items: [{ sku: 'FRG-002', name: 'Velvet Rose 50ml', quantity: 2, unit_price: 75.00 }] },
    ]
  },
]

export const mockBusinesses = [
  {
    id: '1', store_name: 'Aura Boutique', address: '220 Fifth Ave, New York NY 10001',
    phone_number: '212-555-0142', email: 'buying@auraboutique.com',
    business_type: 'Luxury Boutique', status: 'Won', notes: 'Reorders every quarter. Prefers Noir & Rose lines.',
    deals: [
      { sku: 'FRG-001', name: 'Noir Oud 50ml', quantity: 24, unit_price: 55.00, est_revenue: 1320.00, profit: 648.00 },
      { sku: 'FRG-002', name: 'Velvet Rose 50ml', quantity: 24, unit_price: 48.75, est_revenue: 1170.00, profit: 648.00 },
    ]
  },
  {
    id: '2', store_name: 'Serenity Spa & Wellness', address: '88 Grove St, San Francisco CA 94102',
    phone_number: '415-555-0198', email: 'orders@serenityspa.com',
    business_type: 'Spa', status: 'Pitched', notes: 'Very interested in the Amber and White Musk. Following up end of month.',
    deals: []
  },
  {
    id: '3', store_name: 'The Gift Collective', address: '14 Harbor Way, Charleston SC 29401',
    phone_number: '843-555-0167', email: 'hello@giftcollective.co',
    business_type: 'Gift Shop', status: 'Won', notes: 'Discovery Sets moving well for them. Asked about holiday bundles.',
    deals: [
      { sku: 'BDL-002', name: 'Discovery Set (3 x 10ml)', quantity: 36, unit_price: 62.00, est_revenue: 2232.00, profit: 1152.00 },
    ]
  },
  {
    id: '4', store_name: 'Bloom & Co.', address: '77 Westfield Rd, Atlanta GA 30301',
    phone_number: '404-555-0211', email: 'purchasing@bloomco.com',
    business_type: 'Florist & Lifestyle', status: 'Prospect', notes: '',
    deals: []
  },
  {
    id: '5', store_name: 'Nomad Market', address: '333 Canyon Blvd, Denver CO 80201',
    phone_number: '720-555-0189', email: 'buyers@nomadmarket.com',
    business_type: 'Lifestyle Retail', status: 'Lost', notes: 'MOQ was too high for their current budget. Revisit Q1 next year.',
    deals: []
  },
]
