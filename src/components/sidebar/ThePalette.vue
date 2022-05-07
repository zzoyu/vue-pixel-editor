<script setup lang="ts">
import { useStore } from "../../stores";

import BasePane from "../UI/BasePane.vue";
import PaletteItem from "./PaletteItem.vue";
const store = useStore();
</script>

<template>
  <BasePane>
    <template #title>PALETTE</template>
    <h3>{{ store.palette.name }}</h3>
    <small>by {{ store.palette.author }}</small>
    <div class="grid grid-flow-row grid-cols-9 gap-1 max-w-fit">
      <PaletteItem
        v-for="(color, index) in store.palette"
        @click.self="store.selectedColor = index"
        :color="color"
        :selected="store.selectedColor === index"
        :key="color.hex"
      ></PaletteItem>
    </div>
  </BasePane>
</template>

<style scoped></style>
