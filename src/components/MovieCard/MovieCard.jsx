import { useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./MovieCard.module.scss";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.some((fav) => fav.id === movie.id);
  });

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
    if (onFavoriteToggle) onFavoriteToggle();
  };

  return (
    <div className="movie-card">
      <FaHeart
        onClick={handleFavoriteClick}
        className={`add-to-favorite ${isFavorite ? "favorite-active" : ""}`}
      />
      <Link to={`/movie/${movie.id}`}>
        <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title} />
      </Link>
      <div className="card-content">
        <h3>{movie.title}</h3>
        <div className="release-date">
          <p>{movie.release_date}</p>
          <p>
            <FaStar />
            <span>{movie.vote_average.toFixed(1)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
