import { useState, useEffect } from "react";
import {
  FaBars,
  FaRegHeart,
  FaRegStar,
  FaSearch,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";
import { LuClapperboard } from "react-icons/lu";
import "./Navbar.module.scss";

import { NavLink, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
console.log(API_KEY);
const API_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w200";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // toggle menu
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    if (debounceSearch.trim() === "") {
      setMovies([]);
      setIsOpen(false);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(debounceSearch)}&language=en-US`,
        );
        const data = await response.json();
        setMovies(data.results ? data.results.slice(0, 3) : []);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [debounceSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <NavLink to="/" className="movie-search-logo">
            <LuClapperboard />
            <span>Movie Search</span>
          </NavLink>

          {/* Mobile Toggle Button */}
          <button className="menu-icon" onClick={toggleMobileMenu}>
            {isMobileOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`navbar-links ${isMobileOpen ? "active" : ""}`}>
            <form className="search-movie" onSubmit={handleSearchSubmit}>
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for movies..."
                aria-label="Search movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Search Dropdown */}
              {isOpen && movies.length > 0 && (
                <div className="search-dropdown">
                  {isLoading ? (
                    <div className="dropdown-item loading">Loading...</div>
                  ) : (
                    <div className="dropdown-list">
                      {movies.map((movie) => (
                        <div
                          key={movie.id}
                          className="dropdown-item"
                          onClick={() => handleMovieClick(movie.id)}
                        >
                          {movie.poster_path && (
                            <img
                              src={`${IMG_URL}${movie.poster_path}`}
                              alt={movie.title}
                              className="dropdown-image"
                            />
                          )}
                          <div className="dropdown-content">
                            <p className="dropdown-title">{movie.title}</p>
                            <p className="dropdown-year">
                              {movie.release_date
                                ? new Date(movie.release_date).getFullYear()
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div
                        className="dropdown-item view-all"
                        onClick={handleSearchSubmit}
                      >
                        View All Results →
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>

            <ul className="nav-links">
              <li>
                <NavLink to="/" onClick={() => setIsMobileOpen(false)}>
                  <FaRegHeart /> <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movie/popular"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <FaRegStar /> <span>Popular</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/movie/top_rated"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <FaTrophy /> <span>Top Rated</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" onClick={() => setIsMobileOpen(false)}>
                  <FaRegHeart /> <span>Favorites</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
