import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { requestFilteredMovies } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { nanoid } from 'nanoid';
import css from './Movies.module.css';


const Movies = () => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
      if(query === null || query === '') return;

      const fetchFilteredMovies = async () => {
        try {
          setIsLoadMore(true);
          const resp = await requestFilteredMovies(query);
          setMovies(resp.data.results);
        }
        catch (error) {
          setError(error);
        }
        finally {
          setIsLoadMore(false);
        }
      };
    
      fetchFilteredMovies();
  },[query]);

  const handleSubmitForm = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.SearchMovies.value.trim();    
    setSearchParams({query: searchValue});
  }

  return (
    <div >
      <form className={css.form} onSubmit={handleSubmitForm}>
        <label htmlFor="SearchMovies">
          <input type="text" name="SearchMovies" className={css.input} defaultValue={query} required/>
        </label>
        <button type="submit" className={css.button}>Search</button>
      </form>
      <div>
        {isLoadMore && <Loader />}
        {error && <p>Something went wrong...</p>}
        {movies?.length === 0 && <div>We have no movies for this request.</div>}
        <ul>
          {movies !== null && movies?.length > 0? (movies.map(({ id, title, name }) => {
            return (
              <li key={nanoid()}>
                <Link className={css.link} state={{from: location}} to={`/movies/${id}`}>
                  <span>{title || name}</span>
                </Link>
              </li>
            );
          })) : <div>We have no movies for this request.</div>}
        </ul>
      </div>
    </div>
  )
}

export default Movies;