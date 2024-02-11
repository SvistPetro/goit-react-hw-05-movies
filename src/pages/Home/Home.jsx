import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { requestTrendingMovies } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { nanoid } from 'nanoid';
import css from './Home.module.css';

const Home = () => {
    const [movies, setMovies] = useState({});
    const location = useLocation();
    const [error, setError] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoadMore(true);
                const resp = await requestTrendingMovies();
                setMovies(resp.data.results);
            }
            catch (error) {
                setError(error);
            }
            finally {
                setIsLoadMore(false);
            }
          };
        fetchMovies();
    },[])

    return (
        <div className={css.container}>
            <h1>Trending today</h1>
            {isLoadMore && <Loader />}
            {error && <p>Something went wrong...</p>}
            {!isLoadMore && (
                <ul>
                {Array.isArray(movies) && movies.map(({ id, title, name }) => {
                    return (
                        <li key={nanoid()}>
                            <Link className={css.link} state={{from: location}} to={`/movies/${id}`}>
                                <span className={css.linkText}>{title || name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            )}
        </div>
    )
}

export default Home;