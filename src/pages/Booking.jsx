import React, { useState } from 'react';
import { Calendar, Users, MapPin, CheckCircle } from 'lucide-react';
import { destinations } from '../destinations';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
    date: '',
    travelers: 1
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pourriez ajouter la logique d'envoi vers une API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto text-center">
        <div className="bg-brand-dark border border-brand-gold/20 rounded-2xl p-12 max-w-2xl mx-auto animate-fade-in">
          <CheckCircle className="w-16 h-16 text-brand-gold mx-auto mb-6" />
          <h2 className="text-3xl font-serif text-brand-gold mb-4">Réservation Confirmée</h2>
          <p className="text-gray-300 mb-8">
            Votre demande de voyage temporel a bien été reçue. Nos agents vont vérifier les disponibilités du continuum espace-temps et vous contacteront sous peu.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-brand-gold hover:text-white underline"
          >
            Effectuer une autre réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-serif text-brand-gold mb-8 text-center">Réserver votre Voyage</h1>
      
      <div className="max-w-2xl mx-auto bg-brand-dark border border-white/10 rounded-2xl p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold" /> Destination
            </label>
            <select 
              required
              className="w-full bg-brand-darker border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none appearance-none"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
            >
              <option value="">Sélectionnez une époque...</option>
              {destinations.map(dest => (
                <option key={dest.id} value={dest.title}>
                  {dest.title} ({dest.year}) - {dest.price}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Travelers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-gold" /> Date de départ
              </label>
              <input 
                type="date" 
                required
                className="w-full bg-brand-darker border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-gold" /> Voyageurs
              </label>
              <input 
                type="number" 
                min="1" 
                max="10"
                required
                className="w-full bg-brand-darker border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                value={formData.travelers}
                onChange={(e) => setFormData({...formData, travelers: e.target.value})}
              />
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Votre Nom"
              required
              className="w-full bg-brand-darker border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Votre Email"
              required
              className="w-full bg-brand-darker border border-white/20 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-gold text-brand-darker font-bold py-4 rounded-lg hover:bg-white transition-all transform hover:scale-[1.02]"
          >
            Confirmer la réservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;