import { defineStore } from "pinia";
import { BackgroundType } from "../classes/backgroundType";
import { Layer } from "../classes/layer";
import Palette from "../classes/palette";
import Pixel from "../classes/pixel";

import ArcadeStandard29 from "../data/ARCADE_STANDARD_29.json";
import PICO8 from "../data/PICO-8.json";
import DB32 from "../data/DB32.json";
import { Command } from "../classes/command";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("index", {
  // other options...

  state: () => {
    const palette = new Array<Palette>();
    palette.push(Palette.fromJSON(ArcadeStandard29));
    palette.push(Palette.fromJSON(PICO8));
    palette.push(Palette.fromJSON(DB32));

    const width = 16;
    const height = 16;

    const layer: Array<Layer> = [];
    layer.push(new Layer({ width, height }));

    const command: Array<Command> = [];

    const currentCommandIndex: number = 0;

    return {
      scale: 32,
      width,
      height,
      backgroundType: BackgroundType.checker,
      palette,
      selectedPalette: 0,
      selectedColor: 0,
      selectedLayer: layer[0].id,
      layer,
      isTotalLayerVisible: true,
      currentCommandIndex,
      command,
    };
  },

  getters: {
    currentColor: (state) => {
      return state.palette[state.selectedPalette][state.selectedColor];
    },
    currentPalette: (state) => {
      return state.palette[state.selectedPalette];
    },
    currentLayer: (state) =>
      state.layer.find((i) => i.id === state.selectedLayer),
    paletteNameList: (state) => state.palette.map((i) => i.name),
    // // 볼 수 있는 레이어가 하나라도 존재하면 참
    // isLayerVisible: (state) => {
    //   if (!state.isTotalLayerVisible) return false;
    //   if (state.layer.length === 0) return state.isTotalLayerVisible;
    //   return state.layer.find((i) => i?.isVisible) ? true : false;
    // },
    canvasWidth: (state) => state.scale * state.width,
    canvasHeight: (state) => state.scale * state.height,
    visibleLayerList: (state) =>
      state.isTotalLayerVisible
        ? state.layer.filter((i) => i.isVisible).reverse()
        : [],
    visibleLayerCount: (state) => state.layer.filter((i) => i.isVisible).length,
  },

  actions: {
    initializeCommand() {
      const drawPen = (position: { x: number; y: number }) => {
        const x = Math.floor(position.x / this.scale);
        const y = Math.floor(position.y / this.scale);

        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

        this.drawPixel(x, y);
      };
      this.command.push(
        new Command({
          name: "펜",
          icon: "edit",
          commandable: {
            clickStart: drawPen,
            clickEnd: () => {},
            drag: drawPen,
          },
        })
      );
      this.command.push(
        new Command({
          name: "지우개",
          icon: "layout-sidebar-left",
          commandable: {
            clickStart: () => {},
            clickEnd: () => {},
            drag: () => {},
          },
        })
      );
      this.command.push(
        new Command({
          name: "직선(구현X)",
          icon: "minus",
          commandable: {
            clickStart: () => {},
            clickEnd: () => {},
            drag: () => {},
          },
        })
      );
      this.command.push(
        new Command({
          name: "직사각형(구현X)",
          icon: "checkbox-on",
          commandable: {
            clickStart: () => {},
            clickEnd: () => {},
            drag: () => {},
          },
        })
      );
      this.command.push(
        new Command({
          name: "원(구현X)",
          icon: "circle",
          commandable: {
            clickStart: () => {},
            clickEnd: () => {},
            drag: () => {},
          },
        })
      );
      this.command.push(
        new Command({
          name: "채우기(구현X)",
          icon: "fill",
          commandable: {
            clickStart: () => {},
            clickEnd: () => {},
            drag: () => {},
          },
        })
      );
      this.command.push(
        new Command({
          name: "영역 선택(구현X)",
          icon: "section",
          commandable: {
            clickStart: () => {},
            clickEnd: () => {},
            drag: () => {},
          },
        })
      );
      this.command.push(
        new Command({
          name: "이동(구현X)",
          icon: "move",
          commandable: {
            clickStart: () => {},
            clickEnd: () => {},
            drag: () => {},
          },
        })
      );
    },
    setCurrentCommandIndex(commandIndex: number) {
      this.currentCommandIndex = commandIndex;
    },
    updateSelectedPalette(index: number) {
      this.selectedPalette = index;
      this.selectedColor = 0;
    },
    addLayer() {
      this.layer.unshift(new Layer({ width: this.width, height: this.height }));
      this.selectedLayer = this.layer[0].id;
    },
    deleteLayer(index: number) {
      this.layer.splice(index, 1);
    },
    hideLayer(index: number) {
      this.layer[index].show();
    },
    showLayer(index: number) {
      this.layer[index].hide();
    },
    hideAll() {
      this.isTotalLayerVisible = false;
      // this.layer.forEach((i) => i.hide());
    },
    showAll() {
      this.isTotalLayerVisible = true;
      // this.layer.forEach((i) => i.show());
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
      // console.log(this.layer);
      this.layer
        .find((i) => i.id === this.selectedLayer)
        ?.addPixel?.(new Pixel(this.currentColor, x, y));
    },
  },
});
