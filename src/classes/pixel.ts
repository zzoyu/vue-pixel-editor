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
    console.log("new pixel");
  }

  render(context: CanvasRenderingContext2D, scale: number) {
    console.log("render pixel");
    context.fillStyle = this.color.hex;
    context.fillRect(this.x * scale, this.y * scale, scale, scale);
  }
}
