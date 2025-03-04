import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { api } from '../lib/api';
import { useStore } from '../store';
import { Coffee, Moon, Sun, ShoppingBag, Utensils, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { UserPreferences } from '../types';

interface OnboardingProps {
  onComplete: () => void;
}

const categories = [
  { id: 'coffee', name: 'Cafes', icon: Coffee },
  { id: 'nightlife', name: 'Nightlife', icon: Moon },
  { id: 'outdoor', name: 'Outdoor', icon: Sun },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
  { id: 'dining', name: 'Restaurants', icon: Utensils },
  { id: 'culture', name: 'Culture', icon: Palette },
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: format(new Date(), 'yyyy-MM-dd'),
    explorerType: 'both',
    preferences: {} as Record<string, number>,
  });

  const { user, setUser } = useStore();

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePreferenceChange = (category: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!user?.id) return;
    setIsLoading(true);

    try {
      // Create user profile
      const userData = await api.auth.createProfile({
        auth_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        birth_date: formData.birthDate,
        explorer_type: formData.explorerType,
        email: user.email
      });

      // Create user preferences
      await api.auth.createPreferences(
        userData.id,
        formData.preferences
      );

      const preferences: UserPreferences = Object.entries(formData.preferences).reduce((acc, [category, interestLevel]) => ({
        ...acc,
        [category]: (interestLevel > 3)
      }), {
        nightlife: false,
        coffee: false,
        outdoor: false,
        shopping: false,
        dining: false,
        culture: false
      });

      setUser({
        ...user,
        name: `${formData.firstName} ${formData.lastName}`,
        preferences
      });

      toast.success('Profile created successfully!');
      onComplete();
    } catch (error) {
      toast.error('Failed to save profile');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            custom={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome to ExCarte!</h2>
                <p className="mt-2 text-gray-600">Let's set up your profile to get personalized recommendations.</p>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                      Birth Date
                    </label>
                    <input
                      id="birthDate"
                      type="date"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600"
                      value={formData.birthDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">What type of explorer are you?</h2>
                <p className="mt-2 text-gray-600">This helps us tailor recommendations to your preferences.</p>
                
                <div className="mt-6 space-y-4">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${
                      formData.explorerType === 'day_explorer' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, explorerType: 'day_explorer' }))}
                  >
                    <div className="flex items-center">
                      <Sun className="h-6 w-6 text-indigo-600" />
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">Day Explorer</h3>
                        <p className="text-sm text-gray-500">I prefer cafes, shopping, and daytime activities</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${
                      formData.explorerType === 'night_explorer' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, explorerType: 'night_explorer' }))}
                  >
                    <div className="flex items-center">
                      <Moon className="h-6 w-6 text-indigo-600" />
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">Night Explorer</h3>
                        <p className="text-sm text-gray-500">I prefer nightlife, dining, and evening activities</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${
                      formData.explorerType === 'both' 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, explorerType: 'both' }))}
                  >
                    <div className="flex items-center">
                      <div className="flex">
                        <Sun className="h-6 w-6 text-indigo-600" />
                        <Moon className="h-6 w-6 text-indigo-600 ml-1" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">Both</h3>
                        <p className="text-sm text-gray-500">I enjoy exploring at any time of day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900">What are you interested in?</h2>
                <p className="mt-2 text-gray-600">Rate your interest in each category from 1 to 5.</p>
                
                <div className="mt-6 space-y-6">
                  {categories.map(category => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <category.icon className="h-5 w-5 text-indigo-600" />
                          <span className="ml-2 text-gray-900">{category.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {formData.preferences[category.id] || 0}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={formData.preferences[category.id] || 0}
                        onChange={(e) => handlePreferenceChange(category.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Not Interested</span>
                        <span>Very Interested</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(prev => prev - 1)}
            disabled={step === 0 || isLoading}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              step === 0 ? 'invisible' : 'text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            Back
          </button>
          <button
            onClick={step === 2 ? handleSubmit : handleNext}
            disabled={isLoading || (step === 0 && (!formData.firstName || !formData.lastName))}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
          >
            {isLoading ? (
              <Spinner size="sm" className="text-white" />
            ) : (
              step === 2 ? 'Complete' : 'Next'
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;