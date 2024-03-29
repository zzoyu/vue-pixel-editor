<script setup lang="ts">
import debounce from "lodash/debounce";
import { DebuggerEventExtraInfo, onMounted, onUpdated, ref } from "vue";
import { BackgroundType } from "../classes/backgroundType";
import { useStore } from "../stores";

const store = useStore();
const canvas = ref<HTMLCanvasElement>();
const cursorPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });

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
  store.temporaryLayer?.render?.(bufferCtx, store.scale);

  ctx.canvas.width = ctx.canvas.width;

  ctx.drawImage(buffer, 0, 0);

  if (store.currentCommand.isDrawable) {
    ctx.fillStyle = store.currentColor.hex;
    const tempPosition = calculateRelativePosition(
      cursorPosition.value as MouseEvent
    );
    if (
      tempPosition.x >= 0 &&
      tempPosition.x < ctx.canvas.width &&
      tempPosition.y >= 0 &&
      tempPosition.y < ctx.canvas.height
    )
      ctx.fillRect(
        tempPosition.x - (tempPosition.x % store.scale),
        tempPosition.y - (tempPosition.y % store.scale),
        store.scale,
        store.scale
      );
  }

  requestAnimationFrame(render);
  // buffer.remove();
}, 50);

const calculateRelativePosition = (
  event: MouseEvent
): { x: number; y: number } => {
  const rectCanvas = canvas.value!.getClientRects()?.[0];

  return { x: event.x - rectCanvas.x, y: event.y - rectCanvas.y };
};
const handleMouseMove = debounce((event: MouseEvent) => {
  store.command[store.currentCommandIndex].drag?.(
    calculateRelativePosition(event)
  );
}, 5);
const handleMouseUp = (event: MouseEvent) => {
  store.command[store.currentCommandIndex].clickEnd?.(
    calculateRelativePosition(event)
  );
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

const handleClick = async (event: MouseEvent) => {
  if (!store.currentLayer?.isVisible || !store.isTotalLayerVisible) return;
  await store.command[store.currentCommandIndex].clickStart?.(
    calculateRelativePosition(event)
  );
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

document.addEventListener(
  "mousemove",
  debounce((event: MouseEvent) => {
    cursorPosition.value = { x: event?.x ?? 0, y: event?.y ?? 0 };
  }, 5)
);

onUpdated(render);
onMounted(render);
</script>

<template>
  <div
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
      :style="
        !store.currentLayer?.isLocked
          ? { cursor: store.currentCommand.cursor }
          : { cursor: 'not-allowed' }
      "
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

.canvas {
  user-drag: none;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.cursor-not-allowed {
  pointer-events: none;
  cursor: not-allowed;
}
</style>
