<script setup lang="ts">
import { ref } from "vue";
import ThePalette from "./sidebar/ThePalette.vue";
import TheLayer from "./sidebar/TheLayer.vue";
import TheLogo from "./TheLogo.vue";

const isShow = ref(true);
</script>

<template>
  <div
    class="drop-shadow-lg w-48 py-4 bg-slate-50 rounded transition-all flex-col flex-shrink-0 items-stretch"
    :class="{ '-ml-48': !isShow }"
  >
    <button
      v-if="isShow"
      class="p-3 absolute right-0 top-0"
      @click="isShow = !isShow"
    >
      {{ "<" }}
    </button>
    <button
      v-else
      class="p-3 absolute -right-8 top-0 bg-slate-50 rounded"
      @click="isShow = !isShow"
    >
      {{ ">" }}
    </button>
    <TheLogo></TheLogo>
    <ThePalette></ThePalette>
    <TheLayer :is-padded="false"></TheLayer>
    <!-- <button class="p-3 rounded-md border border-slate-300">Subscribe</button> -->
  </div>
</template>
