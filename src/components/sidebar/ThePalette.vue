<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "../../stores";

import BasePane from "../UI/BasePane.vue";
import PaletteItem from "./PaletteItem.vue";

const store = useStore();
const selectedPalette = computed(() => store.selectedPalette);
watch(selectedPalette, () => {
  store.selectedColor = 0;
});
</script>

<template>
  <BasePane>
    <template #title>PALETTE</template>

    <h3>{{ store.palette[selectedPalette].name }}</h3>
    <small>by {{ store.palette[selectedPalette].author }}</small>
    <div class="grid grid-flow-row grid-cols-9 gap-1 max-w-fit">
      <PaletteItem
        v-for="(color, index) in store.palette[selectedPalette]"
        @click.self="store.selectedColor = index"
        :color="color"
        :selected="store.selectedColor === index"
        :key="color.hex"
      ></PaletteItem>
    </div>
    <select class="mt-3 max-w-max" v-model="store.selectedPalette">
      <option
        v-for="(palette, index) in store.palette"
        :key="palette.name"
        :value="index"
      >
        {{ palette.name }}
      </option>
    </select>
  </BasePane>
</template>

<style scoped></style>
