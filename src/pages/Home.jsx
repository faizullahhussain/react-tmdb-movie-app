import { useEffect, useState } from "react";
import CallToAction from "../components/HeroBanner/CallToAction";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day"); // 'day' or 'week'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaticRows = async () => {
      try {
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
        setError(`Failed to load base content. ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticRows();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `${API_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&language=en-US&page=1`,
        );
        const data = await res.json();
        setTrendingMovies(data.results || []);
      } catch (err) {
        console.error("Error updating trending movies:", err);
      }
    };

    fetchTrending();
  }, [timeWindow]);

  if (loading) return <p>Loading Movies....</p>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div>
      <CallToAction />

      <div className="trending-header">
        <h2 className="main-title">Trending</h2>
        <div className="toggle-switch">
          <button onClick={() => setTimeWindow("day")} className="toggle-btn">
            <span
              className={`btn-text ${timeWindow === "day" ? "active" : ""}`}
            >
              Today
            </span>

            {timeWindow === "day" && (
              <motion.span
                layoutId="activePill"
                className="active-bg"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>

          <button onClick={() => setTimeWindow("week")} className="toggle-btn">
            <span
              className={`btn-text ${timeWindow === "week" ? "active" : ""}`}
            >
              This Week
            </span>
            {timeWindow === "week" && (
              <motion.span
                layoutId="activePill"
                className="active-bg"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      <MovieGrid
        movies={trendingMovies}
        category="trending"
        showViewAll={false}
      />

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
