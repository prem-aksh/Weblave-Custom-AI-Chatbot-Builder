import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import DirectChat from './pages/DirectChat';
import ChatbotGenerator from './pages/ChatbotGenerator';
import LandingPage from './pages/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ProfileDropdown } from './components/ProfileDropdown';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';
import weblaveLogo from './components/images/weblave_new.png';

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-custom-lightest">
        {/* Navigation */}
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#081f24]/95 shadow-lg shadow-[#081f24]/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-5 sm:gap-8">
                <Link to="/" className="flex items-center">
                  <img 
                    src={weblaveLogo}
                    alt="Weblave Logo" 
                    className="h-12 w-auto"
                  />
                </Link>
                <div className="hidden h-8 w-px bg-white/15 sm:block" />
                <NavLink
                  to="/"
                  className={({ isActive }) => `hidden sm:block px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/direct-chat"
                  className={({ isActive }) => `hidden sm:block px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
                >
                  Direct Chat
                </NavLink>
                <NavLink
                  to="/chatbot-generator"
                  className={({ isActive }) => `hidden sm:block px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
                >
                  Chatbot Generator
                </NavLink>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/direct-chat" className="hidden items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 md:flex">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Try AI <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <ProfileDropdown
                  user={user}
                  onLogin={handleLogin}
                  onSignup={handleSignup}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/direct-chat" element={<DirectChat />} />
            <Route path="/chatbot-generator" element={<ChatbotGenerator />} />
          </Routes>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
        />
      </div>
    </Router>
  );
}

export default App;
