import { useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const handleFavoriteToggle = () => {
    const updatedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1 className="main-title">My Favorite Movies</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <p>No favorite movies yet. Start adding some!</p>
        </div>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
