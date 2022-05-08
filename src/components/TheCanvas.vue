<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import { BackgroundType } from "../classes/backgroundType";
import { useStore } from "../stores";

const store = useStore();
const canvas = ref<HTMLCanvasElement>();

const render = () => {
  const ctx = canvas.value!.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 150, 100);
};

const zoom = (event: WheelEvent) => {
  if (event.deltaY < 0) store.scale--;
  else store.scale++;
};
onUpdated(render);
onMounted(render);
</script>

<template>
  <div
    @wheel="zoom"
    class="bg-white"
    :class="BackgroundType[store.backgroundType]"
    :width="store.canvasWidth"
    :height="store.canvasHeight"
    :style="{
      backgroundSize: `${store.scale * 2}px ${store.scale * 2}px`,
      backgroundPosition: `0 0, ${store.scale}px 0, ${store.scale}px -${store.scale}px, 0px ${store.scale}px`,
    }"
  >
    <div class="absolute -mt-6">
      <h1>x{{ store.scale }} {{ store.width }}*{{ store.height }}</h1>
    </div>
    <canvas
      ref="canvas"
      :width="store.canvasWidth"
      :height="store.canvasHeight"
      class="canvas"
    ></canvas>
  </div>
</template>

<style scoped>
.checker {
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(135deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(135deg, transparent 75%, #ccc 75%);
  background-size: 25px 25px; /* Must be a square */
  background-position: 0 0, 12.5px 0, 12.5px -12.5px, 0px 12.5px; /* Must be half of one side of the square */
}

.white {
  background: white;
}

.transparent {
  background: transparent;
}
</style>
