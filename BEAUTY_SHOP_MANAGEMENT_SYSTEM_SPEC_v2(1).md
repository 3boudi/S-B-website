# Nails & Beauty Products Wholesale Management System
## Final Functional Specification (v3 — Confirmed with Client)

---

# 0. Document Status

This is the **authoritative specification** for the project. It supersedes all previous draft specs.

Three points were explicitly clarified with the client and are now locked in as confirmed scope:

1. **Stock is 100% manual** — no automatic consumption / no Bill of Materials (BOM) linking products to stock. The client writes down what she uses, herself, via dedicated "Use" and "Add Quantity" buttons.
2. **Two payment modes exist**: (a) **Installment plan (تقسيط)** — a payment schedule spread over a duration, with reminders when a due date arrives; (b) **Credit / running balance (كريدي)** — open-ended, every payment is logged as it happens until the order reaches "Fully Paid."
3. **Orders move through precise, well-defined stages** (a real state machine), not just a single status field.

Everything below is built around these three decisions. Any earlier mention of automatic stock deduction / product recipes is **explicitly discarded**.

---

# 1. Project Overview

The software manages a **B2B wholesale business selling nail/beauty products** (press-on nails, kits, accessories) to cosmetic shops and boutiques.

Core areas:

```text
Products  →  Clients / Boutiques  →  Orders  →  Payments
Stock (manual)  →  Suppliers
```

Main goal:

> Know what she sells, who buys it, what each client ordered, what's currently in stock, what she used from stock, who she buys materials from, and — critically — track debts and payment schedules precisely (installment or credit).

Must stay flexible enough to later support other beauty-product businesses (salons, barbershops, cosmetics stores), without forcing complexity the client didn't ask for.

---

# 2. Main Modules

```text
Dashboard

1. Products
2. Stock
3. Suppliers
4. Clients / Boutiques
5. Orders
6. Payments
7. Reports
8. Settings
```

Payments is now a **first-class module**, not a "future" one — it's required for both installment and credit tracking.

---

# 3. Products

## 3.1 Purpose

Products = what the business **sells**. Stock items = what the business **owns physically**. These stay separate — **there is no automatic link consuming stock when a product is sold** (see §5.9 for why).

## 3.2 Default Categories

Created automatically on first launch:

1. **Press-on Nails Main**
2. **Press-on Nails Pied**
3. **Kits Main et Pied**

Categories are manageable: Add / Edit / Delete / View products in category.

## 3.3 Product Fields

```text
Product
├── Image
├── Name
├── Description (optional)
├── Wholesale Price
├── Category
├── Reference / SKU (optional)
└── Active / Inactive
```

## 3.4 Product ≠ Stock (confirmed rule)

```text
SELLABLE PRODUCT              STOCK ITEMS (tracked separately, manually)
Press-on French Main    ⊥      Capsules, Colle, Scotch, Vernis, Packaging...
```

No recipe, no BOM, no automatic deduction. See §5.

---

# 4. Suppliers

## 4.1 Purpose

Where the business buys its stock materials from.

Client's own words:
> "نكتب فيه منين راني نشري سلعتي، اسماء الفورنيسور، رقم الهاتف، الصفحة تاعو، و شحال باعلي كل منتج"

## 4.2 Supplier Fields

```text
Supplier
├── Name
├── Phone
├── Page / Social Media
├── Address (optional)
├── Wilaya (optional)
└── Notes (optional)
```

## 4.3 Supplier → Stock Item Pricing (with history)

Each supplier is linked to the stock items they sell her, at a given price. **Prices are never overwritten** — every price change creates a new historical row.

```text
SupplierPriceHistory
├── id
├── supplier_id
├── stock_item_id
├── price
└── date
```

Example:

```text
Beauty DZ
Capsules:  01/08/2026 → 1,500 DA
Capsules:  20/08/2026 → 1,700 DA
```

The Supplier page shows current price per item + full price history.

---

# 5. Stock / Inventory — Fully Manual

## 5.1 Purpose

This is the module the client described most precisely. It must feel completely open — she can add **anything**, and every change happens through explicit manual actions, never automatically.

Her own words:
> "نكتب فيه السلعة لي عندي و لي شريتها... نتي ديريلي اضافة منتوج و انا نكتب كامل واش عندي، و كي نرفد منهم وحدو وحدو يحسبلي شحال بقى، انا نكتب برك بلي نقصت"

