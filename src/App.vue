<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TheBase from "./components/TheBase.vue";
import TheSidebar from "./components/TheSidebar.vue";
import TheToolbar from "./components/TheToolbar.vue";
import ThePreview from "./components/ThePreview.vue";
</script>

<template>
  <TheSidebar></TheSidebar>
  <TheBase></TheBase>
  <TheToolbar></TheToolbar>
  <ThePreview></ThePreview>
</template>

<style>
#app {
  font-family: "neodgm-code", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* margin-top: 60px; */
}
html,
body {
  width: 100%;
  height: 100%;
}
</style>
