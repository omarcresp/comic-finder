import { ref, watch } from 'vue';

import { comicRepository, Comic } from '../repositories/ComicRepository';

const lastIndex = ref<number>();
const comic = ref<Comic>();

async function setLastIndex() {
  const { data: lastComic } = await comicRepository.getLastComic();

  lastIndex.value = lastComic.num;
}

function getComicById(id: string) {
  comicRepository.getComicById(id)
    .then(({ data }) => {
      comic.value = data;
    });
}

// eslint-disable-next-line
const generateRandomIndex = (length: number) => `${~~(Math.random() * length) + 1}`;

function getRandomComic() {
  if (lastIndex.value) {
    const randomIndex = generateRandomIndex(lastIndex.value);

    getComicById(randomIndex);
  } else {
    watch(lastIndex, (value) => {
      if (value) {
        const randomIndex = generateRandomIndex(value);

        getComicById(randomIndex);
      }
    });
  }
}

// eslint-disable-next-line
export const useComic = () => {
  setLastIndex();

  return {
    getComicById,
    getRandomComic,
    comic,
  };
};
