import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_4LFbEJv0yA1bBaj9l3c3qcAM1r9uvxVIRe5XE8hBkjhQ19SHLPykpLrUGXeSyZhm';
const BASE_URL = `https://api.thecatapi.com/v1/`;

function fetchCatByBreed(breedId) {
    return axios
      .get(`${BASE_URL}images/search?breed_ids=${breedId}`)
      .then(({ data }) => data);
  }

  function fetchBreeds() {
    return axios.get(`${BASE_URL}breeds`).then(({ data }) => data);
  }

  export {fetchCatByBreed ,fetchBreeds }