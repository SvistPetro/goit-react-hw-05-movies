import { useState, useEffect } from 'react';
import { requestMovieReviews } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { nanoid } from 'nanoid';

import css from './Reviews.module.css';

const Reviews = ({id}) => {
    // for ID used useParams
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [isLoadMore, setIsLoadMore] = useState(false);

    useEffect(() => {
        const fetchMoviesReviews = async () => {
            try {
                if (!id) {return}
                setIsLoadMore(true);

                const resp = await requestMovieReviews(id);
                setReviews(resp.data.results);
            }
            catch (error) {
                setError(error);
            }
            finally {
                setIsLoadMore(false);
            }
        };
        
        fetchMoviesReviews();
    },[id])

    return (
        <div>
            {isLoadMore && <Loader />}
            {error && <p>Something went wrong...</p>}
            <ul className={css.list}>
                {!isLoadMore && reviews.length !== 0? (reviews.map(({ author, content}) => {
                        return (
                            <li key={nanoid()} className={css.item}>
                                <h3 className={css.name}>{author}</h3>
                                <p className={css.text}>{content}</p>
                            </li>
                        )
                    })) : <div>We don't have any reviews for this movie.</div>}
            </ul>
        </div>
    )
}

export default Reviews;