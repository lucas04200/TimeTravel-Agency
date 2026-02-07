import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { destinations } from '../destinations';

const questions = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { text: "Culturelle et artistique", points: { 2: 3, 1: 1 } }, // Florence ++, Paris +
      { text: "Aventure et nature", points: { 3: 3 } }, // Crétacé +++
      { text: "Élégance et raffinement", points: { 1: 3 } } // Paris +++
    ]
  },
  {
    id: 2,
    question: "Votre période préférée ?",
    options: [
      { text: "Histoire moderne (XIXe-XXe siècle)", points: { 1: 3 } },
      { text: "Temps anciens et origines", points: { 3: 3 } },
      { text: "Renaissance et classicisme", points: { 2: 3 } }
    ]
  },
  {
    id: 3,
    question: "Vous préférez :",
    options: [
      { text: "L'effervescence urbaine", points: { 1: 3 } },
      { text: "La nature sauvage", points: { 3: 3 } },
      { text: "L'art et l'architecture", points: { 2: 3 } }
    ]
  },
  {
    id: 4,
    question: "Votre activité idéale :",
    options: [
      { text: "Visiter des monuments", points: { 1: 2, 2: 1 } },
      { text: "Observer la faune", points: { 3: 3 } },
      { text: "Explorer des musées", points: { 2: 3, 1: 1 } }
    ]
  },
];

export default function QuizModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ 1: 0, 2: 0, 3: 0 });
  const [result, setResult] = useState(null);

  const handleAnswer = (points) => {
    const newScores = { ...scores };
    Object.keys(points).forEach(destId => {
      newScores[destId] = (newScores[destId] || 0) + points[destId];
    });
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores) => {
    // Trouve l'ID avec le score le plus élevé
    const winnerId = Object.keys(finalScores).reduce((a, b) => finalScores[a] > finalScores[b] ? a : b);
    const destination = destinations.find(d => d.id === parseInt(winnerId));
    setResult(destination);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ 1: 0, 2: 0, 3: 0 });
    setResult(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-brand-dark border border-brand-gold/30 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        {!result ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between text-sm text-brand-gold mb-2">
                <span>Question {currentStep + 1}/{questions.length}</span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-gold transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold mb-6 min-h-[64px]">
              {questions[currentStep].question}
            </h3>

            <div className="space-y-3">
              {questions[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.points)}
                  className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-brand-gold hover:text-brand-darker border border-white/10 transition-all duration-200 flex items-center justify-between group"
                >
                  <span>{option.text}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="inline-block p-3 rounded-full bg-brand-gold/20 text-brand-gold mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl text-gray-300 mb-2">Votre destination idéale est...</h3>
            <h2 className="text-3xl font-serif font-bold text-brand-gold mb-6">{result.title}</h2>
            
            <div className="rounded-xl overflow-hidden mb-6 border border-white/20">
              <img src={result.image} alt={result.title} className="w-full h-48 object-cover" />
            </div>

            <p className="text-gray-300 mb-8 text-sm leading-relaxed">
              {result.description}
              <br/><br/>
              <span className="text-brand-gold italic">"Un choix excellent pour votre profil de voyageur temporel."</span>
            </p>

            <div className="flex gap-3">
              <button onClick={resetQuiz} className="flex-1 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Recommencer
              </button>
              <Link to={`/destination/${result.id}`} onClick={onClose} className="flex-1 py-3 rounded-lg bg-brand-gold text-brand-darker font-bold hover:bg-white transition-colors flex items-center justify-center gap-2">
                Voir les détails <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
