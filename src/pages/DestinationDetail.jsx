import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinations } from '../destinations';
import { ArrowLeft, Calendar, MapPin, Star } from 'lucide-react';

export default function DestinationDetail() {
  const { id } = useParams();
  const destination = destinations.find(d => d.id === parseInt(id));

  if (!destination) return <div className="pt-32 text-center">Destination introuvable</div>;

  return (
    <div className="pt-20 min-h-screen bg-brand-darker">
      <div className="relative h-[50vh]">
        <img src={destination.image} alt={destination.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 max-w-7xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center text-gray-300 hover:text-brand-gold mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Link>
          <h1 className="text-5xl font-serif font-bold text-white mb-2">{destination.title}</h1>
          <div className="flex items-center gap-4 text-brand-gold">
            <span className="flex items-center gap-1"><Calendar className="w-5 h-5" /> {destination.year}</span>
            <span className="flex items-center gap-1"><Star className="w-5 h-5" /> Luxe & Histoire</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-serif font-bold text-brand-gold">À propos du voyage</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{destination.description}</p>
            <p className="text-gray-400">
              Plongez dans une immersion totale. Nos experts historiques ont reconstitué chaque détail pour vous offrir une expérience authentique et sécurisée.
              Le costume d'époque est fourni, ainsi que la monnaie locale.
            </p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 h-fit">
            <h3 className="text-xl font-bold mb-4">Réserver ce voyage</h3>
            <div className="text-3xl font-bold text-brand-gold mb-6">{destination.price}</div>
            <ul className="space-y-3 mb-8 text-sm text-gray-400">
              <li className="flex gap-2">✓ Assurance Temporelle incluse</li>
              <li className="flex gap-2">✓ Guide expert dédié</li>
              <li className="flex gap-2">✓ Pension complète</li>
            </ul>
            <Link to="/reservation" className="block w-full bg-brand-gold text-brand-darker text-center py-3 rounded-lg font-bold hover:bg-white transition-colors">Réserver maintenant</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
