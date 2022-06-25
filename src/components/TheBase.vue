<script setup lang="ts">
import { useStore } from "../stores";
import TheCanvas from "./TheCanvas.vue";
import TheToolbar from "./TheToolbar.vue";

const store = useStore();
</script>

<template>
  <div
    class="bg-slate-200 flex grow justify-center items-center"
    :style="{ cursor: store.currentCommand.cursor }"
  >
    <TheToolbar></TheToolbar>
    <TheCanvas></TheCanvas>
  </div>
</template>

<style scoped></style>
