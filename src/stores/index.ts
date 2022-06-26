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
      temporaryLayer: null as Layer | null, //new Layer({ width, height }, -1),
      temporaryPosition: null as { x: number; y: number } | null,
      isTotalLayerVisible: true,
      currentCommandIndex,
      command,
    };
  },

  getters: {
    currentCommand: (state) => state.command[state.currentCommandIndex],
    currentColor: (state) => {
      return state.palette[state.selectedPalette][state.selectedColor];
    },
    currentPalette: (state) => {
      return state.palette[state.selectedPalette];
    },
    currentLayer: (state) =>
      state.layer.find((i) => i.id === state.selectedLayer),
    paletteNameList: (state) => state.palette.map((i) => i.name),

    canvasWidth: (state) => state.scale * state.width,
    canvasHeight: (state) => state.scale * state.height,
    visibleLayerList: (state) =>
      state.isTotalLayerVisible
        ? state.layer.filter((i) => i.isVisible).reverse()
        : [],
    visibleLayerCount: (state) => state.layer.filter((i) => i.isVisible).length,
  },

  actions: {
    handleDraw(
      position: { x: number; y: number },
      drawFunction: (x: number, y: number) => void
    ) {
      const resultPosition = this.calculatePosition(position.x, position.y);

      if (!resultPosition) return;

      drawFunction(resultPosition.x, resultPosition.y);
    },
    calculatePosition(x: number, y: number) {
      const resultX = Math.floor(x / this.scale);
      const resultY = Math.floor(y / this.scale);

      if (
        resultX < 0 ||
        resultX >= this.width ||
        resultY < 0 ||
        resultY >= this.height
      )
        return null;

      return { x: resultX, y: resultY };
    },
    initializeCommand() {
      const startTemporaryDraw = (position: { x: number; y: number }) => {
        this.handleDraw(position, this.startTemporaryDraw.bind(this));
      };

      const moveLine = (position: { x: number; y: number }) => {
        this.handleDraw(position, this.moveLine.bind(this));
      };

      const drawLine = (position: { x: number; y: number }) => {
        this.handleDraw(position, this.applyTemporaryDraw.bind(this));
      };

      const moveRectangle = (position: { x: number; y: number }) => {
        this.handleDraw(position, this.moveRectangle.bind(this));
      };

      const drawRectangle = (position: { x: number; y: number }) => {
        this.handleDraw(position, this.applyTemporaryDraw.bind(this));
      };

      this.command.push(
        new Command({
          name: "펜",
          icon: "edit",
          cursor:
            "url('https://api.iconify.design/pixelarticons/edit.svg') 0 16, auto",
          commandable: {
            clickStart: (position) =>
              this.handleDraw(position, this.drawPixel.bind(this)),
            clickEnd: () => {},
            drag: (position) =>
              this.handleDraw(position, this.drawPixel.bind(this)),
          },
        })
      );
      this.command.push(
        new Command({
          name: "지우개",
          icon: "layout-sidebar-left",
          cursor:
            "url('https://api.iconify.design/pixelarticons/layout-sidebar-left.svg') 0 8, auto",
          isDrawable: false,
          commandable: {
            clickStart: (position) =>
              this.handleDraw(position, this.erasePixel.bind(this)),
            clickEnd: () => {},
            drag: (position) =>
              this.handleDraw(position, this.erasePixel.bind(this)),
          },
        })
      );
      this.command.push(
        new Command({
          name: "직선",
          icon: "minus",
          cursor: "crosshair",
          commandable: {
            clickStart: startTemporaryDraw,
            clickEnd: drawLine,
            drag: moveLine,
          },
        })
      );
      this.command.push(
        new Command({
          name: "직사각형",
          icon: "checkbox-on",
          cursor: "crosshair",
          commandable: {
            clickStart: startTemporaryDraw,
            clickEnd: drawRectangle,
            drag: moveRectangle,
          },
        })
      );
      this.command.push(
        new Command({
          name: "원(구현X)",
          icon: "circle",
          cursor: "crosshair",
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
          icon: "fill-half",
          cursor:
            "url('https://api.iconify.design/pixelarticons/fill-half.svg') 16 16, auto",
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
          cursor: "crosshair",
          isDrawable: false,
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
          cursor: "move",
          isDrawable: false,
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
      if (this.layer[index].id === this.selectedLayer)
        this.selectedLayer =
          this.layer?.[index + 1]?.id ?? this.layer?.[index - 1]?.id;

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
      this.currentLayer?.addPixel?.(new Pixel(this.currentColor, x, y));
    },
    erasePixel(x: number, y: number) {
      this.currentLayer?.removePixel?.(x, y);
    },
    startTemporaryDraw(x: number, y: number) {
      this.temporaryPosition = { x, y };
    },
    moveLine(x: number, y: number) {
      if (!this.temporaryPosition)
        throw new Error("ERROR: there is no temporary position");
      this.updateTemporaryDraw();

      const dx = x - this.temporaryPosition.x;
      const dy = y - this.temporaryPosition.y;

      if (Math.abs(dx) >= Math.abs(dy)) {
        const step = dx >= 0 ? 1 : -1;
        for (
          let lineX = this.temporaryPosition.x;
          lineX != x + step;
          lineX += step
        ) {
          let lineY = this.temporaryPosition.y;

          if (dx !== 0) {
            lineY += Math.round(dy * ((lineX - this.temporaryPosition.x) / dx));
          }

          try {
            this.temporaryLayer?.addPixel?.(
              new Pixel(this.currentColor, lineX, lineY)
            );
          } catch (error) {
            console.log(this.temporaryPosition, { dx, dy, lineX, lineY, x, y });
          }
        }
      } else {
        const step = dy >= 0 ? 1 : -1;

        for (
          let lineY = this.temporaryPosition.y;
          lineY != y + step;
          lineY += step
        ) {
          let lineX = this.temporaryPosition.x;

          if (dy !== 0) {
            lineX += Math.round(dx * ((lineY - this.temporaryPosition.y) / dy));
          }

          try {
            this.temporaryLayer?.addPixel?.(
              new Pixel(this.currentColor, lineX, lineY)
            );
          } catch (error) {
            console.log(this.temporaryPosition, { dx, dy, lineX, lineY, x, y });
          }
        }
      }
    },
    applyTemporaryDraw() {
      if (!this.temporaryPosition) return;
      this.temporaryPosition = null;
      if (!this.temporaryLayer || !this.currentLayer) return;
      this.mergeLayer(this.temporaryLayer, this.currentLayer);
      this.temporaryLayer = null;
    },
    updateTemporaryDraw() {
      this.temporaryLayer = new Layer(
        { width: this.width, height: this.height },
        -1
      );
    },
    moveRectangle(x: number, y: number) {
      if (!this.temporaryPosition)
        throw new Error("ERROR: there is no temporary position");
      this.updateTemporaryDraw();

      const left = Math.min(this.temporaryPosition.x, x);
      const top = Math.max(this.temporaryPosition.y, y);
      const right = Math.max(this.temporaryPosition.x, x);
      const bottom = Math.min(this.temporaryPosition.y, y);

      for (let pixelY = bottom; pixelY <= top; pixelY++) {
        try {
          this.temporaryLayer?.addPixel?.(
            new Pixel(this.currentColor, left, pixelY)
          );
          this.temporaryLayer?.addPixel?.(
            new Pixel(this.currentColor, right, pixelY)
          );
        } catch (error) {
          console.error(error);
        }
      }

      // 귀퉁이 중복 제거
      for (let pixelX = left + 1; pixelX < right; pixelX++) {
        try {
          this.temporaryLayer?.addPixel?.(
            new Pixel(this.currentColor, pixelX, top)
          );
          this.temporaryLayer?.addPixel?.(
            new Pixel(this.currentColor, pixelX, bottom)
          );
        } catch (error) {
          console.error(error);
        }
      }
    },
    mergeLayer(source: Layer, destination: Layer) {
      destination.merge(source);
    },
  },
});
