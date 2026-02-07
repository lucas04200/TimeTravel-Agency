import React from 'react';

export default function Agency() {
  return (
    <div className="pt-32 px-4 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-5xl font-serif font-bold text-brand-gold mb-8 text-center">L'Agence TimeTravel</h1>
      
      <div className="space-y-12">
        <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Depuis 2054, TimeTravel Agency repousse les limites de l'exploration humaine. 
            Nous ne vendons pas de simples vacances, nous offrons l'éternité. 
            Notre technologie de saut quantique sécurisé permet de visiter le passé sans altérer le continuum espace-temps.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-brand-dark p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold text-brand-gold mb-2">Sécurité Absolue</h3>
            <p className="text-gray-400">Protocoles de protection paradoxale de classe 5.</p>
          </div>
          <div className="bg-brand-dark p-6 rounded-xl border border-white/5">
            <h3 className="text-xl font-bold text-brand-gold mb-2">Luxe Intemporel</h3>
            <p className="text-gray-400">Hébergements d'époque avec le confort moderne invisible.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
