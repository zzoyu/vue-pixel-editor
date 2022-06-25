import Drawable from "./drawable";
import Pixel from "./pixel";

export class Layer extends Drawable {
  pixels: Array<Array<Pixel | null>>;
  opacity: number;
  isVisible: boolean;
  isLocked: boolean;
  name: string;
  id: number;
  static index: number = 0;

  constructor(
    size: { width: number; height: number },
    index: number = Layer.index + 1
  ) {
    super();

    // 캔버스 크기만큼 레이어 생성
    this.pixels = new Array<Array<Pixel | null>>(size.height)
      .fill(null)
      .map(() => new Array<Pixel | null>(size.width));
    // console.log(this.pixels);
    this.opacity = 100;
    this.isVisible = true;
    this.isLocked = false;
    this.name = `레이어 ${index}`;
    this.id = index;
    Layer.index++;
  }

  resize(width: number, height: number) {
    // if( this.width > width || this.height > height ) {
    //   if(!alert("경고", "변경하려고 하는 캔버스 사이즈가 실제 캔버스 사이즈보다 작습니다. 진행하시겠습니까?")) return;
    // }

    const removeWidth = this.pixels[0].length - width;
    const removeHeight = this.pixels.length - height;

    if (removeWidth !== 0) {
      for (const row of this.pixels) {
        if (removeWidth) row.splice(row.length - 1, -removeWidth);
        else row.push(new Array<Pixel | null>(Math.abs(removeWidth)));
      }
    }

    if (removeHeight > 0) {
      this.pixels.splice(this.pixels.length - 1 - removeHeight, removeHeight);
    } else if (removeHeight < 0) {
      this.pixels.push(
        new Array<Array<Pixel | null>>(Math.abs(removeHeight))
          .fill(null)
          .map(() => new Array<Pixel | null>(width))
      );
    }
  }

  addPixel(pixel: Pixel) {
    this.pixels[pixel.y][pixel.x] = pixel;
  }

  render(context: CanvasRenderingContext2D, scale: number): void {
    if (!this.isVisible) return;

    for (const row of this.pixels) {
      for (const pixel of row) {
        pixel?.render?.(context, scale);
      }
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
