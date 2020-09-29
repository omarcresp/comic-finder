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
    <h2>{{ comic.title }}</h2>
    <img :src="comic.img" alt="comic-page">

    <br />
    <rating :id="comic.num"></rating>
  </div>
  <div v-else>
    <loading></loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useComic } from '../features/comicFeature';
import loading from '../components/loading.vue';
import rating from '../components/rating.vue';

export default defineComponent({
  name: 'Home',
  components: {
    loading,
    rating,
  },
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

h1, h2 {
  margin-top: 0;
}

.button-find {
  background-color: #e8e8e8;
  border: none;
  border-radius: 0.25rem;
  outline: none !important;
  color: #5a5a5a;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 3px 0px #3a3a3a;
    color: black;
  }

  &:active {
    box-shadow: 0 0 3px 0px #79499f;
    color: black;
  }
}

img {
  max-width: 95vw;
}

.nav-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  width: 90vw;
  gap: 1rem;
  margin: auto;
  margin-bottom: 3rem;

  .search-input {
    border-radius: 5rem;
    padding: 0.5rem;
    box-shadow: 0px 0px 0px 1px #b5b7ba;
    border: 1px solid transparent;
    outline: none !important;
    grid-column: 1 / -1;

    &:hover {
      border: 1px solid #b5b7ba;
      box-shadow: 0px 0px 2px 0px #79499f;
    }
  }

  @media screen and (min-width: 640px) {
    width: 50vw;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 4fr 1fr 1fr;

    .search-input {
      grid-column: 1;
    }
  }
}
</style>
