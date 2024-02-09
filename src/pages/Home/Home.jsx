import { useState, useEffect } from 'react'
import { requestTrendingMovies } from 'services/api';
import { Link, useLocation } from 'react-router-dom';
import css from './Home.module.css';

const Home = () => {
    const [movies, setMovies] = useState({});
    const location = useLocation();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const resp = await requestTrendingMovies();
                setMovies(resp.data.results);
            }
            catch (error) {
                console.error('Error fetching movies:', error);
            }
          };
        fetchMovies();
    },[])

    return (
        <div className={css.container}>
            <h1>Trending today</h1>
            <ul>
                {Array.isArray(movies) && movies.map(movie => {
                    return (
                        // добавити генерацію ключа, якщо немає ID
                        <li key={movie.id}>
                            <Link className={css.link} state={{from: location}} to={`/movies/${movie.id}`}>
                                <span className={css.linkText}>{movie.title || movie.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Home;