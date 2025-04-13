import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProfileDropdownProps {
  user: any;
  onLogin: () => void;
  onSignup: () => void;
}

export function ProfileDropdown({ user, onLogin, onSignup }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-custom-medium text-white hover:bg-custom-dark"
      >
        {user ? (
          <span className="text-sm font-semibold">
            {user.user_metadata?.name?.[0]?.toUpperCase() || 'A'}
          </span>
        ) : (
          <User className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {user ? (
            <>
              <div className="px-4 py-2 text-sm text-custom-dark border-b">
                <div className="font-medium">{user.user_metadata?.name}</div>
                <div className="text-custom-medium truncate">{user.email}</div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm text-custom-dark hover:bg-custom-lightest"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  onLogin();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-custom-dark hover:bg-custom-lightest"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  onSignup();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-custom-dark hover:bg-custom-lightest"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}