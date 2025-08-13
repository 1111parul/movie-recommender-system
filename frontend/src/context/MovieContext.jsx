import { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [recommendations, setRecommendations] = useState({ movies: [], posters: [] });
  const [loading, setLoading] = useState(false);

  return (
    <MovieContext.Provider value={{
      selectedMovie, setSelectedMovie,
      recommendations, setRecommendations,
      loading, setLoading
    }}>
      {children}
    </MovieContext.Provider>
  );
};
