import axios from 'axios';

const baseURL = 'https://xkcd.now.sh/';

// eslint-disable-next-line
export const comicClient = axios.create({
  baseURL,
});
