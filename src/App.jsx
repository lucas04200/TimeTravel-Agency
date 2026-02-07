import React, { useState } from 'react';
import { Clock, MapPin, Calendar, MessageCircle, ChevronRight, Star } from 'lucide-react';

// Données des destinations (Phase 1.1)
const destinations = [
  {
    id: 1,
    title: "Paris - Belle Époque",
    year: "1889",
    description: "Vivez l'inauguration de la Tour Eiffel et l'effervescence de l'Exposition Universelle.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000", // Placeholder
    price: "2,500 ₮",
    tags: ["Culture", "Histoire", "Romantisme"]
  },
  {
    id: 2,
    title: "Florence - Renaissance",
    year: "1504",
    description: "Rencontrez Michel-Ange et Léonard de Vinci au cœur du berceau de l'art italien.",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&q=80&w=1000", // Placeholder
    price: "3,200 ₮",
    tags: ["Art", "Architecture", "Politique"]
  },
  {
    id: 3,
    title: "Crétacé Supérieur",
    year: "-65M",
    description: "Une aventure sauvage au milieu des géants. Observez les Tricératops dans leur habitat naturel.",
    image: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=1000", // Placeholder
    price: "4,500 ₮",
    tags: ["Nature", "Aventure", "Dinosaures"]
  }
];

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-darker text-white font-sans selection:bg-brand-gold selection:text-brand-darker">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-brand-darker/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-brand-gold" />
              <span className="text-xl font-bold font-serif tracking-wider">TimeTravel Agency</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#destinations" className="hover:text-brand-gold transition-colors px-3 py-2 rounded-md text-sm font-medium">Destinations</a>
                <a href="#about" className="hover:text-brand-gold transition-colors px-3 py-2 rounded-md text-sm font-medium">L'Agence</a>
                <button className="bg-brand-gold text-brand-darker px-4 py-2 rounded-full font-bold hover:bg-white transition-colors">
                  Réserver
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/50 via-brand-darker/50 to-brand-darker z-10"></div>
        {/* Image de fond (à remplacer par vidéo plus tard) */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000" 
                alt="Space Time" 
                className="w-full h-full object-cover opacity-60"
            />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Le temps est votre <br/>
            <span className="text-brand-gold">nouvelle destination</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Explorez Paris en 1889, flânez dans Florence en 1504 ou survivez au Crétacé. 
            L'histoire n'attend que vous.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#destinations" className="bg-brand-gold text-brand-darker px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Choisir une époque <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Nos Voyages Temporels</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          <p className="mt-4 text-gray-400">Sélectionnez votre prochaine aventure historique</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="group bg-brand-dark border border-white/10 rounded-2xl overflow-hidden hover:border-brand-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-brand-darker/80 backdrop-blur px-3 py-1 rounded-full border border-brand-gold/30">
                  <span className="text-brand-gold font-bold">{dest.year}</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {dest.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-brand-gold transition-colors">{dest.title}</h3>
                <p className="text-gray-400 mb-6 line-clamp-2">{dest.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-white">{dest.price}</span>
                  <button className="text-brand-gold hover:text-white font-medium flex items-center gap-1 transition-colors">
                    Explorer <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Widget (UI Only for Phase 2) */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-brand-gold text-brand-darker p-4 rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-110 animate-bounce-slow"
          >
            <MessageCircle className="w-8 h-8" />
          </button>
        )}

        {isChatOpen && (
          <div className="bg-brand-dark border border-white/10 rounded-2xl shadow-2xl w-80 md:w-96 overflow-hidden flex flex-col h-[500px]">
            <div className="bg-brand-gold/10 p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-brand-gold">TimeTravel Assistant</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">×</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-white/5 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">Bonjour ! Je suis votre guide temporel. Souhaitez-vous des informations sur Paris 1889, Florence 1504 ou le Crétacé ?</p>
              </div>
            </div>
            <div className="p-4 border-t border-white/10">
              <input type="text" placeholder="Posez votre question..." className="w-full bg-brand-darker border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-gold" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;