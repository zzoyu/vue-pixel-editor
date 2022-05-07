import { defineStore } from "pinia";
import Color from "../classes/color";

import ArcadeStandard29 from "../data/ARCADE_STANDARD_29.json";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("index", {
  // other options...

  state: () => {
    const palette = [] as Array<Color>;

    for (const color of ArcadeStandard29) {
      palette.push(Color.fromHexString(color));
    }

    return {
      scale: 0,
      palette: palette,
      selectedColor: 0,
    };
  },
});
