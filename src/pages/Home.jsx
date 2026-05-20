import { useEffect, useState } from "react";
import CallToAction from "../components/HeroBanner/CallToAction";
import MovieGrid from "../components/MovieGrid/MovieGrid";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const [popularRes, topRatedRes] = await Promise.all([
          fetch(
            `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
          ),
          fetch(
            `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
          ),
        ]);

        const [popularData, topRatedData] = await Promise.all([
          popularRes.json(),
          topRatedRes.json(),
        ]);

        setPopularMovies(popularData.results || []);
        setTopRated(topRatedData.results || []);
      } catch (err) {
        setError(`Failed to load movies. Please try again later.${err}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

  if (loading) {
    return <p>Loading Movies....</p>;
  }
  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div>
      <CallToAction />
      <MovieGrid
        title="Popular Movies"
        movies={popularMovies}
        category="popular"
      />
      <MovieGrid title="Top Rated" movies={topRated} category="top_rated" />
    </div>
  );
};

export default Home;
