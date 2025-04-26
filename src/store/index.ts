import { create } from 'zustand';
import { User, Place, UserPreferences } from '../types';
interface AppState {
  user: User | null;
  places: Place[];
  selectedPlace: Place | null;
  latitude: number | null;
  longitude: number | null;
  userPreferences: UserPreferences;
  setUser: (user: User | null) => void;
  setPlaces: (places: Place[]) => void;
  setSelectedPlace: (place: Place | null) => void;
  setUserPreferences: (preferences: UserPreferences) => void;
  setLocation: (latitude: number | null, longitude: number | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  places: [],
  selectedPlace: null,
  latitude: null,
  longitude: null,
  userPreferences: {
    nightlife: false,
    coffee: false,
    outdoor: false,
    shopping: false,
    dining: false,
    culture: false,
  },
  setUser: (user) => set({ user }),
  setPlaces: (places) => set({ places }),
  setSelectedPlace: (place) => set({ selectedPlace: place }),
  setUserPreferences: (preferences) => set({ userPreferences: preferences }),
  setLocation: (latitude, longitude) => set({ latitude, longitude }),
}));