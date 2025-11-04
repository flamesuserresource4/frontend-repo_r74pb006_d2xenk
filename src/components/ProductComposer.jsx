import React, { useMemo, useState } from 'react';
import { Image as ImageIcon, Link as LinkIcon, Pencil, Percent, Upload } from 'lucide-react';

export default function ProductComposer({ onChange }) {
  const [mode, setMode] = useState('manuale'); // manuale | import
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: 'chitarre',
    price: '',
    salePrice: '',
    image: '',
    sourceUrl: '',
  });

  const discount = useMemo(() => {
    const p = parseFloat(product.price);
    const s = parseFloat(product.salePrice);
    if (!p || !s || s >= p) return 0;
    return Math.round(((p - s) / p) * 100);
  }, [product.price, product.salePrice]);

  const setField = (name, value) => {
    const next = { ...product, [name]: value };
    setProduct(next);
    onChange?.(next);
  };

  const handleImport = () => {
    if (!product.sourceUrl) return;
    // Simulazione import: popola alcuni campi dal link
    const url = new URL(product.sourceUrl);
    const titleFromPath = url.pathname.split('/').filter(Boolean).pop()?.replace(/[-_]/g, ' ') || 'Prodotto';
    const catGuess = guessCategory(titleFromPath);
    const imported = {
      ...product,
      title: capitalize(titleFromPath),
      description: `Importato da ${url.hostname}. Modifica liberamente titolo e descrizione prima della pubblicazione.`,
      category: catGuess,
      image: `https://source.unsplash.com/800x600/?${encodeURIComponent(catGuess)}`,
      price: product.price || '0',
      salePrice: product.salePrice || '',
    };
    setProduct(imported);
    onChange?.(imported);
  };

  return (
    <section id="prodotti" className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white shadow-sm rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Gestione prodotti</h2>
            <p className="text-slate-600 text-sm mt-1">Inserisci manualmente oppure importa dal tuo sito.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1.5 rounded-lg text-sm border ${mode === 'manuale' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'}`}
              onClick={() => setMode('manuale')}
            >
              Inserimento manuale
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-sm border ${mode === 'import' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'}`}
              onClick={() => setMode('import')}
            >
              Import da link
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {mode === 'import' && (
              <div className="rounded-xl border border-dashed p-4 flex flex-col gap-3">
                <label className="text-sm text-slate-600 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Link prodotto dal tuo sito
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={product.sourceUrl}
                    onChange={(e) => setField('sourceUrl', e.target.value)}
                    placeholder="https://www.miosito.it/prodotti/chitarra-stratocaster"
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
                    onClick={handleImport}
                  >
                    <Upload className="w-4 h-4" /> Importa
                  </button>
                </div>
                <p className="text-xs text-slate-500">L'immagine, descrizione e categoria verranno proposte automaticamente e potrai modificarle.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LabeledInput label="Titolo" value={product.title} onChange={(v) => setField('title', v)} icon={Pencil} />
              <CategorySelect value={product.category} onChange={(v) => setField('category', v)} />
              <LabeledTextarea label="Descrizione" value={product.description} onChange={(v) => setField('description', v)} rows={4} />
              <LabeledInput label="URL immagine" value={product.image} onChange={(v) => setField('image', v)} icon={ImageIcon} />

              <LabeledInput label="Prezzo al pubblico (€)" type="number" step="0.01" value={product.price} onChange={(v) => setField('price', v)} />
              <div>
                <LabeledInput label="Prezzo scontato (€)" type="number" step="0.01" value={product.salePrice} onChange={(v) => setField('salePrice', v)} />
                <div className="mt-2 text-sm text-slate-600 inline-flex items-center gap-2">
                  <Percent className="w-4 h-4" /> Sconto: {discount}%
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="border rounded-xl overflow-hidden">
              <div className="bg-slate-50 p-3 text-sm font-medium">Anteprima</div>
              <div className="p-4 space-y-3">
                <div className="aspect-video w-full bg-slate-100 rounded-lg overflow-hidden">
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image} alt="anteprima" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold truncate">{product.title || 'Titolo prodotto'}</h3>
                  <p className="text-xs text-slate-500 capitalize">{product.category}</p>
                </div>
                <div className="flex items-end gap-3">
                  <div className="text-2xl font-bold">{formatPrice(product.salePrice || product.price)}</div>
                  {product.salePrice && product.price && parseFloat(product.salePrice) < parseFloat(product.price) && (
                    <div className="text-slate-400 line-through">{formatPrice(product.price)}</div>
                  )}
                  {discount > 0 && (
                    <span className="ml-auto inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md text-xs">
                      <Percent className="w-3 h-3" /> -{discount}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 line-clamp-3">{product.description || 'Descrizione del prodotto...'}</p>
                <button type="button" className="w-full rounded-lg bg-indigo-600 text-white py-2">Salva prodotto</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function LabeledInput({ label, value, onChange, type = 'text', icon: Icon, step }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-slate-600 flex items-center gap-2">
        {Icon ? <Icon className="w-4 h-4 text-slate-500" /> : null}
        {label}
      </span>
      <input
        type={type}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}

function LabeledTextarea({ label, value, onChange, rows = 3 }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-slate-600">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}

function CategorySelect({ value, onChange }) {
  const categories = ['batterie', 'chitarre', 'bassi', 'amplificatori basso e chitarra', 'audio', 'accessori', 'software'];
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-slate-600">Categoria</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </label>
  );
}

function formatPrice(v) {
  const n = parseFloat(v);
  if (isNaN(n)) return '—';
  return n.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
}

function guessCategory(text) {
  const t = text.toLowerCase();
  if (/(batteria|drum)/.test(t)) return 'batterie';
  if (/(basso|bass)/.test(t)) return 'bassi';
  if (/(ampli|amp|amplificatore)/.test(t)) return 'amplificatori basso e chitarra';
  if (/(audio|monitor|mixer|scheda)/.test(t)) return 'audio';
  if (/(software|plugin|vst)/.test(t)) return 'software';
  if (/(accessori|cavo|stand|custodia)/.test(t)) return 'accessori';
  return 'chitarre';
}

function capitalize(s) {
  return s.replace(/\b\w/g, (m) => m.toUpperCase());
}
