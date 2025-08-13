import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setSelectedMovie, setRecommendations, loading, setLoading } = useContext(MovieContext);
  const [movieList, setMovieList] = useState([]);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setMovieList(data.movies))
      .catch(console.error);
  }, []);

  const handleRecommend = () => {
    if (!selected) return;
    setLoading(true);
    setSelectedMovie(selected);
    navigate("/recommendations");
    fetch(`http://localhost:5000/recommend?movie=${encodeURIComponent(selected)}`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendations({
          selected_title: data.selected_title,
          selected_id: data.selected_id,
          movies: data.movies,
          movie_ids: data.movie_ids,
          posters: data.posters,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-4xl font-bold">Movie Recommendation System</h1>
      <select
        className="w-[300px] p-2 text-black bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
      >
        <option value="">Select a movie</option>
        {Array.isArray(movieList) && movieList.length > 0 ? (
          movieList.map((movie, i) => (
            <option key={i} value={movie}>{movie}</option>
          ))
        ) : (
          <option disabled>No movies found</option>
        )}
      </select>
      <button
        onClick={handleRecommend}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Show Recommendations"}
      </button>
    </div>
  );
};

export default Home;







