import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    const movieData = async () => {
      const res = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();

      setMovieDetail(data);
    };
    movieData();
  }, [id]);

  return (
    <div className="movie-details-wrapper">
      <div
        className="backdrop-banner"
        style={{
          backgroundImage: movieDetail.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`
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
          <h1>{movieDetail?.title}</h1>

          <p className="rating">
            {movieDetail?.vote_average
              ? Number(movieDetail.vote_average).toFixed(1)
              : "0.0"}{" "}
            /10 <FaStar />
          </p>

          <h3 className="movie-overview">Overview</h3>

          <p className="overview-text">{movieDetail?.overview}</p>

          <div className="buttons-group">
            <button className="watch-trailer-btn">Watch Trailer</button>
            <button className="add-favorite-btn">
              <FaHeart /> Add to Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
