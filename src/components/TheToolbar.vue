<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useStore } from "../stores";
const store = useStore();
</script>

<template>
  <div class="absolute flex w-full justify-center items-center">
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
    </div>
  </div>
</template>
