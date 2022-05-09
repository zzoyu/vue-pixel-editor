<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TheBase from "./components/TheBase.vue";
import TheSidebar from "./components/TheSidebar.vue";
import TheToolbar from "./components/TheToolbar.vue";
import ThePreview from "./components/ThePreview.vue";
</script>

<template>
  <!-- <TheToolbar></TheToolbar> -->
  <TheSidebar></TheSidebar>
  <TheBase></TheBase>
  <ThePreview></ThePreview>
</template>

<style>
#app {
  font-family: "neodgm-code", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  color: slategrey;
  width: 100%;
  height: 100%;
  /* margin-top: 60px; */
  display: flex;
  flex-direction: row;
}
html,
body {
  width: 100%;
  height: 100%;
}
</style>
