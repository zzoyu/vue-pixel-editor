<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(true);
const props = defineProps({
  isPadded: { type: Boolean, required: false, default: true },
});
</script>

<template>
  <div class="grid grid-cols-1 divide-y divide-slate-300">
    <div
      class="px-3 flex flex-row justify-between cursor-pointer"
      @click.stop="isOpen = !isOpen"
    >
      <h5 class="min-w-max flex flex-row items-center text-lg">
        <slot name="title"></slot>
      </h5>
      <div class="flex flex-row items-center">
        <div class="flex flex-row items-center mr-2">
          <slot name="button"></slot>
        </div>
        <button v-if="isOpen">-</button>
        <button v-else>+</button>
      </div>
    </div>
    <div :class="{ 'p-3': isPadded }" v-if="isOpen">
      <slot></slot>
    </div>
    <div></div>
  </div>
</template>