Translation: *"You give me an 'add item' feature and I write down everything I have. When I take from them one by one, [the system] calculates what's left for me — I just write how much I used."*

This is a **manual ledger with automatic arithmetic**, not an automated inventory-consumption engine.

## 5.2 Stock Item Fields

```text
Stock Item
├── Name
├── Category (optional)
├── Image (optional)
├── Description (optional)
├── Current Quantity
├── Unit
├── Minimum Stock Threshold (optional)
├── Reference / SKU (optional)
├── Tracking Mode: "quantity" | "individual" (see §5.8)
├── Linked Supplier(s) (optional)
├── Created Date
└── Last Updated Date
```

## 5.3 Units

```text
Capsules  → pcs
Colle     → ml
Scotch    → roll
Vernis    → bottle / unit
Acetone   → liter
```

Custom units allowed. Every item must pick a meaningful unit — no generic "count" for everything.

## 5.4 Manual Actions (the core UX requirement)

Every stock item row has explicit action buttons — nothing happens automatically:

```text
┌────────────────────────────────────────────┐
│ Capsules  │ 480 pcs │  [➕ Add]  [➖ Use]   │
│                       [✎ Adjust] [🕒 History]│
└────────────────────────────────────────────┘
```

### ➕ Add Quantity (stock received / purchased)

```text
Select Item → Enter Quantity Added → Optional: Link Supplier + Unit Price
           → Optional Note → Confirm
```

Example:

```text
Colle: 250 ml
+ 500 ml purchased from Beauty DZ @ 800 DA
= 750 ml
```

If a supplier + price is entered here, it can optionally also create a `SupplierPriceHistory` row (§4.3) — reuse the same action for "I bought this."

### ➖ Use (manual reduction — the client's main daily action)

```text
Select Item → Enter Quantity Used → Optional Note → Confirm
```

Example:

```text
Glue: 250 ml
- 10 ml used
= 240 ml
```

This is the button she'll press constantly. Must be **fast**: item search, type quantity, confirm. No extra required fields.

### ✎ Adjust (manual correction, e.g. after a physical count)

Sets the quantity to an exact new value and records the difference as an adjustment, with a required reason.

```text
Physical count found 470 (system said 480)
→ Adjustment: -10, reason "Inventory recount"
```

### Other manual movement types

```text
- Damage / Loss   (e.g. broken bottle)
- Return          (e.g. client sent back defective item)
```

All of the above are just **movement types** feeding the same history log — see §5.5.

## 5.5 Stock Movement History (append-only, never overwritten)

Every action above writes one row here. Nothing is ever silently edited — corrections are new rows, not edits to old rows.

```text
StockMovement
├── id
├── stock_item_id
├── type: purchase | use | adjustment | damage | return
├── quantity (+ or -)
├── quantity_before
├── quantity_after
├── date/time
├── related_supplier_id (optional, for purchases)
├── related_purchase_price (optional)
├── note (optional)
└── operator (optional, if multi-user later)
```

The Stock item page shows a full timeline: "480 → used 20 → 460 → added 100 → 560 → ..."

## 5.6 Low Stock Alerts

If `minimum_stock_threshold` is set, the item is flagged **Low Stock** when current quantity falls below it. Shown on the item row and on the Dashboard.

## 5.7 Individual / Numbered Tracking (Vernis)

Client's own words:
> "ليفارني عندك بالأرقام، يعني يكون فيها وين تحددي كل فارني بالرقم تاعو"

Some items (starting with **Vernis**) need to be tracked one-by-one, not as an anonymous quantity.

```text
Vernis
+ Add a vernis (color, reference)

#001 — Red     — Available
#002 — Pink    — Available
#003 — Nude    — Used / Unavailable
#004 — Black   — Available
```

Tracking mode is a **per-item setting**, chosen when the stock item (or its category) is created:

```text
Tracking Mode
○ Quantity   (e.g. Colle → 250 ml, one number goes up/down)
○ Individual (e.g. Vernis → each unit has its own number + status)
```

When "individual" is selected, the "Use" action becomes "select which numbered unit was used" instead of "enter a quantity."

## 5.8 Why No BOM / Automatic Consumption

This was explicitly reconsidered and **rejected** for this system:

- The client never described linking a product's sale to automatic stock deduction.
- She described the opposite: she personally writes down what she used, per item, whenever she uses it — regardless of whether it was tied to a specific client order or not (she might use materials for samples, testing, repackaging, etc., not just fulfilled orders).
- Manual reduction is simpler, matches her actual workflow, and avoids building a "recipe editor" she never asked for.

