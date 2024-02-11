import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestMovieCast } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { nanoid } from 'nanoid';
import css from './Cast.module.css';


const Cast = () => {
    const { movieId } = useParams();
    const [actors, setActors] = useState({});
    const [error, setError] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);

    useEffect(() => {
        const fetchMoviesCast = async () => {
            try {
                if (!movieId) {return}
                setIsLoadMore(true);

                const resp = await requestMovieCast(movieId);
                setActors(resp.data.cast);
            }
            catch (error) {
                setError(error);
            }
            finally {
                setIsLoadMore(false);
            }
        };
        
        fetchMoviesCast();
    },[movieId])

    const defaultImg = 'https://via.placeholder.com/200x300?text=No+Image+Available';

    return (
        <div>
            {isLoadMore && <Loader />}
            {error && <p>Something went wrong...</p>}
            <ul className={css.list}>
                {Array.isArray(actors) && actors.map(({ profile_path, name, character }) => {
                    return (
                        <li className={css.item} key={nanoid()}> 
                            <img className={css.img} 
                                src={
                                profile_path? 
                                `https://image.tmdb.org/t/p/w200${profile_path}` 
                                : defaultImg} 
                                alt={name} 
                                width={208} 
                                height={300}
                            />
                            <p className={css.actor}>{name}</p>
                            <p className={css.charter}>Character: {character}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Cast;