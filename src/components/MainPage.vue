<template>
  <h2>{{ msg }}</h2>
  <p>
    <button class="button">Subscribe SSE</button>
    <button class="button">Unsubscribe</button>
  </p>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    msg: {
      required: true,
      type: String,
      default: '',
    },
  },

  methods: {},
};

const count = ref(0);
</script>

<style scoped>
a {
  color: #42b983;
}
.button {
  margin-left: 10px;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
