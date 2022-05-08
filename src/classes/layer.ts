import Drawable from "./drawable";
import Pixel from "./pixel";

export class Layer extends Drawable {
  pixels: Array<Pixel>;
  opacity: number;
  isVisible: boolean;
  isLocked: boolean;
  name: string;
  id: number;
  static index: number = 0;

  constructor(index: number = Layer.index + 1) {
    super();
    this.pixels = new Array<Pixel>();
    this.opacity = 100;
    this.isVisible = true;
    this.isLocked = false;
    this.name = `레이어 ${index}`;
    this.id = index;
    Layer.index++;
  }

  addPixel(pixel: Pixel) {
    const duplicatePixel = this.pixels.findIndex(
      (i) => i.x === pixel.x && i.y === pixel.y
    );
    if (duplicatePixel >= 0) {
      this.pixels[duplicatePixel] = pixel;
      return;
    }
    this.pixels.push(pixel);
  }

  render(context: CanvasRenderingContext2D, scale: number): void {
    if (!this.isVisible) return;

    for (const pixel of this.pixels) {
      pixel.render(context, scale);
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
