<script setup lang="ts">
import { ref } from "vue";
import ThePalette from "./sidebar/ThePalette.vue";
import TheLayer from "./sidebar/TheLayer.vue";
import TheLogo from "./TheLogo.vue";
</script>

<template>
  <div class="float-left drop-shadow-lg w-48 h-full py-4 bg-slate-50 rounded">
    <TheLogo></TheLogo>
    <ThePalette></ThePalette>
    <TheLayer></TheLayer>
    <button class="p-3 rounded-md border border-slate-200">Subscribe</button>
  </div>
</template>

<style scoped></style>
