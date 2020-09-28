import { comicClient } from './clients/ComicClient';

const url = '';

export interface Comic {
  month: string;
  num: number;
  link: string;
  year: string;
  news: string;
  safe_title: string;
  transcript: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

export const comicRepository = {
  getLastComic() {
    return comicClient.get<Comic>(url, { params: { comic: 'latest' } });
  },

  getComicById(id: string) {
    return comicClient.get<Comic>(url, { params: { comic: id } });
  },
};
