import React, { useState } from 'react';
import { Calendar, Clock, RefreshCw, Send, CheckCircle } from 'lucide-react';

export default function SchedulerPanel() {
  const [options, setOptions] = useState({
    mode: 'immediate', // immediate | scheduled
    date: '',
    time: '',
    repeat: 'none', // none | daily | every3 | weekly
    promoEnd: '',
    sold: false,
  });

  const setField = (name, value) => setOptions((p) => ({ ...p, [name]: value }));

  const publishAction = () => {
    alert('Questa è una demo UI. La pubblicazione su Telegram verrà gestita dal backend.');
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pb-12 -mt-4">
      <div className="bg-white shadow-sm rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b bg-slate-50">
          <h3 className="text-lg font-semibold">Pianificazione pubblicazione Telegram</h3>
          <p className="text-slate-600 text-sm mt-1">Configura quando pubblicare o ripubblicare i tuoi prodotti.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="mode"
                checked={options.mode === 'immediate'}
                onChange={() => setField('mode', 'immediate')}
              />
              <span>Pubblicazione immediata</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="mode"
                checked={options.mode === 'scheduled'}
                onChange={() => setField('mode', 'scheduled')}
              />
              <span>Pubblicazione posticipata</span>
            </label>
            {options.mode === 'scheduled' && (
              <div className="grid grid-cols-2 gap-3">
                <LabeledInput label="Giorno" type="date" icon={<Calendar className="w-4 h-4" />} value={options.date} onChange={(v) => setField('date', v)} />
                <LabeledInput label="Orario" type="time" icon={<Clock className="w-4 h-4" />} value={options.time} onChange={(v) => setField('time', v)} />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <span className="text-sm text-slate-600">Ripubblicazione automatica</span>
            <select
              value={options.repeat}
              onChange={(e) => setField('repeat', e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="none">Nessuna</option>
              <option value="daily">Ogni giorno</option>
              <option value="every3">Ogni 3 giorni</option>
              <option value="weekly">Ogni settimana</option>
            </select>
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Il post verrà ripubblicato automaticamente secondo l'intervallo scelto.
            </div>
          </div>

          <div className="space-y-4">
            <LabeledInput label="Scadenza promo (opzionale)" type="date" value={options.promoEnd} onChange={(v) => setField('promoEnd', v)} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={options.sold} onChange={(e) => setField('sold', e.target.checked)} />
              <span className="inline-flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-600" /> Segna come venduto</span>
            </label>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
                onClick={publishAction}
              >
                <Send className="w-4 h-4" /> Pubblica ora
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 text-slate-700 px-4 py-2 hover:bg-slate-50"
                onClick={() => alert('Ripubblica: solo UI, azione reale dal backend.')}
              >
                <RefreshCw className="w-4 h-4" /> Ripubblica
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LabeledInput({ label, value, onChange, type = 'text', icon }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-slate-600 flex items-center gap-2">{icon}{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );
}
