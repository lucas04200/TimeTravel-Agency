import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroVideo({ 
  videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4", 
  title = "Voyagez à travers l'Histoire",
  subtitle = "L'expérience temporelle ultime commence ici.",
  children
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Effet Parallaxe : Le contenu bouge à des vitesses différentes
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      
      {/* Vidéo d'arrière-plan avec Parallaxe */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-110" // Scale pour éviter les bords blancs lors du scroll
          poster="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000" // Image de fond de secours
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay sombre (réduit à 30%) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-darker z-20" /> {/* Fondu vers le bas */}
        
        {/* Grain effet cinéma (optionnel, ajoute de la texture) */}
        <div className="absolute inset-0 opacity-[0.05] z-30 pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </motion.div>

      {/* Contenu Textuel Animé */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-30 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-brand-gold font-light tracking-wide mb-8">
            {subtitle}
          </p>
          {children}
        </motion.div>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-30 animate-bounce text-white/50"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </div>
  );
}