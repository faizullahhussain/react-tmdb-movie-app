import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_URL = "https://api.themoviedb.org/3";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState("true");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const resonse = await fetch(
          `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        );
        const movieData = await resonse.json();
        setMovies(movieData.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="main-title">Popular Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.div} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movie;
