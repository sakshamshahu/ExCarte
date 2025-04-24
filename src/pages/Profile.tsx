import React from 'react';
import { useStore } from '../store';
import { Settings, Heart, Star } from 'lucide-react';

const Profile = () => {
  const { user, userPreferences, setUserPreferences } = useStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Please sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  const togglePreference = (key: keyof typeof userPreferences) => {
    setUserPreferences({
      ...userPreferences,
      [key]: !userPreferences[key]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl font-semibold text-indigo-600">
                {user.name[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Preferences</h3>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(userPreferences).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => togglePreference(key as keyof typeof userPreferences)}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    value ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {key}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full ${
                      value ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Favorites</h3>
            </div>
            {user.favorites.length === 0 ? (
              <p className="mt-4 text-gray-500">No favorites yet</p>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4">
                {/* Favorites list would go here */}
              </div>
            )}
          </div>

          <div className="mt-8">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-gray-400" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Your Reviews</h3>
            </div>
            <p className="mt-4 text-gray-500">No reviews yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;