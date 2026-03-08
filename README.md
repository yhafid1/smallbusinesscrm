# Small Business CRM

A lightweight, custom-built CRM for a small product-based business. Designed and built from scratch as an alternative to expensive SaaS CRM tools like HubSpot or Salesforce, so that I could use initially for my own product based business. 

**This is a public demo.** Enter any email and password to explore. Data is pre-populated with sample records and resets on refresh.

---

## What it does

**Customer Management**
- Track B2C customers with name, email, and mailing address
- Log multi-SKU purchase orders per customer
- View full purchase history per customer

**Wholesale Pipeline**
- Track B2B business prospects through a custom pipeline: Prospect → Pitched → Won → Lost
- Filter businesses by pipeline stage
- Log wholesale deal line items with auto-calculated revenue and profit
- Add notes per business

**Product Catalog**
- Manage a SKU catalog with single products and bundles
- Track price and cost per SKU — margin auto-calculated
- Activate/deactivate products without deleting them

**Dashboard**
- Live overview of customer count, business count, active products
- Total wholesale revenue at a glance
- Pipeline breakdown with visual progress bars
- Recent customer activity

---




---

## Run it yourself

```bash
git clone https://github.com/yourusername/xyz-crm
cd xyz-crm
npm install
npm run dev
```

Runs on mock data, no environment variables needed. 

---

## Production setup if you want to customize it yourself

The production version connects to a Supabase project via two environment variables:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

The database schema (tables, foreign keys, RLS policies) lives in `supabase_schema.sql` in the production repository.
