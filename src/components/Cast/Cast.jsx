import { useEffect, useState } from 'react';
import { requestMovieCast } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { nanoid } from 'nanoid';

import css from './Cast.module.css';

const Cast = ({id}) => {
        // for ID used useParams
    const [actors, setActors] = useState({});
    const [error, setError] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);

    useEffect(() => {
        const fetchMoviesCast = async () => {
            try {
                if (!id) {return}
                setIsLoadMore(true);

                const resp = await requestMovieCast(id);
                setActors(resp.data.cast);
            }
            catch (error) {
                setError(error);;
            }
            finally {
                setIsLoadMore(false);
            }
        };
        
        fetchMoviesCast();
    },[id])

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