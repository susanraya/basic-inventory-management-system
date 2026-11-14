// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, Search, Check, X, Package, Trash, Edit, AlertCircle, CheckCircle } = Icons;

const SEED_PRODUCTS = [
  { id: 'p-1041', name: 'Blue Widget', price_usd: 12.5, quantity: 3, updated_at: '2026-11-13T16:20:00Z' },
  { id: 'p-1002', name: 'Stainless Hex Bolt M8 x 50', price_usd: 0.42, quantity: 1240, updated_at: '2026-11-12T09:05:00Z' },
  { id: 'p-1008', name: 'Nitrile Gloves, Box of 100', price_usd: 18.75, quantity: 42, updated_at: '2026-11-14T08:12:00Z' },
  { id: 'p-1015', name: 'Torx Bit Set T10-T40', price_usd: 24.0, quantity: 4, updated_at: '2026-11-11T14:48:00Z' },
  { id: 'p-1022', name: 'PVC Pipe 1in x 10ft', price_usd: 9.35, quantity: 86, updated_at: '2026-11-10T11:30:00Z' },
  { id: 'p-1026', name: 'Copper Elbow 3/4in', price_usd: 2.1, quantity: 312, updated_at: '2026-11-09T15:02:00Z' },
  { id: 'p-1031', name: 'Safety Goggles, Clear', price_usd: 7.8, quantity: 0, updated_at: '2026-11-13T10:41:00Z' },
  { id: 'p-1034', name: 'Cordless Drill 18V', price_usd: 129.99, quantity: 6, updated_at: '2026-11-12T17:55:00Z' },
  { id: 'p-1037', name: 'Masking Tape 2in', price_usd: 3.45, quantity: 158, updated_at: '2026-11-08T13:19:00Z' },
  { id: 'p-1044', name: 'LED Shop Light 4ft', price_usd: 34.5, quantity: 2, updated_at: '2026-11-14T07:38:00Z' },
  { id: 'p-1049', name: 'Galvanised Washer M8', price_usd: 0.08, quantity: 2480, updated_at: '2026-11-07T09:27:00Z' },
  { id: 'p-1053', name: 'Teflon Thread Tape', price_usd: 1.25, quantity: 64, updated_at: '2026-11-11T12:04:00Z' },
  { id: 'p-1058', name: 'Angle Grinder Disc 4.5in', price_usd: 2.95, quantity: 23, updated_at: '2026-11-13T18:50:00Z' },
  { id: 'p-1061', name: 'Ear Defenders SNR 31', price_usd: 14.2, quantity: 11, updated_at: '2026-11-06T16:11:00Z' },
  { id: 'p-1066', name: 'Zip Ties 200mm, Pack of 100', price_usd: 4.6, quantity: 97, updated_at: '2026-11-10T08:44:00Z' },
  { id: 'p-1070', name: 'Red Widget', price_usd: 12.5, quantity: 5, updated_at: '2026-11-12T11:16:00Z' },
  { id: 'p-1074', name: 'Impact Socket Set 1/2in', price_usd: 89.0, quantity: 3, updated_at: '2026-11-14T09:02:00Z' },
  { id: 'p-1079', name: 'Workbench Vice 6in', price_usd: 74.95, quantity: 8, updated_at: '2026-11-05T14:33:00Z' },
];

const LOW_STOCK_THRESHOLD = 5;

const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const fmtDate = (iso) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(iso));

const tint = (hex, alpha) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const validateProduct = ({ name, price_usd, quantity }) => {
  const errors = {};
  if (!String(name).trim()) errors.name = 'Enter a product name.';
  const price = String(price_usd).trim();
  const p = Number(price);
  if (price === '' || Number.isNaN(p)) errors.price_usd = 'Enter a price in USD, for example 12.50.';
  else if (p < 0) errors.price_usd = 'Price must be 0 or more.';
  const qty = String(quantity).trim();
  const q = Number(qty);
  if (qty === '' || Number.isNaN(q)) errors.quantity = 'Enter a quantity.';
  else if (!Number.isInteger(q) || q < 0) errors.quantity = 'Quantity must be a whole number of 0 or more.';
  return errors;
};

const FIELD_CLASS =
  'w-full bg-transparent px-3 py-2 text-[14px] tabular-nums border-2 outline-none';

