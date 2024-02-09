import axios from 'axios';

const API_KEY = '9d853ff80d6bad3956ee1b02dd688b86';
const url = 'https://api.themoviedb.org/3/';
export const AUTH_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDg1M2ZmODBkNmJhZDM5NTZlZTFiMDJkZDY4OGI4NiIsInN1YiI6IjY1YzI5YWIwOGUyZTAwMDE4M2E0ZWUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hazNQV9NpBZxh2Yqr24KXmtM3BG02PDT4G2-CtofMcU';

export const requestTrendingMovies = async () => {
  const options = {
    method: 'GET',
    url: `${url}/trending/movie/day`,
    params: { language: 'en-US', api_key: API_KEY },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_KEY}`,
    },
  };

  const data = await axios(options);
  return data;
  };

export const requestMovieById = async (id) => {
  const options = {
    method: 'GET',
    url: `${url}/movie/${id}`,
    params: { language: 'en-US', api_key: API_KEY },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_KEY}`,
    },
  };

  const data = await axios(options);
  return data;
}

export const requestMovieCast = async (id) => {
  const options = {
    method: 'GET',
    url: `${url}/movie/${id}/credits`,
    params: { language: 'en-US', api_key: API_KEY },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_KEY}`,
    },
  };

  const data = await axios(options);
  return data;
}

export const requestMovieReviews = async (id) => {
  const options = {
    method: 'GET',
    url: `${url}/movie/${id}/reviews`,
    params: { language: 'en-US', page: 1, api_key: API_KEY },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AUTH_KEY}`,
    },
  };

  const data = await axios(options);
  return data;
}


// 'https://api.themoviedb.org/3/movie/movie_id/reviews?language=en-US&page=1'