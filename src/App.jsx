import { Suspense, lazy } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Loader } from "components/Loader/Loader";

import css from './App.module.css';

const Home = lazy(() => import('pages/Home/Home'));
const Movies = lazy(() => import('pages/Movies/Movies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));

export const App = () => {
  return (
    <div>
      <header className={css.header}>
        <NavLink className={({isActive}) => `${css.navLink} ${isActive ? css.active : ''}`} to="/">Home</NavLink>
        <NavLink className={({isActive}) => `${css.navLink} ${isActive ? css.active : ''}`} to="/movies" end>Movies</NavLink>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/movies" element={<Movies />}/>
            <Route path="/movies/:movieId/*" element={<MovieDetails />}/>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
