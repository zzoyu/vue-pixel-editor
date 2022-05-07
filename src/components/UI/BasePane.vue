<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(true);
</script>

<template>
  <div class="grid grid-cols-1 divide-y">
    <div
      class="px-3 flex flex-row justify-between cursor-pointer"
      @click.self="isOpen = !isOpen"
    >
      <h5 class="w-min"><slot name="title"></slot></h5>
      <button v-if="isOpen">-</button>
      <button v-else>+</button>
    </div>
    <div class="p-3" v-if="isOpen">
      <slot></slot>
    </div>
    <div></div>
  </div>
</template>
