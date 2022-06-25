<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useStore } from "../../stores";

import BasePane from "../UI/BasePane.vue";
import LayerItem from "./LayerItem.vue";

const store = useStore();
</script>

<template>
  <BasePane>
    <template #title>LAYER</template>
    <template #button>
      <button @click.stop="store.addLayer()">
        <Icon icon="pixelarticons:add-box" />
      </button>
      <button v-if="store.isTotalLayerVisible" @click.stop="store.hideAll()">
        <Icon icon="pixelarticons:eye" />
      </button>
      <button v-else @click.stop="store.showAll()">
        <Icon icon="pixelarticons:eye-closed" />
      </button>
    </template>
    <!-- <h1>Hello, Layer!</h1> -->
    <div class="divide-y divide-slate-300">
      <LayerItem
        v-for="(layer, index) in store.layer"
        :key="`${layer.id}`"
        :data="layer"
        :is-selected="store.selectedLayer === layer.id"
        @delete-layer="store.deleteLayer(index)"
        @move-layer="(offset:number)=>store.exchangeLayerIndex(index, index + offset)"
        @click="store.selectedLayer = layer.id"
      ></LayerItem>
    </div>
  </BasePane>
</template>

<style scoped></style>
