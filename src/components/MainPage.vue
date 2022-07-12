<template>
  <h2>{{ msg }}</h2>
  <p>
    <button class="button" @click="connectSSE">Subscribe SSE</button>
    <button class="button" @click="disconnectSSE">Unsubscribe</button>
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

  methods: {
    connectSSE() {
      console.log('connect sse');
      const evtSource = new EventSource('http://localhost:5005/stream');

      evtSource.onmessage = function (event) {
        console.log(event.data);
      };
    },

    disconnectSSE() {
      console.log('disconnect sse');
    },
  },
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
