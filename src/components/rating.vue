<template>
  <div class="radio-stars">
    <input class="sr-only" v-model="rate" id="radio-5" name="radio-star" type="radio" value="5" />
    <label class="radio-star" for="radio-5">5</label>

    <input class="sr-only" v-model="rate" id="radio-4" name="radio-star" type="radio" value="4" />
    <label class="radio-star" for="radio-4">4</label>

    <input class="sr-only" v-model="rate" id="radio-3" name="radio-star" type="radio" value="3" />
    <label class="radio-star" for="radio-3">3</label>

    <input class="sr-only" v-model="rate" id="radio-2" name="radio-star" type="radio" value="2" />
    <label class="radio-star" for="radio-2">2</label>

    <input class="sr-only" v-model="rate" id="radio-1" name="radio-star" type="radio" value="1" />
    <label class="radio-star" for="radio-1">1</label>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  watchEffect,
} from 'vue';

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const rate = ref();

    watch(rate, (val) => {
      localStorage.setItem(props.id.toString(), val);
    });

    watchEffect(() => {
      const value = localStorage.getItem(props.id.toString());

      if (value) {
        rate.value = value;
      }
    });

    return { rate };
  },
});
</script>

<style lang="scss" scoped>
$star-selected-color: orange;
$star-empty-color: rgba(0,0,0,.25);
$font-size: 40px;

.radio-stars {
  display: inline-block;
  position: relative;

  unicode-bidi: bidi-override;
  direction: rtl;

  counter-reset: star-rating;

  font-size: 0; // remove extraneous padding

  &:hover {
    // Stars to the right of cursor
    .radio-star::before {
      content: '☆';
    }

    // Stars under and to the left of cursor
    .radio-star:hover {
      &::before,
      ~ .radio-star::before {
        content: '★';
      }
    }
  }
}

.radio-star {
  display: inline-block;
  overflow: hidden;
  cursor: pointer;

  padding: 0 2px;
  width: .9em;

  direction: ltr;
  color:  $star-empty-color;
  font-size: $font-size;
  white-space: nowrap;

  &::before {
    content: '☆';
  }

  &:hover,
  &:hover ~ &,
  input:checked ~ & {
    color: $star-selected-color;
  }

  input:checked ~ & {
    counter-increment: star-rating;

    &::before {
      content: '★';
    }
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  clip: rect(0,0,0,0);
  border: 0;
}
</style>
