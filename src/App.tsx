import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DirectChat from './pages/DirectChat';
import ChatbotGenerator from './pages/ChatbotGenerator';
import LandingPage from './pages/LandingPage';
import { AuthModal } from './components/AuthModal';
import { ProfileDropdown } from './components/ProfileDropdown';
import { supabase } from './lib/supabase';
import weblaveLogo from './components/images/weblave_new.png';

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

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
        <nav className="fixed top-0 left-0 right-0 bg-[#0B2E33] z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center">
                  <img 
                    src={weblaveLogo}
                    alt="Weblave Logo" 
                    className="h-12 w-auto"
                  />
                </Link>
                <Link
                  to="/"
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/direct-chat"
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Direct Chat
                </Link>
                <Link
                  to="/chatbot-generator"
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Chatbot Generator
                </Link>
              </div>

              <div className="flex items-center space-x-4">
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