export interface Commandable {
  clickStart(position: { x: number; y: number }): void;
  clickEnd(position: { x: number; y: number }): void;
  drag(position: { x: number; y: number }): void;
}

export class Command implements Commandable {
  readonly name: string;
  readonly icon: string;
  readonly cursor: string;
  readonly isDrawable: boolean;

  readonly clickStart: (position: { x: number; y: number }) => void;
  readonly clickEnd: (position: { x: number; y: number }) => void;
  readonly drag: (position: { x: number; y: number }) => void;
  // lastPoint: { x: number | null; y: number | null };

  constructor(data: {
    name: string;
    icon: string;
    cursor: string;
    isDrawable?: boolean;
    commandable: Commandable;
  }) {
    this.name = data.name;
    this.icon = data.icon;
    this.cursor = data.cursor;
    this.isDrawable = data.isDrawable ?? true;
    this.clickStart = data.commandable.clickStart;
    this.clickEnd = data.commandable.clickEnd;
    this.drag = data.commandable.drag;
    // this.lastPoint = { x: null, y: null };
  }
}
