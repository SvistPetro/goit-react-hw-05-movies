import React, { useState, useEffect } from 'react'
import { requestMovies } from '../../api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const requestUrl = 'trending/all/day';
                const { results } = await requestMovies(requestUrl);
                // console.log(results);
                setMovies(results);
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