import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Coffee, Music, ShoppingBag } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Discover Your Perfect Spot in</span>
            <span className="block text-indigo-600">Dehradun & Chandigarh</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            New to town? Let us guide you to the perfect places based on your interests.
            From cozy cafes to vibrant nightlife, we've got you covered.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <button
              onClick={() => navigate('/explore')}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Start Exploring
            </button>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            What interests you?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <Coffee className="h-12 w-12 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Cafes & Restaurants</h3>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <Music className="h-12 w-12 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Nightlife & Entertainment</h3>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <ShoppingBag className="h-12 w-12 text-indigo-600 mx-auto" />
              <h3 className="mt-4 text-xl font-medium text-gray-900 text-center">Shopping & Markets</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;