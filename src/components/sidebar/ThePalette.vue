<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../../stores";

import BasePane from "../UI/BasePane.vue";
import PaletteItem from "./PaletteItem.vue";
const store = useStore();
</script>

<template>
  <BasePane>
    <template #title>PALETTE</template>
    <h1>Hello, Palette!</h1>
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
