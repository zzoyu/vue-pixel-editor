<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useStore } from "../stores";
import BaseButtonSidebarToolbar from "./UI/BaseButtonSidebarToolbar.vue";
const store = useStore();
store.initializeCommand();
</script>

<template>
  <div class="left-0.5 inline-grid gap-0.5 items-center content-center my-auto">
    <BaseButtonSidebarToolbar
      v-for="(command, index) in store.command"
      :key="`command_${index}`"
      :is-active="index === store.currentCommandIndex"
      :command="command"
      @click="store.setCurrentCommandIndex(index)"
    ></BaseButtonSidebarToolbar>
  </div>
</template>
