export interface UserPreferences {
  nightlife: boolean;
  coffee: boolean;
  outdoor: boolean;
  shopping: boolean;
  dining: boolean;
  culture: boolean;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  average_rating: number;
  total_reviews: number;
  latitude: number;
  longitude: number;
  address: string;
  images: string[];
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
  favorites: string[];
}

export interface Review {
  id: string;
  placeId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}