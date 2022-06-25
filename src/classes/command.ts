export interface Commandable {
  clickStart(): void;
  clickEnd(): void;
  drag(): void;
}

export class Command implements Commandable {
  readonly name: string;
  readonly icon: string;
  readonly clickStart: () => void;
  readonly clickEnd: () => void;
  readonly drag: () => void;

  constructor(data: { name: string; icon: string; commandable: Commandable }) {
    this.name = data.name;
    this.icon = data.icon;
    this.clickStart = data.commandable.clickStart;
    this.clickEnd = data.commandable.clickEnd;
    this.drag = data.commandable.drag;
  }
}
