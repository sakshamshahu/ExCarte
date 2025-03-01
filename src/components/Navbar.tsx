import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { Map } from 'lucide-react';
import UserMenu from './UserMenu';
import { motion } from 'framer-motion';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { api } from '../lib/api';
import Spinner from './Spinner';

const Navbar = () => {
  const { user, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Try to get user profile from API
          const profile = await api.auth.getProfile(firebaseUser.uid);
          
          if (profile) {
            // User exists in database
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: `${profile.first_name} ${profile.last_name}`,
              preferences: profile.preferences.reduce((acc, pref) => {
                acc[pref.category] = pref.interest_level;
                return acc;
              }, {}),
              favorites: []
            });
          } else {
            // New user, just set basic info
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'User',
              preferences: {},
              favorites: []
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to basic info
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            preferences: {},
            favorites: []
          });
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className="flex items-center">
              <Map className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ExCarte</span>
            </Link>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <Spinner size="sm" className="text-indigo-600" />
            ) : user ? (
              <>
                <Link
                  to="/explore"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Explore
                </Link>
                <UserMenu user={user} />
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;