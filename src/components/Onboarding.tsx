import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { useStore } from '../store';
import { Coffee, Moon, Sun, ShoppingBag, Utensils, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

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

type PreferenceCategory = 'coffee' | 'nightlife' | 'outdoor' | 'shopping' | 'dining' | 'culture';


const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    explorerType: 'both',
    preferences: {
      coffee: 0,
      nightlife: 0,
      outdoor: 0,
      shopping: 0,
      dining: 0,
      culture: 0,
    },
  });

  const { user } = useStore();
  const [ userData, setUserData ] : any = useState(user);
  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handlePreferenceChange = (category: PreferenceCategory, value: number) => {
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
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert([
          {
            auth_id: userData.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            birth_date: formData.birthDate,
            explorer_type: formData.explorerType,
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      // Create user preferences
      const preferencesData = Object.entries(formData.preferences).map(([category, level]) => ({
        user_id: userData.id,
        category,
        interest_level: level,
      }));

      const { error: prefError } = await supabase
        .from('user_preferences')
        .insert(preferencesData);

      if (prefError) throw prefError;

      setUserData({
        ...user,
        name: `${formData.firstName} ${formData.lastName}`,
        preferences: formData.preferences,
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
                <h2 className="text-2xl font-bold mb-4">Welcome to ExCarte!</h2>
                <p className="mb-8">Let's get to know you better.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Preferences</h2>
                <p className="mb-8">Tell us what you like.</p>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handlePreferenceChange(category.id as PreferenceCategory, formData.preferences[category.id as PreferenceCategory] === 1 ? 0 : 1)}
                      className={`flex items-center p-4 border rounded-lg shadow-sm ${
                        formData.preferences[category.id as PreferenceCategory] ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300'
                      }`}
                    >
                      <category.icon className="w-6 h-6 mr-2" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Review Your Information</h2>
                <p className="mb-8">Make sure everything looks good.</p>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  <p>Name: {formData.firstName} {formData.lastName}</p>
                  <p>Birth Date: {format(new Date(formData.birthDate), 'MMMM dd, yyyy')}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Preferences</h3>
                  <ul>
                    {categories.map((category) => (
                      <li key={category.id}>
                        {category.name}: {formData.preferences[category.id as PreferenceCategory] ? 'Liked' : 'Not Liked'}
                      </li>
                    ))}
                  </ul>
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
            disabled={isLoading}
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