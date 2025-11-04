import React, { useState } from 'react';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import ProductComposer from './components/ProductComposer';
import SchedulerPanel from './components/SchedulerPanel';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [product, setProduct] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="space-y-6">
        <RegistrationForm onSubmit={setProfile} />
        <ProductComposer onChange={setProduct} />
        <SchedulerPanel product={product} profile={profile} />

        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 text-sm text-slate-600">
            <p>
              Nota: questa è una demo front-end. Le funzioni di autenticazione, import automatico avanzato,
              pagamenti e pubblicazione su Telegram verranno abilitate collegandosi al backend.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
