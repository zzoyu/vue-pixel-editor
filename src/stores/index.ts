import { defineStore } from "pinia";
import { BackgroundType } from "../classes/backgroundType";
import { Layer } from "../classes/layer";
import Palette from "../classes/palette";
import Pixel from "../classes/pixel";

import ArcadeStandard29 from "../data/ARCADE_STANDARD_29.json";
import PICO8 from "../data/PICO-8.json";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("index", {
  // other options...

  state: () => {
    const palette = new Array<Palette>();
    palette.push(Palette.fromJSON(ArcadeStandard29));
    palette.push(Palette.fromJSON(PICO8));

    const layer: Array<Layer> = [];
    layer.push(new Layer());

    return {
      scale: 32,
      width: 8,
      height: 8,
      backgroundType: BackgroundType.checker,
      palette,
      selectedPalette: 0,
      selectedColor: 0,
      selectedLayer: 0,
      layer,
    };
  },

  getters: {
    currentColor: (state) => {
      return state.palette[state.selectedPalette][state.selectedColor];
    },
    currentPalette: (state) => {
      return state.palette[state.selectedPalette];
    },
    paletteNameList: (state) => state.palette.map((i) => i.name),
    // 볼 수 있는 레이어가 하나라도 존재하면 참
    isLayerVisible: (state) =>
      state.layer.find((i) => i?.isVisible) ? true : false,
    canvasWidth: (state) => state.scale * state.width,
    canvasHeight: (state) => state.scale * state.height,
    visibleLayerList: (state) => state.layer.filter((i) => i.isVisible),
  },

  actions: {
    updateSelectedPalette(index: number) {
      this.selectedPalette = index;
      this.selectedColor = 0;
    },
    addLayer() {
      this.layer.unshift(new Layer());
    },
    deleteLayer(index: number) {
      this.layer.splice(index, 1);
    },
    hideAll() {
      this.layer.forEach((i) => i.hide());
    },
    showAll() {
      this.layer.forEach((i) => i.show());
    },
    exchangeLayerIndex(from: number, to: number) {
      if (from === to || from < 0 || to < 0) return;
      const [temp] = this.layer.splice(from, 1);
      this.layer.splice(to, 0, temp);
    },
    changeBackground() {
      this.backgroundType =
        this.backgroundType === BackgroundType.white
          ? BackgroundType.transparent
          : this.backgroundType + 1;
    },
    drawPixel(x: number, y: number) {
      console.log(this.layer);
      this.layer[this.selectedLayer].addPixel(
        new Pixel(this.currentColor, x, y)
      );
    },
  },
});
