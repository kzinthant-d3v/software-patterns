// Component interface
interface FileSystemComponent {
  getName(): string;
  getSize(): number;
  print(indent: string): void;
}


// Leaf component: File
class IndivitualFile implements FileSystemComponent {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    return this.size;
  }

  public print(indent: string = ""): void {
    console.log(`${indent}- File: ${this.name} (${this.size} KB)`);
  }
}

// Composite component: Directory
class Directory implements FileSystemComponent {
  private name: string;
  private components: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    return this.components.reduce((totalSize, component) => totalSize + component.getSize(), 0);
  }

  public add(component: FileSystemComponent): void {
    this.components.push(component);
  }

  public remove(component: FileSystemComponent): void {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }

  public print(indent: string = ""): void {
    console.log(`${indent}+ Directory: ${this.name}`);
    this.components.forEach((component) => component.print(indent + "  "));
  }
}

// Usage
const rootDirectory = new Directory("root");
const homeDirectory = new Directory("home");
const userDirectory = new Directory("user");
const file1 = new IndivitualFile("file1.txt", 10);
const file2 = new IndivitualFile("file2.txt", 20);
const file3 = new IndivitualFile("file3.txt", 30);

userDirectory.add(file1);
userDirectory.add(file2);
homeDirectory.add(userDirectory);
rootDirectory.add(homeDirectory);
rootDirectory.add(file3);

rootDirectory.print();

console.log(`Total size of root directory: ${rootDirectory.getSize()} KB`);

// Component interface
interface Graphic {
  draw(): void;
  move(x: number, y: number): void;
}

// Leaf component: Circle
class CircleGraphic implements Graphic {
  private x: number;
  private y: number;
  private radius: number;

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  public draw(): void {
    console.log(`Drawing a circle at (${this.x}, ${this.y}) with radius ${this.radius}`);
  }

  public move(x: number, y: number): void {
    this.x += x;
    this.y += y;
    console.log(`Moved circle to (${this.x}, ${this.y})`);
  }
}

// Leaf component: Square
class SquareGraphic implements Graphic {
  private x: number;
  private y: number;
  private side: number;

  constructor(x: number, y: number, side: number) {
    this.x = x;
    this.y = y;
    this.side = side;
  }

  public draw(): void {
    console.log(`Drawing a square at (${this.x}, ${this.y}) with side ${this.side}`);
  }

  public move(x: number, y: number): void {
    this.x += x;
    this.y += y;
    console.log(`Moved square to (${this.x}, ${this.y})`);
  }
}

// Composite component: Group
class Group implements Graphic {
  private children: Graphic[] = [];

  public add(graphic: Graphic): void {
    this.children.push(graphic);
  }

  public remove(graphic: Graphic): void {
    const index = this.children.indexOf(graphic);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  public draw(): void {
    console.log("Drawing a group of graphics:");
    this.children.forEach((child) => child.draw());
  }

  public move(x: number, y: number): void {
    console.log(`Moving a group of graphics by (${x}, ${y}):`);
    this.children.forEach((child) => child.move(x, y));
  }
}

// Usage
const circle1 = new CircleGraphic(0, 0, 5);
const square1 = new SquareGraphic(1, 1, 10);
const group1 = new Group();
group1.add(circle1);
group1.add(square1);

const circle2 = new CircleGraphic(2, 2, 8);
const group2 = new Group();
group2.add(circle2);
group2.add(group1);

console.log("Initial drawing:");
group2.draw();

console.log("\nMove the entire group:");
group2.move(3, 3);
group2.draw();
