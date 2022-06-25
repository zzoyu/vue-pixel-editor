<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Command } from "../../classes/command";

const props = defineProps({
  command: { type: Command, required: true },
  isActive: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <button
    class="w-8 h-8 outline outline-1 outline-slate-300 rounded-sm flex justify-center items-center bg-slate-50"
    :class="{
      'outline-double outline-4 z-10': isActive,
      'outline-1 hover:outline-dashed': !isActive,
    }"
  >
    <Icon :icon="`pixelarticons:${command.icon}`" />
  </button>
</template>
