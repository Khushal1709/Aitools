import React, { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteTools, setFavoriteTools] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("FavoriteTools") || "[]");
    setFavoriteTools(favorites);
  }, []);

  const addToFavorites = (toolName) => {
    const updatedFavorites = [...favoriteTools, toolName];
    setFavoriteTools(updatedFavorites);
    localStorage.setItem("FavoriteTools", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (toolName) => {
    const updatedFavorites = favoriteTools.filter(tool => tool !== toolName);
    setFavoriteTools(updatedFavorites);
    localStorage.setItem("FavoriteTools", JSON.stringify(updatedFavorites));
  };

  const updateFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("FavoriteTools") || "[]");
    setFavoriteTools(favorites);
  };

  const isFavorite = (toolName) => {
    return favoriteTools.includes(toolName);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favoriteTools, 
      addToFavorites, 
      removeFromFavorites, 
      updateFavorites,
      isFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}