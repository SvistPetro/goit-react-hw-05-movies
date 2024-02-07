import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { requestMovies } from '../../api';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (!movieId) {
                    return;
                }
                const requestUrl = `movie/${movieId}`;
                const movieData = await requestMovies(requestUrl);
                setMovie(movieData);
                // console.log(movieData);
            }
            catch (error) {
              console.error('Error fetching movies:', error);
            }
          };
        
        fetchMovies();
    },[movieId])

  return (
    <div>
        {movie && (
            <>
                <h2>{movie.title || movie.name}</h2>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
            </>
            
        )}
    </div>
  )
}

export default MovieDetails;