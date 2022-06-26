<script setup lang="ts">
import debounce from "lodash/debounce";
import { useStore } from "../stores";
import TheCanvas from "./TheCanvas.vue";
import TheToolbar from "./TheToolbar.vue";

const store = useStore();

const zoom = debounce((event: WheelEvent) => {
  if (event.deltaY < 0) store.scale = Math.max(store.scale - 2, 1);
  else store.scale = Math.min(store.scale + 2, 100);
}, 5);
</script>

<template>
  <div
    class="bg-slate-200 flex grow justify-center items-center overflow-scroll"
    @wheel="zoom"
  >
    <TheToolbar></TheToolbar>
    <TheCanvas :style="{ cursor: store.currentCommand.cursor }"></TheCanvas>
  </div>
</template>

<style scoped></style>
