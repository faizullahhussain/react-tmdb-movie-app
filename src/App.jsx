import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import PopularMovies from "./pages/PopularMovies";
import TopRatedMovies from "./pages/TopRatedMovies";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movie/popular" element={<PopularMovies />} />
        <Route path="movie/top_rated" element={<TopRatedMovies />} />
        <Route path="favorites" element={<Favorites />} />

        <Route path="movie/:id" element={<MovieDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
