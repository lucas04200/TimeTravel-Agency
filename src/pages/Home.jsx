import React, { useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { destinations } from '../destinations';
import QuizModal from '../components/QuizModal';
import HeroVideo from '../components/HeroVideo';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <>
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      {/* Hero Section */}
      <HeroVideo
        videoSrc="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
        title={
          <>
            Le temps est votre <br/>
            <span className="text-brand-gold">nouvelle destination</span>
          </>
        }
        subtitle="Explorez Paris en 1889, flânez dans Florence en 1504 ou survivez au Crétacé. L'histoire n'attend que vous."
      >
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="#destinations" className="bg-brand-gold text-brand-darker px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 flex items-center justify-center gap-2">
              Choisir une époque <ChevronRight className="w-5 h-5" />
            </a>
            <button 
              onClick={() => setIsQuizOpen(true)}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-darker transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Trouver mon voyage
            </button>
        </div>
      </HeroVideo>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Nos Voyages Temporels</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
          <p className="mt-4 text-gray-400">Sélectionnez votre prochaine aventure historique</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <motion.div key={dest.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="group bg-brand-dark border border-white/10 rounded-2xl overflow-hidden hover:border-brand-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10">
              <div className="relative h-64 overflow-hidden">
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-brand-darker/80 backdrop-blur px-3 py-1 rounded-full border border-brand-gold/30">
                  <span className="text-brand-gold font-bold">{dest.year}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {dest.tags.map(tag => (<span key={tag} className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded">{tag}</span>))}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-brand-gold transition-colors">{dest.title}</h3>
                <p className="text-gray-400 mb-6 line-clamp-2">{dest.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-white">{dest.price}</span>
                  <Link to={`/destination/${dest.id}`} className="text-brand-gold hover:text-white font-medium flex items-center gap-1 transition-colors">
                    Explorer <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
