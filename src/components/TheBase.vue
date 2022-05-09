<script setup lang="ts">
import { ref } from "vue";
import TheCanvas from "./TheCanvas.vue";
import TheToolbar from "./TheToolbar.vue";
</script>

<template>
  <div class="bg-slate-200 flex grow justify-center items-center">
    <TheToolbar></TheToolbar>
    <TheCanvas></TheCanvas>
  </div>
</template>

<style scoped></style>
