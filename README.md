# XYZ CRM

A lightweight, custom-built CRM for a small product-based business. Designed and built from scratch as an alternative to expensive SaaS CRM tools like HubSpot or Salesforce — purpose-built to fit a specific workflow rather than forcing the business to adapt to a generic product.

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

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS + custom CSS variables |
| Routing | React Router v6 |
| Auth (production) | Supabase Auth (JWT-based) |
| Database (production) | Supabase (PostgreSQL) |
| Hosting (production) | Vercel |

**Production cost: $0/month** on free tiers.

---

## Architecture decisions

- **Separate entities for customers vs businesses** — B2C and B2B have fundamentally different data shapes and workflows. Forcing them into a single table would mean nullable fields everywhere and logic branching throughout the app.
- **Orders → Line items split** — a single order can contain multiple SKUs. Normalizing this into an order header + line items table keeps data clean and makes reporting straightforward.
- **Products as a reference table** — SKU data is defined once and referenced by ID everywhere. Changing a product name or price propagates correctly rather than having stale data across hundreds of order rows.
- **Row Level Security at the database layer** — security enforced in PostgreSQL via Supabase RLS policies, not just in the frontend. Even if the client-side logic had a bug, unauthorized queries would be rejected by the database itself.
- **Snapshot pricing on orders** — `unit_price` is stored on each line item at time of sale, not derived from the current product price. This means historical order totals stay accurate even if you change a product's price later.

---

## Running locally

```bash
git clone https://github.com/yourusername/xyz-crm
cd xyz-crm
npm install
npm run dev
```

No environment variables needed for the demo — it runs entirely on mock data.

---

## Production setup

The production version connects to a Supabase project via two environment variables:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

The database schema (tables, foreign keys, RLS policies) lives in `supabase_schema.sql` in the production repository.
