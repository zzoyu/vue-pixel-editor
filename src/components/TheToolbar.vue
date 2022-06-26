<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useStore } from "../stores";
const store = useStore();

const scaleFitToScreen = () => {
  const targetHeight = document.body.clientHeight - 80;
  const estimatedScale = Math.round(targetHeight / store.height);
  store.scale = estimatedScale % 2 ? estimatedScale - 1 : estimatedScale;
};
</script>

<template>
  <div class="absolute flex justify-center items-center top-0">
    <div
      class="drop-shadow-lg h-10 py-4 px-4 bg-slate-50 rounded items-center justify-center gap-2 grid grid-flow-col"
    >
      <button @click="store.changeBackground()">
        <Icon icon="pixelarticons:grid" />
      </button>
      <button @click="store.scale++">
        <Icon icon="pixelarticons:zoom-in" />
      </button>
      <button @click="store.scale--">
        <Icon icon="pixelarticons:zoom-out" />
      </button>
      <button @click="scaleFitToScreen">
        <Icon icon="pixelarticons:aspect-ratio" />
      </button>
      <button @click="store.scale = 1">
        <Icon icon="pixelarticons:layout-distribute-vertical" />
      </button>
    </div>
  </div>
</template>
