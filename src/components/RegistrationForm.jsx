import React, { useState } from 'react';
import { Building2, FileText, MapPin, Phone, Store, User } from 'lucide-react';

export default function RegistrationForm({ onSubmit }) {
  const [data, setData] = useState({
    nome: '',
    cognome: '',
    ragioneSociale: '',
    sedeLegale: '',
    partitaIva: '',
    codiceSDI: '',
    telefonoAziendale: '',
    insegna: '',
    indirizzoNegozio: '',
    telefonoNegozio: '',
    whatsappNegozio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(data);
  };

  const Field = ({ label, name, type = 'text', icon: Icon, placeholder }) => (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-slate-600 flex items-center gap-2">
        {Icon ? <Icon className="w-4 h-4 text-slate-500" /> : null}
        {label}
      </span>
      <input
        name={name}
        type={type}
        value={data[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  );

  return (
    <section id="registrazione" className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white shadow-sm rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b bg-slate-50">
          <h2 className="text-xl font-semibold">Crea il tuo account aziendale</h2>
          <p className="text-slate-600 text-sm mt-1">
            Inserisci i dati per abilitare la pubblicazione dei tuoi prodotti.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nome" name="nome" icon={User} placeholder="Mario" />
          <Field label="Cognome" name="cognome" icon={User} placeholder="Rossi" />

          <Field label="Ragione Sociale" name="ragioneSociale" icon={Building2} placeholder="ACME S.r.l." />
          <Field label="Indirizzo sede legale" name="sedeLegale" icon={MapPin} placeholder="Via Roma 1, Milano" />
          <Field label="Partita IVA" name="partitaIva" icon={FileText} placeholder="IT01234567890" />
          <Field label="Codice SDI" name="codiceSDI" icon={FileText} placeholder="ABC1234" />
          <Field label="Telefono aziendale" name="telefonoAziendale" icon={Phone} placeholder="02 123456" />

          <Field label="Nome Insegna" name="insegna" icon={Store} placeholder="MusicWorld" />
          <Field label="Indirizzo punto vendita" name="indirizzoNegozio" icon={MapPin} placeholder="Corso Italia 10, Torino" />
          <Field label="Telefono negozio" name="telefonoNegozio" icon={Phone} placeholder="011 987654" />
          <Field label="WhatsApp negozio" name="whatsappNegozio" icon={Phone} placeholder="+39 333 1234567" />

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition"
            >
              Salva profilo
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
