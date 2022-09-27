<template>
  <img alt="Vue logo" class="logo" :src="iconPath" />
  <main-page
    msg="server sent event NodeJS + Vue3"
    @change-avatar="changeIcon"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainPage from './components/MainPage.vue';

export default defineComponent({
  name: 'App',

  components: {
    MainPage,
  },

  data() {
    return {
      iconIndex: 0,
      iconArray: [
        'bird',
        'cow',
        'dog',
        'duck',
        'elephant',
        'giraffe',
        'mouse',
        'owl',
        'panda',
        'tigre',
        'turtle',
        'zebra',
      ],
    };
  },

  methods: {
    changeIcon() {
      if (this.iconIndex < this.iconArray.length - 1) {
        this.iconIndex++;
      } else {
        this.iconIndex = 0;
      }
    },
  },

  computed: {
    iconPath(): string {
      return './src/assets/icon/' + this.iconArray[this.iconIndex] + '.svg';
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 20vw;
}
</style>
