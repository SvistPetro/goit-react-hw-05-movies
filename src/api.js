import axios from 'axios';

const API_KEY = '9d853ff80d6bad3956ee1b02dd688b86';

export const requestMovies = async (urlData) => {
    axios.defaults.baseURL = `https://api.themoviedb.org/3/${urlData}?api_key=${API_KEY}&language=en-US`;
    const { data } = await axios();
    return data;
  };

//   3/movie/11