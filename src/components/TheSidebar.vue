<script setup lang="ts">
import { ref } from "vue";
import ThePalette from "./sidebar/ThePalette.vue";
import TheLayer from "./sidebar/TheLayer.vue";
import TheLogo from "./TheLogo.vue";
import TheSidebarToolbar from "./TheSidebarToolbar.vue";

const isShow = ref(true);
</script>

<template>
  <div
    class="drop-shadow-lg w-48 py-4 bg-slate-50 rounded transition-all flex-col flex-shrink-0 items-stretch"
    :class="{ '-ml-48': !isShow }"
  >
    <button
      v-if="isShow"
      class="p-3 absolute top-0 left-48 -translate-x-full"
      @click="isShow = !isShow"
    >
      {{ "<" }}
    </button>

    <TheLogo></TheLogo>
    <ThePalette></ThePalette>
    <TheLayer :is-padded="false"></TheLayer>
    <!-- <button class="p-3 rounded-md border border-slate-300">Subscribe</button> -->
  </div>

  <button
    v-if="!isShow"
    class="p-3 absolute left-0 top-0 bg-slate-50 rounded z-10"
    @click="isShow = !isShow"
  >
    {{ ">" }}
  </button>

  <TheSidebarToolbar
    class="absolute h-full"
    :class="{ 'ml-48': isShow }"
  ></TheSidebarToolbar>
</template>
