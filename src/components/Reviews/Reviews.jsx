import { useState, useEffect } from 'react';
import { requestMovieReviews } from 'services/api';

const Reviews = ({id}) => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMoviesReviews = async () => {
            try {
                if (!id) {return}

                const resp = await requestMovieReviews(id);
                setReviews(resp.data.results);
                console.log(resp.data.results);
            }
            catch (error) {
                console.error('Error fetching movies:', error);
            }
            };
        
        fetchMoviesReviews();
    },[id])

    return (
        <ul>
            {reviews.length !== 0? (reviews.map(({ author, content, id }) => {
                    return (
                        <li key={id}>
                            <h3>{author}</h3>
                            <p>{content}</p>
                        </li>
                    )
                })) : <div>We don't have any reviews for this movie.</div>}
        </ul>
    )
}

export default Reviews;