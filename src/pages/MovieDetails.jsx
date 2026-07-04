import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovieDetail(data);

        // Check if movie is already in favorites
        const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(saved.some((m) => m.id === data.id));
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  // 2. Toggle Favorite Logic
  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = saved.filter((m) => m.id !== movieDetail.id);
    } else {
      updatedFavorites = [...saved, movieDetail];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!movieDetail) return <div>Loading...</div>;

  return (
    <div className="movie-details-wrapper">
      <div
        className="backdrop-banner"
        style={{
          backgroundImage: movieDetail.backdrop_path
            ? `url(${BACKDROP_URL}${movieDetail.backdrop_path})`
            : "none",
        }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <div className="movie-details-content">
        <div className="poster-aside">
          <img
            src={`${IMG_URL}${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
        </div>

        <div className="movie-content">
          <h1>{movieDetail.title}</h1>
          <p className="rating">
            {movieDetail.vote_average?.toFixed(1) || "0.0"} /10 <FaStar />
          </p>

          <h3 className="movie-overview">Overview</h3>
          <p className="overview-text">{movieDetail.overview}</p>

          <div className="buttons-group">
            <button className="watch-trailer-btn">Watch Trailer</button>
            <button
              className="add-favorite-btn"
              onClick={toggleFavorite}
              style={{ color: isFavorite ? "#e11d48" : "inherit" }}
            >
              <FaHeart />{" "}
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
