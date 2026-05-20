import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
        );
        const data = await res.json();

        setMovies(data.results || []);
      } catch (err) {
        setError(`Failed to load movies. Please try again later.${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading Movies....</p>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="main-title">Top Rated Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