**This can be revisited later as an optional power-user feature**, but it is explicitly **out of scope for v1** (see §12).

---

# 6. Clients / Boutiques

## 6.1 Fiche Fields

```text
Client
├── Boutique / Shop Name
├── Phone
├── Wilaya
├── Address (optional)
├── Social Media / Page (optional)
└── Notes (optional)
```

## 6.2 Computed Commercial Data (never manually typed)

```text
Boutique X
├── Total achats        → sum of all order totals
├── Total payé          → sum of all payments (installment + credit) across her orders
├── Dette / reste à payer → Total achats − Total payé
├── Dernière commande   → most recent order date
└── Produits achetés    → aggregated list from all order lines
```

## 6.3 Client Page Also Shows

- Full order history (clickable → order detail)
- Full payment history (every payment, which order, which mode, date)
- Any **upcoming or overdue installments** for this client specifically

---

# 7. Orders — Precise Stage Workflow

## 7.1 Purpose

An order is a client's purchase. This module needs a **real state machine** — not a single free-text status.

## 7.2 Order Fields

```text
Order
├── Order Number (auto, sequential)
├── Client
├── Creation Date
├── Order Lines (product, qty, unit price snapshot, line total)
├── Order Total
├── Discount (optional)
├── Final Total
├── Stage (see §7.3)
├── Payment Mode: none yet | installment | credit
├── Payment Status: unpaid | partial | paid | overdue
└── Notes
```

## 7.3 Order Stages (the state machine)

```text
 ┌────────┐    ┌───────────┐    ┌────────────────┐    ┌─────────┐    ┌───────────┐
 │ Draft  │ →  │ Confirmed │ →  │ In Preparation  │ →  │  Ready  │ →  │ Delivered │
 │ مسودة  │    │  مؤكدة    │    │  قيد التحضير    │    │ جاهزة   │    │  تم التسليم │
 └────────┘    └───────────┘    └────────────────┘    └─────────┘    └───────────┘
      │
      └──────────────→  Cancelled / ملغاة
```

| Stage | Meaning | Can edit lines/prices? | Counted in client stats? |
|---|---|---|---|
| **Draft** | Being built, not final | Yes, freely | No |
| **Confirmed** | Locked — this is a real commitment | No (only via explicit "amend" action, logged) | Yes |
| **In Preparation** | Being packed/prepared | No | Yes |
| **Ready** | Packed, waiting for pickup/delivery | No | Yes |
| **Delivered** | Physically handed over | No | Yes |
| **Cancelled** | Voided | — | No (excluded from totals) |

Rules:

- **Price snapshot happens at Confirmed**, not at Draft. While in Draft, prices can still track live product price changes; once Confirmed, prices are frozen forever (§9 immutability rule applies from here).
- Cancellation is only allowed **before Delivered**. A delivered order that needs reversal goes through a **Return**, not a cancellation (mirrors the stock Return movement type in §5.4).
- Stage changes are logged with timestamp (for the order history/audit trail).
- Stage progression does **not** touch Stock automatically (per §5.8) — if the client wants to log stock usage related to preparing this order, she does it manually via the Stock module's "Use" button, same as any other stock reduction.

## 7.4 Order Line Fields

```text
| Produit | Quantité | Prix (snapshot) | Total |
|---|---:|---:|---:|
| Press-on Main | 20 | 500 DA | 10,000 DA |
```

`Order Total = Σ (quantity × snapshotted unit price)`

## 7.5 Order List & Filters

Searchable/filterable by: Client, Date range, Order number, Product, Stage, Payment status.

---

# 8. Payments — Two Modes

This is the most important addition in this version. Every order, once Confirmed, must be assigned a payment mode.

## 8.1 Mode A — Installment Plan (تقسيط)

Used when the client and boutique agree on a **schedule**: total amount split across several payments over a defined duration, with reminders.

### Setup (done once per order)

```text
Order Total: 50,000 DA

Installment Plan
├── Number of Installments: 4
├── Frequency: Monthly (also: Weekly / Custom interval)
├── Start Date: 15/08/2026
└── → System auto-generates 4 installments
```

Generated schedule:

```text
Installment 1 — 12,500 DA — due 15/08/2026
Installment 2 — 12,500 DA — due 15/09/2026
Installment 3 — 12,500 DA — due 15/10/2026
Installment 4 — 12,500 DA — due 15/11/2026
```

