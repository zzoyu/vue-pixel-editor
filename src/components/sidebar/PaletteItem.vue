<script setup lang="ts">
import Color from "../../classes/color";

const props = defineProps({ color: Color, selected: Boolean });
</script>

<template>
  <div
    class="w-4 h-4 outline hover:outline-dashed rounded-sm"
    :class="{ 'outline-double': selected, 'outline-1': !selected }"
    :style="{
      backgroundColor: props.color.hex,
    }"
  >
    <!-- {{ color?.hex }} -->
  </div>
</template>
