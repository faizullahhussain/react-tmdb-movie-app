import { useState } from "react";
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

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // toggle menu
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
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
            <form className="search-movie">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for movies..."
                aria-label="Search movies"
              />
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
