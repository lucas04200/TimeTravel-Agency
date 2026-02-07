import React, { useState, useRef, useEffect } from 'react';
import { Clock, MessageCircle, Send, Loader2 } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Agency from './pages/Agency';
import Booking from './pages/Booking';
import DestinationDetail from './pages/DestinationDetail';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis votre guide temporel. Souhaitez-vous des informations sur Paris 1889, Florence 1504 ou le Crétacé ?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll vers le bas du chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    // Ajout du message utilisateur
    const newUserMsg = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
      
      if (!apiKey) {
        throw new Error("Clé API manquante. Vérifiez votre fichier .env");
      }

      // Préparation de l'historique pour l'API (Phase 3.1 - Contexte)
      const historyForApi = messages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Ajout du nouveau message utilisateur
      historyForApi.push({ role: "user", content: userText });

      // Appel API Mistral
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
         method: 'POST',
         headers: { 
           'Content-Type': 'application/json', 
           'Authorization': `Bearer ${apiKey}` 
         },
         body: JSON.stringify({ 
           model: "mistral-tiny", 
           messages: [
             {
               role: "system",
               content: "Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe. Ton ton est professionnel, chaleureux et passionné d'histoire. Tu connais parfaitement Paris 1889, Florence 1504 et le Crétacé -65M. Tes réponses doivent être concises (max 3 phrases). Si on te demande des prix, invente des tarifs en ₮ (TimeCoins) cohérents."
             },
             ...historyForApi
           ] 
         })
      });

      if (!response.ok) throw new Error("Erreur API Mistral");

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error("Erreur chatbot:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
    <div className="min-h-screen bg-brand-darker text-white font-sans selection:bg-brand-gold selection:text-brand-darker">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-brand-darker/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-brand-gold" />
              <Link to="/" className="text-xl font-bold font-serif tracking-wider">TimeTravel Agency</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="hover:text-brand-gold transition-colors px-3 py-2 rounded-md text-sm font-medium">Accueil</Link>
                <Link to="/agence" className="hover:text-brand-gold transition-colors px-3 py-2 rounded-md text-sm font-medium">L'Agence</Link>
                <Link to="/reservation" className="bg-brand-gold text-brand-darker px-4 py-2 rounded-full font-bold hover:bg-white transition-colors">
                  Réserver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agence" element={<Agency />} />
        <Route path="/reservation" element={<Booking />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
      </Routes>

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
            
            {/* Zone de messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-brand-darker/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-[80%] text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-brand-gold text-brand-darker rounded-tr-none font-medium' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-200 p-3 rounded-lg rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-xs">Analyse temporelle...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Zone */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex gap-2 bg-brand-dark">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question..." 
                disabled={isLoading}
                className="flex-1 bg-brand-darker border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-gold text-white placeholder-gray-500 disabled:opacity-50" 
              />
              <button type="submit" disabled={isLoading} className="bg-brand-gold text-brand-darker p-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
    </Router>
  );
}

export default App;