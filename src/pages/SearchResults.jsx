import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid/MovieGrid";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_URL = "https://api.themoviedb.org/3";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(`Failed to load search results. ${err.message}`);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <p>Loading search results....</p>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>No movies found for "{query}"</p>
      </div>
    );
  }

  return (
    <div>
      <MovieGrid
        title={`Search Results for "${query}"`}
        movies={movies}
        category="search"
      />
    </div>
  );
};

export default SearchResults;
