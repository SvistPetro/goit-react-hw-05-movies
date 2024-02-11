import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { NavLink, Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { requestMovieById } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const location = useLocation();
  const backLinhRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    if (!movieId) return;

    const fetchMovies = async () => {
        try {
          setIsLoadMore(true);
          const resp = await requestMovieById(movieId);
          setMovie(resp.data);
        }
        catch (error) {
          setError(error);
        }
        finally {
          setIsLoadMore(false);
        }
      };
    
    fetchMovies();
  },[movieId])

  const { poster_path, title, original_title, name, release_date, vote_average, overview, genres } = movie;
  const defaultImg = 'https://via.placeholder.com/500x600?text=No+Image+Available';
    
  return (
    <div>
      {isLoadMore && <Loader />}
      {error && <p>Something went wrong...</p>}
      {movie && (
        <>
          <div className={css.container}>
            <Link to={backLinhRef.current} className={css.button}>← Go back</Link>
            <div className={css.movieDetails}>
              <img src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : defaultImg} alt={title || name || original_title} width={200} height={300}/>
              <div className={css.movieDetailsContent}>
                <h2 className={css.textContent}>{title || name || original_title}</h2>
                <p className={css.textContent}>Release date: {release_date}</p>
                <p className={css.textContent}>User Score: {Math.round(vote_average * 10)}%</p>
                <h3 className={css.textContent}>Overview</h3>
                <p className={css.textContent}>{overview}</p>
                <h3 className={css.textContent}>Genres</h3>
                <p>
                  {Array.isArray(genres) && genres.map(({id, name}) => {
                    return (
                      <span className={css.genresNext} key={id}>{name}</span>
                    );
                  })}
                </p>
              </div>
            </div>
          </div >

          <div className={css.containerAddInfo}>
            <h3>Additional information</h3>
            <div className={css.containerAddInfoLink}>
              <NavLink className={({isActive}) => `${css.navLink} ${isActive ? css.active : ''}`} to="cast">Cast</NavLink> 
              <NavLink className={({isActive}) => `${css.navLink} ${isActive ? css.active : ''}`} to="reviews">Reviews</NavLink> 
            </div>
          </div>

          <div className={css.containerAddInfoContent}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='cast' element={<Cast />}/>
                <Route path='reviews' element={<Reviews />}/>
              </Routes>
            </Suspense>
          </div>
        </>
      )}
    </div>
  )
}

export default MovieDetails;