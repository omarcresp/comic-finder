<template>
  <header>
    <h1>Comic Finder</h1>
  </header>
  <nav class="nav-container">
    <input
      type="number"
      class="search-input"
      v-model="inputModel"
      min="1"
      :max="lastIndex"
      @keydown.enter="inputModel && getComicById(inputModel)"
    />
    <button
      class="button-find"
      @click="inputModel && getComicById(inputModel)"
    >
      Search comic
    </button>
    <button
      class="button-find"
      @click="getRandomComic"
    >
      New random comic
    </button>
  </nav>
  <div v-if="comic">
    <img :src="comic.img" alt="comic-page">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useComic } from '../features/comicFeature';

export default defineComponent({
  name: 'Home',
  setup() {
    const { currentRoute } = useRouter();
    const comicId = currentRoute.value.params.id as string;
    const inputModel = ref<string>();

    const {
      comic,
      getComicById,
      getRandomComic,
      lastIndex,
    } = useComic();

    if (comicId) getComicById(comicId);
    else getRandomComic();

    return {
      comic,
      getRandomComic,
      inputModel,
      getComicById,
      lastIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap');

h1 {
  font-family: 'Comic Neue', cursive;
}

.button-find {
  background-color: #e8e8e8;
  border: none;
  border-radius: 0.25rem;
  outline: none !important;
  color: #5a5a5a;
  cursor: pointer;
  font-family: 'Comic Neue', cursive;

  &:hover {
    box-shadow: 0 0 3px 0px #3a3a3a;
    color: black;
  }

  &:active {
    box-shadow: 0 0 3px 0px #79499f;
    color: black;
  }
}

.search-input {
  border-radius: 5rem;
  padding: 0.5rem;
  box-shadow: 0px 0px 0px 1px #b5b7ba;
  border: 1px solid transparent;
  outline: none !important;

  &:hover {
    border: 1px solid #b5b7ba;
    box-shadow: 0px 0px 2px 0px #79499f;
  }
}

.nav-container {
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  width: 50vw;
  gap: 1rem;
  margin: auto;
  margin-bottom: 3rem;
}
</style>
