import { useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';




const Movies = () => {
  const[searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('sQuery');
  console.log('query', query);

  const handleSubmitForm = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.SearchMovies.value;
    console.log(searchValue);
    
    
    setSearchParams({sQuery: searchValue});
  }

  return (
    <div >
        <form className={css.form} onSubmit={handleSubmitForm}>
          <label htmlFor="SearchMovies">
            <input type="text" name="SearchMovies" className={css.input} defaultValue={query} required/>
          </label>
          <button type="submit" className={css.button}>Search</button>
        </form>
        
    </div>
  )
}

export default Movies;