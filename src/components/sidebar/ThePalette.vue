<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "../../stores";

import BasePane from "../UI/BasePane.vue";
import PaletteItem from "./PaletteItem.vue";

const store = useStore();
const selectedPalette = computed({
  get: () => store.selectedPalette,
  set: (value: number) => store.updateSelectedPalette(value),
});
</script>

<template>
  <BasePane>
    <template #title>
      PALETTE
      <div
        class="mx-1 w-3 h-3 rounded ring-1 ring-slate-300"
        :style="{ backgroundColor: store.currentColor.hex }"
      ></div>
    </template>

    <h3>{{ store.currentPalette.name }}</h3>
    <small>by {{ store.currentPalette.author }}</small>
    <div class="grid grid-flow-row grid-cols-9 gap-1 max-w-fit">
      <PaletteItem
        v-for="(color, index) in store.currentPalette"
        @click.self="store.selectedColor = index"
        :color="color"
        :selected="store.selectedColor === index"
        :key="color.hex"
      ></PaletteItem>
    </div>
    <select
      class="mt-3 max-w-max border-none outline outline-1 outline-slate-300 bg-slate-50"
      v-model="selectedPalette"
    >
      <option
        v-for="(name, index) in store.paletteNameList"
        :key="name"
        :value="index"
      >
        {{ name }}
      </option>
    </select>
  </BasePane>
</template>

<style scoped></style>
