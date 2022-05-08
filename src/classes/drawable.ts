import Pixel from "./pixel";

export default abstract class Drawable {
  abstract render(context: CanvasRenderingContext2D, scale: number): void;
}
