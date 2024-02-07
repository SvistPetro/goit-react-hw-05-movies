import { useState, useEffect } from 'react'
import { requestTrendingMovies } from 'services/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [movies, setMovies] = useState({});

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
        <div>
            <h1>Trending today</h1>
            <ul>
                {Array.isArray(movies) && movies.map(movie => {
                    return (
                        <li key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                <span>{movie.title || movie.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Home;