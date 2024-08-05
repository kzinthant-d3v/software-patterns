// Flyweight interface
interface TreeType {
  draw(x: number, y: number): void;
}

// Concrete Flyweight: TreeType
class ConcreteTreeType implements TreeType {
  private texture: string;
  private color: string;

  constructor(texture: string, color: string) {
    this.texture = texture;
    this.color = color;
  }

  public draw(x: number, y: number): void {
    console.log(`Drawing tree at (${x}, ${y}) with texture '${this.texture}' and color '${this.color}'`);
  }
}

// Flyweight Factory
class TreeTypeFactory {
  private treeTypes: Map<string, ConcreteTreeType> = new Map();

  public getTreeType(texture: string, color: string): TreeType {
    const key = `${texture}-${color}`;
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new ConcreteTreeType(texture, color));
    }
    return this.treeTypes.get(key) as TreeType;
  }
}

// Extrinsic state: Tree
class Tree {
  private x: number;
  private y: number;
  private treeType: TreeType;

  constructor(x: number, y: number, treeType: TreeType) {
    this.x = x;
    this.y = y;
    this.treeType = treeType;
  }

  public draw(): void {
    this.treeType.draw(this.x, this.y);
  }
}

// Usage
const treeFactory = new TreeTypeFactory();
const forest: Tree[] = [];

// Create trees with shared types
const oakType = treeFactory.getTreeType("OakTexture", "Green");
forest.push(new Tree(0, 0, oakType));
forest.push(new Tree(1, 0, oakType));
forest.push(new Tree(0, 1, oakType));

const pineType = treeFactory.getTreeType("PineTexture", "DarkGreen");
forest.push(new Tree(2, 2, pineType));
forest.push(new Tree(3, 2, pineType));

// Draw all trees in the forest
forest.forEach(tree => tree.draw());

// Output:
// Drawing tree at (0, 0) with texture 'OakTexture' and color 'Green'
// Drawing tree at (1, 0) with texture 'OakTexture' and color 'Green'
// Drawing tree at (0, 1) with texture 'OakTexture' and color 'Green'
// Drawing tree at (2, 2) with texture 'PineTexture' and color 'DarkGreen'
// Drawing tree at (3, 2) with texture 'PineTexture' and color 'DarkGreen'
