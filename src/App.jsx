import { NavLink, Route, Routes } from "react-router-dom";
import css from './App.module.css';
import Home from "pages/Home/Home";
import Movies from "pages/Movies/Movies";
import MovieDetails from "pages/MovieDetails/MovieDetails";

export const App = () => {
  return (
    <div>
      <header className={css.header}>
        <NavLink className={({isActive}) => `${css.navLink} ${isActive ? css.active : ''}`} to="/">Home</NavLink>
        <NavLink className={({isActive}) => `${css.navLink} ${isActive ? css.active : ''}`} to="/movies" end>Movies</NavLink>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/movies" element={<Movies />}/>
          <Route path="/movies/:movieId/*" element={<MovieDetails />}/>
        </Routes>
      </main>
    </div>
  );
};
