<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "../stores";

const store = useStore();
const canvas = ref<HTMLCanvasElement>();
onMounted(() => {
  const ctx = canvas.value!.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 150, 100);
});
</script>

<template>
  <div class="bg-white" :width="store.canvasWidth" :height="store.canvasHeight">
    <div class="absolute -mt-6">
      <H1>x{{ store.scale }} {{ store.width }}*{{ store.height }}</H1>
    </div>
    <canvas
      ref="canvas"
      :width="store.canvasWidth"
      :height="store.canvasHeight"
      class="canvas"
    ></canvas>
  </div>
</template>

<style scoped></style>
