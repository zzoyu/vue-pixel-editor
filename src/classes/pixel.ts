import Color from "./color";
import Drawable from "./drawable";

export default class Pixel extends Drawable {
  color: Color;
  x: number;
  y: number;

  constructor(color: Color, x: number, y: number) {
    super();
    this.color = color;
    this.x = x;
    this.y = y;
  }

  render(renderer: (pixel: Pixel) => void) {
    renderer(this);
  }
}
