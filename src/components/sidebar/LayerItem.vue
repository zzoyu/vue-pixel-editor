<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { Layer } from "../../classes/layer";
import { Icon } from "@iconify/vue";
import debounce from "lodash/debounce";

const isDragging = ref(false);
const isEditing = ref(false);

defineProps({
  data: {
    type: Layer,
    required: true,
    default: null,
  },
  isSelected: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits<{
  (event: "deleteLayer"): void;
  (event: "startDrag"): void;
  (event: "moveLayer", offset: number): void;
  (event: "endDrag"): void;
}>();

const deleteLayer = () => {
  if (confirm?.("해당 레이어를 삭제하시겠습니까?")) emit("deleteLayer");
};

const startMove = (event: MouseEvent) => {
  if (isDragging.value) return;
  isDragging.value = true;
  window.addEventListener("mouseup", endMove);
  window.addEventListener("mousemove", moveItem);
};

const endMove = () => {
  isDragging.value = false;
  window.removeEventListener("mouseup", endMove);
};

const moveItem = debounce((event: MouseEvent) => {
  if (!isDragging.value) return;

  const rowRect = row.value?.getBoundingClientRect();
  if (!rowRect) return;

  if (event.clientY > rowRect!.bottom) {
    emit(
      "moveLayer",
      Math.ceil((event.clientY - rowRect!.bottom) / rowRect!.height)
    );
  } else if (event.clientY < rowRect!.top) {
    emit(
      "moveLayer",
      -Math.ceil((rowRect!.top - event.clientY) / rowRect!.height)
    );
  }
}, 10);

const row = ref<HTMLElement>();
const editbox = ref<HTMLInputElement>();

watch(isEditing, () => {
  nextTick(() => editbox.value?.focus?.());
});
</script>

<template>
  <div
    class="flex flex-row justify-between px-1 py-1 items-center"
    ref="row"
    :class="{ 'opacity-50 cursor-move': isDragging }"
  >
    <button class="cursor-move" @mousedown="startMove" @click.stop="">
      <Icon icon="pixelarticons:menu" />
    </button>
    <h3
      v-if="!isEditing"
      class="max-w-fit flex flex-row items-center"
      :class="{
        'line-through': !data.isVisible,
        'font-extrabold underline': isSelected,
      }"
      @click.stop="!data.isLocked && (isEditing = true)"
    >
      {{ data.name
      }}<small v-if="data.isLocked"><Icon icon="pixelarticons:lock" /></small>
    </h3>
    <input
      v-else
      ref="editbox"
      type="text"
      class="w-20"
      @blur="isEditing = false"
      @keypress.enter="isEditing = false"
      v-model.lazy="data.name"
    />
    <div class="grid grid-flow-col gap-1 items-center">
      <button v-if="data.isVisible" @click.stop="data.hide()">
        <Icon icon="pixelarticons:eye" />
      </button>
      <button v-else @click.stop="data.show()">
        <Icon icon="pixelarticons:eye-closed" />
      </button>
      <button v-if="data.isLocked" @click.stop="data.unLock()">
        <Icon icon="pixelarticons:lock" />
      </button>
      <button v-else @click.stop="data.lock()">
        <Icon icon="pixelarticons:lock-open" />
      </button>
      <button @click.stop="deleteLayer">
        <Icon icon="pixelarticons:trash" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
