import { defineStore } from "pinia";
import Palette from "../classes/palette";

import ArcadeStandard29 from "../data/ARCADE_STANDARD_29.json";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("index", {
  // other options...

  state: () => {
    const palette = Palette.fromJSON(ArcadeStandard29);

    return {
      scale: 0,
      palette: palette,
      selectedColor: 0,
    };
  },
});
