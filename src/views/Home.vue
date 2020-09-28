<template>
  {{ comic }}
  <button @click="getRandomComic">New random comic</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { useComic } from '../features/comicFeature';

export default defineComponent({
  name: 'Home',
  setup() {
    const { currentRoute } = useRouter();
    const comicId = currentRoute.value.params.id as string;

    const { comic, getComicById, getRandomComic } = useComic();

    if (comicId) getComicById(comicId);
    else getRandomComic();

    return { comic, getRandomComic };
  },
});
</script>
