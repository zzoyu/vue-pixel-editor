import { defineStore } from "pinia";
import Palette from "../classes/palette";

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

    return {
      scale: 0,
      palette: palette,
      selectedPalette: 0,
      selectedColor: 0,
    };
  },
});
