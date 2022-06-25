<script setup lang="ts">
import debounce from "lodash/debounce";
import { DebuggerEventExtraInfo, onMounted, onUpdated, ref } from "vue";
import { BackgroundType } from "../classes/backgroundType";
import { useStore } from "../stores";

const store = useStore();
const canvas = ref<HTMLCanvasElement>();
// const lastPoint = ref<{ x: number; y: number }>();

const render = debounce(() => {
  const ctx = canvas.value!.getContext("2d");
  if (!ctx) return;
  const buffer = document.createElement("canvas");
  buffer.width = ctx.canvas.width;
  buffer.height = ctx.canvas.height;
  const bufferCtx = buffer.getContext("2d");
  if (!bufferCtx) return;
  // console.log(store.visibleLayerList);
  store.visibleLayerList.forEach((i) => i.render(bufferCtx, store.scale));
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.canvas.width = ctx.canvas.width;
  ctx.drawImage(buffer, 0, 0);
  requestAnimationFrame(render);
  // buffer.remove();
}, 50);

const zoom = debounce((event: WheelEvent) => {
  if (event.deltaY < 0) store.scale -= 2;
  else store.scale += 2;
}, 5);

const calculateRelativePosition = (
  event: MouseEvent
): { x: number; y: number } => {
  const rectCanvas = canvas.value!.getClientRects()?.[0];

  return { x: event.x - rectCanvas.x, y: event.y - rectCanvas.y };
};
const handleMouseMove = (event: MouseEvent) => {
  store.command[store.currentCommandIndex].drag?.(
    calculateRelativePosition(event)
  );
};
const handleMouseUp = (event: MouseEvent) => {
  store.command[store.currentCommandIndex].clickEnd?.(
    calculateRelativePosition(event)
  );
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

const handleClick = (event: MouseEvent) => {
  store.command[store.currentCommandIndex].clickStart?.(
    calculateRelativePosition(event)
  );
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
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
    <!-- @click="drawPixel" -->
    <canvas
      ref="canvas"
      @mousedown="handleClick"
      :width="store.canvasWidth"
      :height="store.canvasHeight"
      class="canvas"
      :class="{ 'cursor-not-allowed': store.currentLayer?.isLocked }"
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
