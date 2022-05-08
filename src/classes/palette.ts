import Color from "./color";

export default class Palette extends Array<Color> {
  name: string;
  author: string;

  constructor() {
    super();
    this.name = "";
    this.author = "";
  }

  static fromJSON(jsonData: {
    name: string;
    author: string;
    type?: string;
    colors: Array<string | Array<number>>;
  }) {
    let instance = new Palette();
    instance.name = jsonData.name;
    instance.author = jsonData.author;
    if (jsonData.type === "rgb") {
      instance.push(
        ...Color.fromRGBAArray(jsonData.colors as Array<Array<number>>)
      );
    } else
      instance.push(...Color.fromHexArray(jsonData.colors as Array<string>));
    return instance;
  }
}