Amounts can be adjusted to be unequal if needed (e.g. bigger first payment), as long as they sum to the order total.

### Installment Fields

```text
Installment
├── id
├── plan_id → order_id
├── installment_number
├── due_date
├── amount_due
├── amount_paid   (accumulates from Payment records, see §8.3)
└── status: upcoming | due_today | overdue | paid
```

### Reminders

- Dashboard shows a card: **"Upcoming Payments"** (due within next N days, configurable, default 3) and **"Overdue Payments"** (due date passed, not fully paid).
- Since this is an offline desktop app, reminders are **in-app** (shown on Dashboard/on launch), not SMS/push — flag this assumption to the client if she expects a phone notification (would require the WhatsApp-bot integration pattern used in SalonDZ Tech, which is a separate, larger feature).
- Client fiche also shows her own upcoming/overdue installments.

## 8.2 Mode B — Credit / Running Balance (كريدي)

Used when there's **no fixed schedule** — the boutique just pays whenever they can, and every payment is logged until the balance reaches zero.

Client's own words:
> "دفع بالكريدي، و كل ما يدفع تقوم بتسجيل المبلغ المدفوع حتى يصل الى تم دفع"

```text
Order Total: 16,500 DA

Payment 1 — 5,000 DA — 12/08/2026
Payment 2 — 6,000 DA — 20/08/2026
Payment 3 — 5,500 DA — 02/09/2026
                        ────────────
Total Paid: 16,500 DA  → Status: Paid ✅
```

No due dates, no reminders by default — purely a running tally. (Optional future addition: a manual "reminder note" the user can set herself, e.g. "follow up with her next week" — not required for v1.)

## 8.3 Shared Payment Record

Both modes funnel into the same underlying table, so client-level totals (§6.2) stay simple:

```text
Payment
├── id
├── order_id
├── installment_id (nullable — set only in Installment mode, null in Credit mode)
├── amount
├── date
├── method (cash / transfer / other, optional)
└── note (optional)
```

- **Installment mode**: a payment is applied to a specific installment. When `amount_paid = amount_due` for the last installment, order → `Payment Status: Paid`.
- **Credit mode**: a payment applies directly to the order balance. When `Σ payments = order total`, order → `Payment Status: Paid`.

## 8.4 Order Payment Status (derived, never typed manually)

```text
unpaid    → nothing paid yet
partial   → some paid, less than total
paid      → fully paid
overdue   → (installment mode only) at least one installment is past due and unpaid
```

## 8.5 Payments Module Page

```text
╔══════════════════════════════════════════════╗
║ PAYMENTS                                      ║
║                                                ║
║ 🔴 Overdue (2)                                ║
║  Boutique Y — Installment 2/4 — 4,000 DA — 5j ║
║  Boutique Z — Installment 1/3 — 6,000 DA — 2j ║
║                                                ║
║ 🟡 Upcoming (next 7 days)                     ║
║  Boutique X — Installment 3/4 — 12,500 DA     ║
║                                                ║
║ [+ Enregistrer un paiement]                   ║
╚══════════════════════════════════════════════╝
```

---

# 9. Immutability Rules

1. **Order line prices** are frozen at Confirmed stage — later product price changes never touch existing orders.
2. **Supplier prices** are never overwritten — every change is a new historical row (§4.3).
3. **Stock movements** are append-only — corrections are new rows (§5.5).
4. **Payments** are never deleted, only reversed with an explicit correcting entry if a mistake was made (keeps the audit trail honest).

---

# 10. Dashboard

```text
Total Products | Low-Stock Items | Total Suppliers | Total Clients
Orders This Month | Sales This Month | Total Outstanding Debt

🔴 Overdue Installments
🟡 Upcoming Installments (7 days)
📦 Low Stock Alerts
🕒 Recent Stock Movements
🛍️ Recent Orders
```

---

# 11. Reports

```text
Sales      → by day/month/product/client, best-sellers
Stock      → current levels, low stock, movement history, most-used items
Suppliers  → purchases by supplier, price history, spending
Clients    → total purchases, outstanding debt, payment history
Payments   → installment plans on track vs overdue, credit balances outstanding
```

---

# 12. Explicitly Out of Scope for v1

```text
✗ Product recipes / Bill of Materials
✗ Automatic stock consumption tied to orders
✗ Production batches / manufacturing
✗ Multi-location warehouses
✗ Barcode scanning
✗ Employee accounts / payroll
✗ SMS/WhatsApp payment reminders (in-app only for now)
✗ Advanced accounting / profit margin analysis
✗ Multi-currency
```

