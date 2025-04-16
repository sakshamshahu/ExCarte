import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import PlaceReviews from './pages/PlaceReviews';
import UserReviews from './pages/UserReviews';

function App() {

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        console.log(navigator.userAgent);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  
  React.useEffect(() => {
    getLocation();
  }, []);
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/place/:id/reviews" element={<PlaceReviews />} />
          <Route path="/user/reviews" element={<UserReviews />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;