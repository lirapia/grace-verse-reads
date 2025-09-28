import { FavoriteVerse } from '@/types/bible';

const FAVORITES_KEY = 'openbible-favorites';

export const getFavorites = (): FavoriteVerse[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const addToFavorites = (verse: Omit<FavoriteVerse, 'savedAt'>): boolean => {
  try {
    const favorites = getFavorites();
    const reference = verse.reference;
    
    // Check if already exists
    if (favorites.some(fav => fav.reference === reference)) {
      return false; // Already in favorites
    }
    
    const newFavorite: FavoriteVerse = {
      ...verse,
      savedAt: new Date().toISOString()
    };
    
    const updatedFavorites = [newFavorite, ...favorites];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true; // Successfully added
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

export const removeFromFavorites = (reference: string): boolean => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.reference !== reference);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

export const isFavorite = (reference: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(fav => fav.reference === reference);
};