import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { requestMovieById } from 'services/api';

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
      const fetchMovies = async () => {
          try {
            if (!movieId) {return}

            const resp = await requestMovieById(movieId);
            setMovie(resp.data);
          }
          catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
      
      fetchMovies();
    },[movieId])

    const { poster_path, title, original_title, name, release_date, vote_average, overview, genres } = movie;
    const defaultImg = 'https://via.placeholder.com/500x600?text=No+Image+Available';
    
  return (
    <div>
        {movie && (
            <div>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : defaultImg} alt={title || name || original_title} />
                <h2>{title || name || original_title}</h2>
                <p>Release date: {release_date}</p>
                <p>User Score: {Math.round(vote_average * 10)}%</p>
                <h3>Overview</h3>
                <p>{overview}</p>
                <h3>Genres</h3>
                <p>
                  {Array.isArray(genres) && genres.map(genre => {
                    return (
                      <span key={genre.id}>{genre.name}</span>
                    );
                  })}
                </p>
            </div>
            
        )}
    </div>
  )
}

export default MovieDetails;