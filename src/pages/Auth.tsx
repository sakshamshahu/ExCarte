import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile
} from 'firebase/auth';
import { Lock, Mail, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Onboarding from '../components/Onboarding';
import Spinner from '../components/Spinner';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast.error('Authentication is not configured');
      return;
    }
    
    setIsLoading(true);
    try {
      if (isSignUp) {
        if (!firstName || !lastName) {
          toast.error('Please enter your full name');
          return;
        }
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`
        });
        setShowOnboarding(true);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!auth) return;
    setSocialLoading('google');
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        setShowOnboarding(true);
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error('Google sign in failed');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleGithubAuth = async () => {
    if (!auth) return;
    setSocialLoading('github');
    try {
      const provider = new GithubAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        setShowOnboarding(true);
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error('GitHub sign in failed');
    } finally {
      setSocialLoading(null);
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Authentication is not configured</h2>
          <p className="mt-2 text-gray-600">Please set up Firebase configuration in your environment variables.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleEmailAuth}>
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required={isSignUp}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required={isSignUp}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Spinner size="sm" className="text-white" />
                  ) : (
                    isSignUp ? 'Sign up' : 'Sign in'
                  )}
                </button>
              </motion.div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: socialLoading === 'google' ? 1 : 1.02 }}
                  whileTap={{ scale: socialLoading === 'google' ? 1 : 0.98 }}
                  onClick={handleGoogleAuth}
                  disabled={!!socialLoading}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === 'google' ? (
                    <Spinner size="sm" className="text-gray-700" />
                  ) : (
                    <>
                      <img
                        className="h-5 w-5"
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                      />
                      <span className="ml-2">Google</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: socialLoading === 'github' ? 1 : 1.02 }}
                  whileTap={{ scale: socialLoading === 'github' ? 1 : 0.98 }}
                  onClick={handleGithubAuth}
                  disabled={!!socialLoading}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === 'github' ? (
                    <Spinner size="sm" className="text-gray-700" />
                  ) : (
                    <>
                      <Github className="h-5 w-5" />
                      <span className="ml-2">GitHub</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFirstName('');
                  setLastName('');
                  setEmail('');
                  setPassword('');
                }}
                disabled={isLoading || !!socialLoading}
                className="w-full text-center text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {showOnboarding && (
        <Onboarding onComplete={() => {
          setShowOnboarding(false);
          navigate('/');
        }} />
      )}
    </>
  );
};

export default Auth;