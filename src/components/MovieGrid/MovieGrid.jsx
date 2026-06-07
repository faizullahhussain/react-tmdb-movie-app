import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieGrid.module.scss";

const MovieGrid = ({
  title,
  movies,
  viewAll,
  category,
  showViewAll = true,
}) => {
  return (
    <section>
      <div className="section-title">
        <h2 className="main-title">{title}</h2>
        {showViewAll && (
          <Link to={`/movie/${category}`}>
            View All <FaAngleRight />
          </Link>
        )}
      </div>
      <div className="movie-grid">
        {movies.slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} viewAll={viewAll} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
