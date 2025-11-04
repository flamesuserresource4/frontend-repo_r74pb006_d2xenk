import React from 'react';
import { Rocket, Store, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">MarketPlay TG</h1>
            <p className="text-white/80 text-sm">Pubblica i tuoi prodotti su Telegram in un click</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#registrazione" className="flex items-center gap-2 hover:text-white/90">
            <User className="w-4 h-4" />
            Registrazione
          </a>
          <a href="#prodotti" className="flex items-center gap-2 hover:text-white/90">
            <Store className="w-4 h-4" />
            Prodotti
          </a>
        </div>
      </div>
    </header>
  );
}