const Modal = ({ labelledBy, describedBy, onClose, children, wf, size = 'max-w-2xl' }) => {
  const panelRef = React.useRef(null);

  React.useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const focusables = () =>
      Array.from(panel.querySelectorAll('button, input, select, textarea, [href]')).filter(
        (el) => !el.disabled && el.tabIndex !== -1
      );
    const first = focusables()[0];
    if (first) first.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="ob-overlay fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ backgroundColor: tint(brand.primaryColor, 0.45) }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        data-wf={wf}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={`ob-panel mt-6 w-full ${size}`}
        style={{
          backgroundColor: brand.backgroundColor,
          border: `2px solid ${brand.primaryColor}`,
          borderRadius: brand.radius,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default function Screen() {
  const navigate = useNavigate();
  const primary = brand.primaryColor;
  const accent = brand.accentColor;
  const neutral = brand.neutralColor;
  const surface = brand.backgroundColor;
  const hairline = tint(primary, 0.13);

  const [products, setProducts] = React.useState(SEED_PRODUCTS);
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [modal, setModal] = React.useState(null); // { type, id }
  const [banner, setBanner] = React.useState(null); // { tone, text }
  const [flashId, setFlashId] = React.useState(null);

  const [addForm, setAddForm] = React.useState({ name: '', price_usd: '', quantity: '' });
  const [addErrors, setAddErrors] = React.useState({});
  const [editForm, setEditForm] = React.useState({ name: '', price_usd: '', quantity: '' });
  const [editErrors, setEditErrors] = React.useState({});
  const [stockValue, setStockValue] = React.useState('');
  const [stockError, setStockError] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const searchRef = React.useRef(null);
  const addButtonRef = React.useRef(null);
  const nextId = React.useRef(1101);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 620);
    return () => clearTimeout(t);
  }, []);

  const active = React.useMemo(
    () => (modal ? products.find((p) => p.id === modal.id) || null : null),
    [modal, products]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  const lowCount = products.filter((p) => p.quantity < LOW_STOCK_THRESHOLD).length;

  const closeModal = React.useCallback(() => {
    setModal(null);
    setSaving(false);
    setAddErrors({});
    setEditErrors({});
    setStockError('');
    window.setTimeout(() => {
      if (addButtonRef.current) addButtonRef.current.focus();
    }, 0);
  }, []);

  const flash = (id, tone, text) => {
    setFlashId(id);
    setBanner({ tone, text });
  };

  const openAdd = () => {
    setAddForm({ name: '', price_usd: '', quantity: '' });
    setAddErrors({});
    setModal({ type: 'add' });
  };

  const openEdit = (product) => {
    setEditForm({
      name: product.name,
      price_usd: String(product.price_usd),
      quantity: String(product.quantity),
    });
    setEditErrors({});
    setModal({ type: 'edit', id: product.id });
  };

  const openStock = (product) => {
    setStockValue(String(product.quantity));
    setStockError('');
    setModal({ type: 'stock', id: product.id });
  };

  const submitAdd = (event) => {
    event.preventDefault();
    const errors = validateProduct(addForm);
    setAddErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSaving(true);
    const id = `p-${nextId.current++}`;
    const record = {
      id,
      name: addForm.name.trim(),
      price_usd: Number(addForm.price_usd),
      quantity: Number(addForm.quantity),
      updated_at: new Date().toISOString(),
    };
    setProducts((prev) => [record, ...prev]);
    flash(id, 'success', `${record.name} added to the shared inventory.`);
    setQuery('');
    closeModal();
  };

  const submitEdit = (event) => {
    event.preventDefault();
    const errors = validateProduct(editForm);
    setEditErrors(errors);
    if (Object.keys(errors).length > 0 || !active) return;
    setSaving(true);
    const updated = {
      name: editForm.name.trim(),
      price_usd: Number(editForm.price_usd),
      quantity: Number(editForm.quantity),
    };
    setProducts((prev) =>
      prev.map((p) =>
        p.id === active.id ? { ...p, ...updated, updated_at: new Date().toISOString() } : p
      )
    );
    flash(active.id, 'success', `Details saved for ${updated.name}.`);
    closeModal();
  };

  const submitStock = (event) => {
    event.preventDefault();
    const raw = String(stockValue).trim();
    const q = Number(raw);
    if (raw === '' || Number.isNaN(q) || !Number.isInteger(q) || q < 0) {
      setStockError('Quantity must be a whole number of 0 or more.');
      return;
    }
    if (!active) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === active.id ? { ...p, quantity: q, updated_at: new Date().toISOString() } : p))
    );
    flash(
      active.id,
      q < LOW_STOCK_THRESHOLD ? 'warn' : 'success',
      q < LOW_STOCK_THRESHOLD
        ? `${active.name} set to ${q} — still below ${LOW_STOCK_THRESHOLD}, flagged as low stock.`
        : `${active.name} stock updated to ${q}.`
    );
    closeModal();
  };

  const confirmDelete = () => {
    if (!active) return;
    const name = active.name;
    setProducts((prev) => prev.filter((p) => p.id !== active.id));
    setBanner({ tone: 'removed', text: `${name} was removed from the shared inventory.` });
    setFlashId(null);
    closeModal();
  };

  const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.14em]';

  const primaryBtn = {
    backgroundColor: primary,
    color: surface,
    border: `2px solid ${primary}`,
    borderRadius: brand.radius,
  };
  const ghostBtn = {
    backgroundColor: surface,
    color: primary,
    border: `2px solid ${primary}`,
    borderRadius: brand.radius,
  };
  const dangerBtn = {
    backgroundColor: accent,
    color: surface,
    border: `2px solid ${accent}`,
    borderRadius: brand.radius,
  };
  const btnBase =
    'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-opacity duration-150 hover:opacity-80 disabled:opacity-40';

  const fieldStyle = (invalid) => ({
    borderColor: invalid ? accent : primary,
    borderRadius: brand.radius,
    color: primary,
  });

  const FieldError = ({ id, message }) =>
    message ? (
      <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[12px] font-medium" style={{ color: accent }}>
        <AlertCircle className="mt-[1px] h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span>{message}</span>
      </p>
    ) : null;

  const ProductFields = ({ values, errors, onChange, prefix, wfIds }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${prefix}-name`} className={labelClass} style={{ color: neutral }}>
          Name
        </Label>
        <Input
          id={`${prefix}-name`}
          data-wf={wfIds[0]}
          value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
          className={`${FIELD_CLASS} mt-1.5`}
          style={fieldStyle(Boolean(errors.name))}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? `${prefix}-name-error` : undefined}
          autoComplete="off"
        />
        <FieldError id={`${prefix}-name-error`} message={errors.name} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${prefix}-price`} className={labelClass} style={{ color: neutral }}>
            Price (USD)
          </Label>
          <Input
            id={`${prefix}-price`}
            data-wf={wfIds[1]}
            inputMode="decimal"
            value={values.price_usd}
            onChange={(e) => onChange('price_usd', e.target.value)}
            className={`${FIELD_CLASS} mt-1.5`}
            style={fieldStyle(Boolean(errors.price_usd))}
            aria-invalid={errors.price_usd ? 'true' : undefined}
            aria-describedby={errors.price_usd ? `${prefix}-price-error` : undefined}
            autoComplete="off"
          />
          <FieldError id={`${prefix}-price-error`} message={errors.price_usd} />
        </div>
        <div>
          <Label htmlFor={`${prefix}-qty`} className={labelClass} style={{ color: neutral }}>
            Quantity
          </Label>
          <Input
            id={`${prefix}-qty`}
            data-wf={wfIds[2]}
            inputMode="numeric"
            value={values.quantity}
            onChange={(e) => onChange('quantity', e.target.value)}
            className={`${FIELD_CLASS} mt-1.5`}
            style={fieldStyle(Boolean(errors.quantity))}
            aria-invalid={errors.quantity ? 'true' : undefined}
            aria-describedby={errors.quantity ? `${prefix}-qty-error` : undefined}
            autoComplete="off"
          />
          <FieldError id={`${prefix}-qty-error`} message={errors.quantity} />
        </div>
      </div>
    </div>
  );

  const StockMeter = ({ quantity, low }) => (
    <span
      aria-hidden="true"
      className="mt-1.5 block h-[2px] w-14"
      style={{ backgroundColor: tint(primary, 0.14) }}
    >
      <span
        className="block h-full transition-all duration-300"
        style={{
          width: `${Math.max(3, Math.min(100, (quantity / 40) * 100))}%`,
          backgroundColor: low ? accent : primary,
        }}
      />
    </span>
  );

  return (
    <div className="ob min-h-full pb-16" style={{ backgroundColor: surface, color: primary, fontFamily: brand.fontBody }}>
      <style>{`
        .ob :is(button, input, select, textarea, a):focus-visible {
          outline: 2px solid ${accent};
          outline-offset: 2px;
        }
        @keyframes obRowIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        @keyframes obFlash { from { background-color: ${tint(accent, 0.16)}; } to { background-color: transparent; } }
        @keyframes obFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes obPanel { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes obPulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.12; } }
        .ob-row-in { animation: obRowIn 200ms ease-out both; }
        .ob-flash { animation: obFlash 1500ms ease-out both; }
        .ob-overlay { animation: obFade 140ms ease-out both; }
        .ob-panel { animation: obPanel 180ms cubic-bezier(.2,.8,.2,1) both; }
        .ob-skel { animation: obPulse 1.25s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ob *, .ob-overlay, .ob-panel { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1180px] px-4 pt-6 sm:px-8 sm:pt-10">
        {/* Row 1 — title + primary action */}
        <div className="grid grid-cols-12 items-end gap-4">
          <div className="col-span-12 sm:col-span-8" data-wf="b-0-0">
            <h1
              className="text-[32px] font-bold leading-none tracking-[-0.03em] sm:text-[38px]"
              style={{ fontFamily: brand.fontHeading }}
            >
              Inventory
            </h1>
            <p className="mt-2 text-[12px]" style={{ color: neutral }}>
              <span className="tabular-nums">Signed in as susan.raya@quorq.ai</span>
              <span aria-hidden="true" className="px-2">·</span>
              <button
                type="button"
                onClick={() => navigate('sign-in')}
                className="font-bold underline underline-offset-2 transition-opacity duration-150 hover:opacity-70"
                style={{ color: primary }}
              >
                Sign out
              </button>
            </p>
          </div>
          <div className="col-span-12 flex sm:col-span-4 sm:justify-end">
            <Button
              ref={addButtonRef}
              data-wf="b-0-1"
              type="button"
              onClick={openAdd}
              className={`${btnBase} w-full sm:w-auto`}
              style={primaryBtn}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add product
            </Button>
          </div>
        </div>

        {/* Success / result banner */}
        {banner && (
          <div
            role="status"
            className="ob-row-in mt-6 flex items-start gap-4 px-4 py-3"
            style={{
              border: `2px solid ${banner.tone === 'warn' ? accent : primary}`,
              borderRadius: brand.radius,
            }}
          >
            <p className="flex items-start gap-2 text-[13px] font-medium">
              {banner.tone === 'warn' ? (
                <AlertCircle className="mt-[2px] h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden="true" />
              ) : banner.tone === 'removed' ? (
                <Trash className="mt-[2px] h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <CheckCircle className="mt-[2px] h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span>{banner.text}</span>
            </p>
          </div>
        )}

        {/* Row 2 — search */}
        <div className="mt-6" data-wf="b-1-0">
          <Label htmlFor="product-search" className={labelClass} style={{ color: neutral }}>
            Search products by name
          </Label>
          <div
            className="mt-1.5 flex items-center gap-2 px-3"
            style={{ border: `2px solid ${primary}`, borderRadius: brand.radius }}
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: neutral }} />
            <Input
              id="product-search"
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. widget, gloves, M8"
              className="w-full border-0 bg-transparent py-2.5 text-[14px] outline-none"
              style={{ color: primary }}
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  if (searchRef.current) searchRef.current.focus();
                }}
                aria-label="Clear search"
                className="shrink-0 p-1 transition-opacity duration-150 hover:opacity-60"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Row 3 — count line */}
        <p className="mt-4 text-[13px] tabular-nums" data-wf="b-2-0" style={{ color: neutral }}>
          <span className="font-bold" style={{ color: primary }}>
            {products.length} products
          </span>
          . Quantities below {LOW_STOCK_THRESHOLD} are flagged as low stock
          {lowCount > 0 ? ` — ${lowCount} right now` : ' — none right now'}.
          <span aria-hidden="true" className="px-2">·</span>
          <span>Shared inventory, Wharf Road depot. Synced 09:41.</span>
        </p>

        {/* Row 4 — products table */}
        <section aria-labelledby="products-heading" className="mt-4" data-wf="b-3-0">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          {loading ? (
            <div style={{ borderTop: `2px solid ${primary}` }}>
              <p className="py-3 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: neutral }}>
                Loading the shared inventory…
              </p>
              <ul className="space-y-[1px]">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <li
                    key={i}
                    className="ob-skel h-11"
                    style={{ backgroundColor: tint(primary, 0.5), animationDelay: `${i * 90}ms` }}
                  />
                ))}
              </ul>
            </div>
          ) : filtered.length > 0 ? (
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <Table className="w-full min-w-[720px] border-collapse text-left" style={{ fontVariantNumeric: 'tabular-nums' }}>
                <caption className="sr-only">
                  Shared product inventory: name, price in US dollars, quantity, stock status and row actions
                </caption>
                <THead>
                  <TR style={{ borderBottom: `2px solid ${primary}` }}>
                    <TH
                      data-wf="i-3-0-0"
                      scope="col"
                      className="py-2.5 pl-3 text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: neutral }}
                    >
                      Name
                    </TH>
                    <TH
                      data-wf="i-3-0-1"
                      scope="col"
                      className="py-2.5 text-right text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: neutral }}
                    >
                      Price (USD)
                    </TH>
                    <TH
                      data-wf="i-3-0-2"
                      scope="col"
                      className="py-2.5 text-right text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: neutral }}
                    >
                      Quantity
                    </TH>
                    <TH
                      data-wf="i-3-0-3"
                      scope="col"
                      className="py-2.5 pl-6 text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: neutral }}
                    >
                      Stock status
                    </TH>
                    <TH
                      data-wf="i-3-0-4"
                      scope="col"
                      className="py-2.5 pr-3 text-right text-[11px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: neutral }}
                    >
                      Actions
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {filtered.map((product) => {
                    const low = product.quantity < LOW_STOCK_THRESHOLD;
                    return (
                      <TR
                        key={product.id}
                        className={product.id === flashId ? 'ob-flash' : undefined}
                        style={{
                          borderBottom: `1px solid ${hairline}`,
                          borderLeft: `2px solid ${low ? accent : 'transparent'}`,
                        }}
                      >
                        <TD className="py-2.5 pl-3 align-middle">
                          <span className="block text-[14px] font-medium leading-tight">{product.name}</span>
                          <span className="block text-[11px] tabular-nums" style={{ color: neutral }}>
                            {product.id} · updated {fmtDate(product.updated_at)}
                          </span>
                        </TD>
                        <TD className="py-2.5 text-right align-middle text-[14px] tabular-nums">
                          {USD.format(product.price_usd)}
                        </TD>
                        <TD className="py-2.5 align-middle text-right">
                          <span className="block text-[14px] font-bold tabular-nums">
                            {product.quantity.toLocaleString('en-US')}
                          </span>
                          <span className="flex justify-end">
                            <StockMeter quantity={product.quantity} low={low} />
                          </span>
                        </TD>
                        <TD className="py-2.5 pl-6 align-middle">
                          {low ? (
                            <Badge
                              className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                              style={{
                                border: `2px solid ${accent}`,
                                color: accent,
                                backgroundColor: surface,
                                borderRadius: brand.radius,
                              }}
                            >
                              <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                              Low stock
                            </Badge>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                              style={{ color: neutral }}
                            >
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              In stock
                            </span>
                          )}
                        </TD>
                        <TD className="py-2.5 pr-3 align-middle">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openStock(product)}
                              aria-label={`Update stock for ${product.name}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-150 hover:opacity-70"
                              style={{ border: `2px solid ${primary}`, borderRadius: brand.radius }}
                            >
                              <Package className="h-3.5 w-3.5" aria-hidden="true" />
                              <span className="hidden md:inline">Stock</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => openEdit(product)}
                              aria-label={`Edit ${product.name}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-opacity duration-150 hover:opacity-70"
                              style={{ border: `2px solid ${tint(primary, 0.3)}`, borderRadius: brand.radius }}
                            >
                              <Edit className="h-3.5 w-3.5" aria-hidden="true" />
                              <span className="hidden md:inline">Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setModal({ type: 'delete', id: product.id })}
                              aria-label={`Delete ${product.name}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] transition-opacity duration-150 hover:opacity-70"
                              style={{ border: `2px solid ${tint(primary, 0.3)}`, borderRadius: brand.radius }}
                            >
                              <Trash className="h-3.5 w-3.5" aria-hidden="true" />
                              <span className="hidden md:inline">Delete</span>
                            </button>
                          </div>
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
              <p className="mt-3 text-[12px] tabular-nums" style={{ color: neutral }}>
                Showing {filtered.length} of {products.length} products.
              </p>
            </div>
          ) : null}

          {/* Row 5 — first-use empty state */}
          {!loading && products.length === 0 && (
            <div
              data-wf="b-4-0"
              className="ob-row-in mt-2 py-10"
              style={{ borderTop: `2px solid ${primary}` }}
            >
              <Empty
                title="The inventory is empty"
                description="No products yet — add your first product to get started."
                action={
                  <Button type="button" onClick={openAdd} className={btnBase} style={primaryBtn}>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add product
                  </Button>
                }
              />
            </div>
          )}

          {/* Row 6 — no search results */}
          {!loading && products.length > 0 && filtered.length === 0 && (
            <div
              data-wf="b-5-0"
              className="ob-row-in mt-2 py-10"
              style={{ borderTop: `2px solid ${primary}` }}
            >
              <Empty
                title="Nothing matches that name"
                description={`No matching products found for "${query}". Check the spelling, or search for part of the name.`}
                action={
                  <Button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      if (searchRef.current) searchRef.current.focus();
                    }}
                    className={btnBase}
                    style={ghostBtn}
                  >
                    Clear search
                  </Button>
                }
              />
            </div>
          )}
        </section>
      </div>

      {/* Row 7-9 — Add product modal */}
      {modal && modal.type === 'add' && (
        <Modal wf="b-6-0" labelledBy="add-title" onClose={closeModal}>
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: `2px solid ${primary}` }}
          >
            <h2 id="add-title" className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: brand.fontHeading }}>
              Add product
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-6 px-6 py-6">
            <form
              id="add-product-form"
              data-wf="b-7-0"
              onSubmit={submitAdd}
              noValidate
              className="col-span-12 md:col-span-8"
            >
              <ProductFields
                values={addForm}
                errors={addErrors}
                prefix="add"
                wfIds={['i-7-0-0', 'i-7-0-1', 'i-7-0-2']}
                onChange={(field, value) => setAddForm((prev) => ({ ...prev, [field]: value }))}
              />
            </form>
            <aside className="col-span-12 md:col-span-4" data-wf="b-7-1">
              <p className={labelClass} style={{ color: neutral }}>
                Rules
              </p>
              <p className="mt-2 text-[13px] leading-[1.5]" style={{ color: neutral }}>
                Name is required, price must be 0 or more, quantity must be a whole number of 0 or more.
              </p>
              <div className="my-4" style={{ borderTop: `1px solid ${hairline}` }} />
              <p className="text-[12px] leading-[1.5]" style={{ color: neutral }}>
                Price in USD is recorded for reference only. Anything saved with fewer than{' '}
                {LOW_STOCK_THRESHOLD} units is flagged low stock straight away.
              </p>
            </aside>
          </div>
          <div
            className="grid grid-cols-12 gap-3 px-6 py-4"
            style={{ borderTop: `2px solid ${primary}` }}
          >
            <div className="col-span-12 sm:col-span-4">
              <Button
                data-wf="b-8-0"
                type="submit"
                form="add-product-form"
                disabled={saving}
                className={`${btnBase} w-full`}
                style={primaryBtn}
              >
                {saving ? 'Saving…' : 'Save product'}
              </Button>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <Button data-wf="b-8-1" type="button" onClick={closeModal} className={`${btnBase} w-full`} style={ghostBtn}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Row 10-11 — Edit product modal */}
      {modal && modal.type === 'edit' && active && (
        <Modal wf="b-9-0" labelledBy="edit-title" onClose={closeModal}>
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: `2px solid ${primary}` }}
          >
            <h2 id="edit-title" className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: brand.fontHeading }}>
              Edit product — {active.name}
            </h2>
          </div>
          <div className="grid grid-cols-12 items-start gap-6 px-6 py-6">
            <form
              id="edit-product-form"
              data-wf="b-10-0"
              onSubmit={submitEdit}
              noValidate
              className="col-span-12 md:col-span-8"
            >
              <ProductFields
                values={editForm}
                errors={editErrors}
                prefix="edit"
                wfIds={['i-10-0-0', 'i-10-0-1', 'i-10-0-2']}
                onChange={(field, value) => setEditForm((prev) => ({ ...prev, [field]: value }))}
              />
              <p className="mt-4 text-[12px]" style={{ color: neutral }}>
                Last updated {fmtDate(active.updated_at)}. Previous values are not kept.
              </p>
            </form>
            <div className="col-span-12 flex flex-col gap-3 md:col-span-4">
              <Button
                data-wf="b-10-1"
                type="submit"
                form="edit-product-form"
                className={`${btnBase} w-full`}
                style={primaryBtn}
              >
                Save changes
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Row 12-13 — Update stock modal */}
      {modal && modal.type === 'stock' && active && (
        <Modal wf="b-11-0" labelledBy="stock-title" onClose={closeModal} size="max-w-xl">
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: `2px solid ${primary}` }}
          >
            <h2 id="stock-title" className="text-[20px] font-bold tracking-[-0.02em]" style={{ fontFamily: brand.fontHeading }}>
              Update stock — {active.name}
            </h2>
          </div>
          <form onSubmit={submitStock} noValidate>
            <div className="grid grid-cols-12 items-start gap-4 px-6 py-6">
              <div className="col-span-12 sm:col-span-4">
                <Label htmlFor="stock-qty" className={labelClass} style={{ color: neutral }}>
                  Quantity
                </Label>
                <Input
                  id="stock-qty"
                  data-wf="b-12-0"
                  inputMode="numeric"
                  value={stockValue}
                  onChange={(e) => setStockValue(e.target.value)}
                  className={`${FIELD_CLASS} mt-1.5`}
                  style={fieldStyle(Boolean(stockError))}
                  aria-invalid={stockError ? 'true' : undefined}
                  aria-describedby={stockError ? 'stock-qty-error' : 'stock-current'}
                />
                <FieldError id="stock-qty-error" message={stockError} />
              </div>
              <div className="col-span-12 sm:col-span-4 sm:pt-[26px]">
                <Button data-wf="b-12-1" type="submit" className={`${btnBase} w-full`} style={primaryBtn}>
                  Save quantity
                </Button>
              </div>
              <p
                id="stock-current"
                data-wf="b-12-2"
                className="col-span-12 text-[13px] tabular-nums sm:col-span-4 sm:pt-[30px]"
                style={{ color: active.quantity < LOW_STOCK_THRESHOLD ? accent : neutral }}
              >
                Current quantity: {active.quantity}
                {active.quantity < LOW_STOCK_THRESHOLD ? ' (low stock).' : '.'}
              </p>
            </div>
            <div className="px-6 pb-6">
              <p className="text-[12px]" style={{ color: neutral }}>
                Whole numbers of 0 or more. Only the current quantity is stored — there is no change history.
              </p>
            </div>
          </form>
        </Modal>
      )}

      {/* Row 14-15 — Delete confirmation modal */}
      {modal && modal.type === 'delete' && active && (
        <Modal wf="b-13-0" labelledBy="delete-title" describedBy="delete-body" onClose={closeModal} size="max-w-lg">
          <div className="px-6 py-6">
            <h2
              id="delete-title"
              className="flex items-start gap-2 text-[20px] font-bold tracking-[-0.02em]"
              style={{ fontFamily: brand.fontHeading }}
            >
              <AlertCircle className="mt-[3px] h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
              <span>Delete “{active.name}”? It will be removed from the shared inventory.</span>
            </h2>
            <p id="delete-body" className="mt-3 text-[13px] tabular-nums leading-[1.5]" style={{ color: neutral }}>
              {active.id} · {USD.format(active.price_usd)} · {active.quantity.toLocaleString('en-US')} in stock. Every
              staff member sees this list, and deleting cannot be undone.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-3 px-6 py-4" style={{ borderTop: `2px solid ${primary}` }}>
            <div className="col-span-12 sm:col-span-5">
              <Button data-wf="b-14-0" type="button" onClick={confirmDelete} className={`${btnBase} w-full`} style={dangerBtn}>
                <Trash className="h-4 w-4" aria-hidden="true" />
                Delete product
              </Button>
            </div>
            <div className="col-span-12 sm:col-span-4">
              <Button data-wf="b-14-1" type="button" onClick={closeModal} className={`${btnBase} w-full`} style={ghostBtn}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
