import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import Card from "../components/Card";

const Recommendations = () => {
  const { selectedMovie, recommendations, loading } = useContext(MovieContext);

  // Log selected movie with ID
  if (recommendations.selected_title && recommendations.selected_id) {
    console.log("Selected movie:", { title: recommendations.selected_title, id: recommendations.selected_id });
  }
  // Log recommended movies with IDs
  if (recommendations.movies && recommendations.movie_ids) {
    const recommended = recommendations.movies.map((title, i) => ({ title, id: recommendations.movie_ids[i] }));
    console.log("Recommended movies:", recommended);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading recommendations...</div>
      </div>
    );
  }

  // ✅ Handle no data or bad data
  if (
    !selectedMovie ||
    !recommendations.movies ||
    !recommendations.posters ||
    recommendations.movies.length === 0 

    ) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h2 className="text-xl">No recommendations available. Go back and choose a movie.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Selected movie</h1>
      <div className="mb-8">
        <Card
          image={recommendations.posters && recommendations.posters[0] ? recommendations.posters[0] : "https://via.placeholder.com/200x300?text=No+Image"}
          title={`${recommendations.selected_title || selectedMovie}`}
        />
      </div>
      <h1 className="text-xl font-semibold mb-4">Recommendations</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {Array.isArray(recommendations.movies) &&
          recommendations.movies.slice(1).map((title, i) => {
            const posterIndex = i + 1;
            let posterUrl = "https://via.placeholder.com/200x300?text=No+Image";
            if (
              recommendations.posters &&
              Array.isArray(recommendations.posters) &&
              recommendations.posters[posterIndex]
            ) {
              posterUrl = recommendations.posters[posterIndex];
            }
            return (
              <Card
                key={posterIndex}
                image={posterUrl}
                title={title}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Recommendations;
