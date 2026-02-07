import React from 'react';

export default function Booking() {
  return (
    <div className="pt-32 px-4 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-4xl font-serif font-bold text-center mb-10">Réservez votre Voyage</h1>
      
      <form className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Prénom</label>
            <input type="text" className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Nom</label>
            <input type="text" className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 focus:border-brand-gold outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Destination</label>
          <select className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 focus:border-brand-gold outline-none text-white">
            <option>Paris - 1889</option>
            <option>Florence - 1504</option>
            <option>Crétacé - -65M</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Date de départ (Temps présent)</label>
          <input type="date" className="w-full bg-brand-dark border border-white/20 rounded-lg px-4 py-3 focus:border-brand-gold outline-none text-white" />
        </div>

        <button className="w-full bg-brand-gold text-brand-darker font-bold py-4 rounded-lg hover:bg-white transition-colors mt-4">
          Confirmer la pré-réservation
        </button>
      </form>
    </div>
  );
}