These can be proposed later, but must not block v1 delivery.

---

# 13. Data Model Summary

```text
Product           (id, name, description, price, category_id, sku, active)
ProductCategory    (id, name)

StockItem          (id, name, category, quantity, unit, min_threshold,
                     tracking_mode, sku, created_at, updated_at)
StockMovement       (id, stock_item_id, type, quantity, qty_before, qty_after,
                     date, supplier_id?, purchase_price?, note)
VernisUnit          (id, stock_item_id, number, color/ref, status)

Supplier            (id, name, phone, page, address, wilaya, notes)
SupplierPriceHistory(id, supplier_id, stock_item_id, price, date)

Client              (id, name, phone, wilaya, address, page, notes)

Order               (id, client_id, order_number, created_at, stage,
                     payment_mode, payment_status, discount, notes)
OrderLine           (id, order_id, product_id, quantity, unit_price_snapshot, line_total)

InstallmentPlan     (id, order_id, num_installments, frequency, start_date)
Installment         (id, plan_id, number, due_date, amount_due, amount_paid, status)

Payment             (id, order_id, installment_id?, amount, date, method, note)
```

---

# 14. End-to-End Example Scenario

```text
1. Supplier "Beauty DZ" added.
2. Stock: Capsules added, 0 → 500 pcs (movement: purchase, +500, linked to Beauty DZ @ 1,500 DA).
3. Product "Press-on Main" created, 500 DA — no link to Capsules (product ≠ stock).
4. Client "Boutique X" added.
5. Order created for Boutique X: Press-on Main × 20 → Draft.
6. Order → Confirmed. Price snapshotted: 20 × 500 = 10,000 DA.
7. Payment mode chosen: Installment, 2 payments, monthly, starting today.
   Installment 1: 5,000 DA due today. Installment 2: 5,000 DA due in 1 month.
8. She manually goes to Stock → Capsules → "Use" → enters 200 (she counted it herself
   while preparing the order) → 500 → 300 pcs. This is a separate, manual action —
   not triggered by the order.
9. Order moves: Confirmed → In Preparation → Ready → Delivered.
10. Client pays Installment 1: Payment recorded, 5,000 DA, today.
    → Installment 1 status: Paid. Order Payment Status: Partial.
11. One month passes, Installment 2 not paid → Dashboard shows it under "🔴 Overdue".
12. Client fiche shows: Total achats 10,000 DA | Total payé 5,000 DA | Dette 5,000 DA.
```

---

# 15. UI Page Examples

## Stock Item Row

```text
┌──────────────────────────────────────────────────────┐
│ Capsules      │ 300 pcs │ LOW ⚠ │ [➕][➖][✎][🕒]     │
│ Colle         │ 240 ml  │  OK   │ [➕][➖][✎][🕒]     │
│ Vernis        │ 4 units │  OK   │ [➕][👁 View #s][🕒] │
└──────────────────────────────────────────────────────┘
```

## Order Stage Tracker (top of order detail page)

```text
[●Draft] → [●Confirmed] → [○In Prep] → [○Ready] → [○Delivered]
```

## Payment Recording Modal

```text
Order #0032 — Boutique X — Total: 16,500 DA — Remaining: 9,500 DA

Mode: ( ) Installment   (•) Credit

Amount received: [______] DA
Date: [11/08/2026]
Note: [___________]

[ Enregistrer le paiement ]
```

---

# 16. MVP Definition — Complete When Client Can:

```text
1.  Create/manage the 3 product categories and their products.
2.  Add any stock item freely, with a unit.
3.  Add quantity to stock (with optional supplier + price).
4.  Use/reduce stock manually.
5.  Adjust stock after a physical count, with a reason.
6.  See full stock movement history per item.
7.  Track Vernis individually by number, with status.
8.  See low-stock alerts.
9.  Create suppliers, link them to stock items, record prices, preserve price history.
10. Create clients with full fiche (auto-computed totals/debt/last order).
11. Create an order and move it through all 5 stages precisely.
12. Snapshot prices at Confirmed, immutable after.
13. Assign a payment mode (Installment or Credit) per order.
14. Generate an installment schedule and see due/overdue/upcoming status.
15. Log ad-hoc credit payments until fully paid.
16. See Dashboard alerts for overdue and upcoming installments.
17. See client-level and global reports on debt, sales, stock, and suppliers.
```

---

# END OF SPECIFICATION