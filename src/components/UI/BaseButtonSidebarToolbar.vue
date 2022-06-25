<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { Command } from "../../classes/command";

const props = defineProps({
  command: { type: Command, required: true },
  isActive: { type: Boolean, required: false, default: false },
});

const isMouseHovered = ref(false);
</script>

<template>
  <button
    @mouseenter="isMouseHovered = true"
    @mouseleave="isMouseHovered = false"
    class="w-8 h-8 outline outline-1 outline-slate-300 rounded-sm flex justify-center items-center bg-slate-50"
    :class="{
      'outline-double outline-4 z-10': isActive,
      'outline-1 hover:outline-dashed': !isActive,
    }"
  >
    <Icon :icon="`pixelarticons:${command.icon}`" />
    <span
      v-if="isMouseHovered"
      class="absolute outline outline-1 bg-white w-max ml-8 translate-x-1/2"
      >{{ command.name }}</span
    >
  </button>
</template>
