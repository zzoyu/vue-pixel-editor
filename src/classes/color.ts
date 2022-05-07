export default class Color {
  hex: string;
  r: number;
  g: number;
  b: number;
  a: number;

  constructor() {
    this.hex = "";
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
  }

  static fromHexString(hex: string): Color {
    let instance = new Color();
    const tempHex = hex.replace("#", "");
    const parsedColor = [];
    for (let start = 0, end = 2; end < hex.length; start += 2, end += 2) {
      parsedColor.push(tempHex.slice(start, end));
    }

    instance.hex = hex;
    instance.r = parseInt(parsedColor[0], 16);
    instance.g = parseInt(parsedColor[1], 16);
    instance.b = parseInt(parsedColor[2], 16);
    instance.a = parseInt(parsedColor?.[3] ?? "FF", 16);

    return instance;
  }

  static fromRGBANumber(
    r: number,
    g: number,
    b: number,
    a: number = 255
  ): Color {
    let instance = new Color();
    instance.hex = `#${
      r.toString(16) + g.toString(16) + b.toString(16) + a.toString(16)
    }`;
    instance.r = r;
    instance.g = g;
    instance.b = b;
    instance.a = a;

    return instance;
  }
}
