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
    colors: Array<string>;
  }) {
    let instance = new Palette();
    instance.name = jsonData.name;
    instance.author = jsonData.author;
    instance.push(...Color.fromHexArray(jsonData.colors));
    return instance;
  }
}
