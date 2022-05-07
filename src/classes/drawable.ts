import Pixel from "./pixel";

export default abstract class Drawable {
  abstract render(renderer: (pixel: Pixel) => void): void;
}
