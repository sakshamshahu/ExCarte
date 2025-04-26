const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  auth: {
    createProfile: async (userData: any) => {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to create user profile');
      return response.json();
    },

    createPreferences: async (userId: string, preferences: any) => {
      const response = await fetch(`${API_URL}/auth/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, preferences })
      });
      if (!response.ok) throw new Error('Failed to create user preferences');
      return response.json();
    },

    createProfileWithPreferences: async (userData: any, preferences: any) => {
      const response = await fetch(`${API_URL}/auth/update-profile-and-preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...userData, preferences })
      });
      if (!response.ok) throw new Error('Failed to create user profile with preferences');
      return response.json();
    },

    getProfile: async (authId: string) => {
      const response = await fetch(`${API_URL}/auth/profile/${authId}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch user profile');
      }
      return response.json();
    }
  },

  places: {
    getAll: async (params = {}) => {
      const searchParams = new URLSearchParams(params);
      const response = await fetch(`${API_URL}/places?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch places');
      return response.json();
    },

    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/places/${id}`);
      if (!response.ok) throw new Error('Failed to fetch place');
      return response.json();
    },

    getHeatmap: async (params = {}) => {
      const searchParams = new URLSearchParams(params);
      const response = await fetch(`${API_URL}/places/heatmap?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch heatmap data');
      return response.json();
    },

    getTotalPages: async (params = {}) => {
      const searchParams = new URLSearchParams(params);
      const response = await fetch(`${API_URL}/places/pages?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch pages');
      return response.json();
    }
  },

  users: {
    getProfile: async (userId: string) => {
      const response = await fetch(`${API_URL}/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user profile');
      return response.json();
    },

    updatePreferences: async (userId: string, preferences: any) => {
      const response = await fetch(`${API_URL}/users/${userId}/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preferences })
      });
      if (!response.ok) throw new Error('Failed to update preferences');
      return response.json();
    },

    getFavorites: async (userId: string) => {
      const response = await fetch(`${API_URL}/users/${userId}/favorites`);
      if (!response.ok) throw new Error('Failed to fetch favorites');
      return response.json();
    },

    getReviews: async (userId: string) => {
      const response = await fetch(`${API_URL}/users/${userId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    }
  },

  reviews: {
    getForPlace: async (placeId: string) => {
      const response = await fetch(`${API_URL}/reviews/place/${placeId}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },

    getForUser: async (userId: string) => {
      const response = await fetch(`${API_URL}/users/${userId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch user reviews');
      return response.json();
    },

    create: async (data: any) => {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create review');
      return response.json();
    },

    update: async (userId: string, placeId: string, data: any) => {
      const response = await fetch(`${API_URL}/reviews/${userId}/${placeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update review');
      return response.json();
    },

    delete: async (userId: string, placeId: string)  => {
      const response = await fetch(`${API_URL}/reviews/${userId}/${placeId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete review');
      return response.json();
    }
  }
};