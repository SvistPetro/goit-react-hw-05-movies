import { useEffect, useState } from 'react';
import { requestMovieCast } from 'services/api';
import css from './Cast.module.css';

const Cast = ({id}) => {
    const [actors, setActors] = useState({});

    useEffect(() => {
        const fetchMoviesCast = async () => {
            try {
                if (!id) {return}

                const resp = await requestMovieCast(id);
                setActors(resp.data.cast);
            }
            catch (error) {
                console.error('Error fetching movies:', error);
            }
            };
        
            fetchMoviesCast();
        },[id])

    const defaultImg = 'https://via.placeholder.com/200x300?text=No+Image+Available';

    return (
        <ul className={css.list}>
            {Array.isArray(actors) && actors.map(({ id, profile_path, name, character }) => {
                    return (
                        // добавити генерацію ключа, якщо немає ID
                        <li className={css.item} key={id}> 
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
    )
}

export default Cast;