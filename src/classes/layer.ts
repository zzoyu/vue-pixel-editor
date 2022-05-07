import Drawable from "./drawable";
import Pixel from "./pixel";

export class Layer extends Drawable {
  pixels: Array<Pixel>;
  opacity: number;
  isVisible: boolean;
  isLocked: boolean;

  constructor() {
    super();
    this.pixels = new Array<Pixel>();
    this.opacity = 100;
    this.isVisible = true;
    this.isLocked = false;
  }

  render(renderer: (pixel: Pixel) => void): void {
    if (!this.isVisible) return;

    for (const pixel of this.pixels) {
      pixel.render(renderer);
    }
  }

  setOpacity(value: number) {
    this.opacity = value;
  }

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  lock() {
    this.isLocked = true;
  }

  unLock() {
    this.isLocked = false;
  }
}
