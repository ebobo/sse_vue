<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import MainPage from './components/MainPage.vue';
</script>

<template>
  <img alt="Vue logo" class="logo" src="./assets/icon/panda_icon.svg" />
  <MainPage msg="server sent event NodeJS + Vue3" />
</template>

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
  width: 40vw;
}
</style>
