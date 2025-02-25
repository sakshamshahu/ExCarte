import { create } from 'zustand';
import { User, Place, UserPreferences } from '../types';

interface AppState {
  user: User | null;
  places: Place[];
  selectedPlace: Place | null;
  userPreferences: UserPreferences;
  setUser: (user: User | null) => void;
  setPlaces: (places: Place[]) => void;
  setSelectedPlace: (place: Place | null) => void;
  setUserPreferences: (preferences: UserPreferences) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  places: [],
  selectedPlace: null,
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
}));