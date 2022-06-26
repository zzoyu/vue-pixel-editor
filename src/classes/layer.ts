import Color from "./color";
import Drawable from "./drawable";
import Pixel from "./pixel";

export class Layer extends Drawable {
  pixels: Array<Array<Pixel | null>>;
  opacity: number;
  isVisible: boolean;
  isLocked: boolean;
  name: string;
  id: number;
  width: number;
  height: number;
  static index: number = 0;

  constructor(
    size: { width: number; height: number },
    index: number = Layer.index + 1
  ) {
    super();

    this.width = size.width;
    this.height = size.height;

    // 캔버스 크기만큼 레이어 생성
    this.pixels = new Array<Array<Pixel | null>>(size.height)
      .fill([])
      .map(() => new Array<Pixel | null>(size.width).fill(null));
    // console.log(this.pixels);
    this.opacity = 100;
    this.isVisible = true;
    this.isLocked = false;
    this.name = `레이어 ${index}`;
    this.id = index;
    if (index >= 0)
      // -1 레이어는 카운트하지 않도록 하였습니다.
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
        else row.push(...new Array<Pixel | null>(Math.abs(removeWidth)));
      }
    }

    if (removeHeight > 0) {
      this.pixels.splice(this.pixels.length - 1 - removeHeight, removeHeight);
    } else if (removeHeight < 0) {
      this.pixels.push(
        ...new Array<Array<Pixel | null>>(Math.abs(removeHeight))
          .fill([])
          .map(() => new Array<Pixel | null>(width).fill(null))
      );
    }
  }

  addPixel(pixel: Pixel) {
    try {
      this.pixels[pixel.y][pixel.x] = pixel;
    } catch (error) {
      console.error(pixel);
      throw new Error("PIXEL CREATION ERROR");
    }
  }

  removePixel(x: number, y: number) {
    delete this.pixels[y][x];
  }

  fillPixel(x: number, y: number, color: Color) {
    if (isNaN(x) || isNaN(y)) return;
    const threshold = this.pixels[y][x]?.color; // 같은 색상은 채우기 처리

    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    const nextPositions = new Array<{ x: number; y: number }>();
    const visitedPositions = new Array<{ x: number; y: number }>();

    nextPositions.push({ x, y }); // 출발 위치 지정

    while (nextPositions.length !== 0) {
      const currentPosition = nextPositions.pop() as { x: number; y: number };

      visitedPositions.push(currentPosition);
      this.pixels[currentPosition.y][currentPosition.x] = new Pixel(
        color,
        currentPosition.x,
        currentPosition.y
      );

      for (const direction of directions) {
        const checkingPosition = {
          x: currentPosition.x + direction[0],
          y: currentPosition.y + direction[1],
        };

        // 바운더리 체크
        if (checkingPosition.x >= this.width || checkingPosition.x < 0)
          continue;
        if (checkingPosition.y >= this.height || checkingPosition.y < 0)
          continue;

        const checkingPixel =
          this.pixels[checkingPosition.y][checkingPosition.x];

        // 빈 공간에 채우기를 시도했거나 최초 시작점과 같은 색상인지, 방문했는지 체크
        if (
          visitedPositions.find(
            (i) => i.x === checkingPosition.x && i.y === checkingPosition.y
          )
        )
          continue;
        if (
          (!threshold && !checkingPixel) ||
          checkingPixel?.color.hex === threshold?.hex
        ) {
          nextPositions.push(checkingPosition);
        } else visitedPositions.push(checkingPosition);
      }
    }
  }

  render(context: CanvasRenderingContext2D, scale: number): void {
    if (!this.isVisible) return;

    for (const row of this.pixels) {
      for (const pixel of row) {
        pixel?.render?.(context, scale);
      }
    }
  }

  merge(source: Layer) {
    for (const row of source.pixels) {
      for (const pixel of row) {
        if (!pixel) continue;
        this.pixels[pixel?.y][pixel?.x] = pixel;
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
