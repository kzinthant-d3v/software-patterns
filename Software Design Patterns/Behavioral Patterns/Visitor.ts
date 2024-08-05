// Visitor -> I prefer Delegator
// Element interface
interface FileSystemElement {
  accept(visitor: FileSystemVisitor): void;
}

// Concrete Element: File
class File implements FileSystemElement {
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

  public accept(visitor: FileSystemVisitor): void {
    visitor.visitFile(this);
  }
}

// Concrete Element: Directory
class Directory implements FileSystemElement {
  private name: string;
  private elements: FileSystemElement[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public addElement(element: FileSystemElement): void {
    this.elements.push(element);
  }

  public getElements(): FileSystemElement[] {
    return this.elements;
  }

  public accept(visitor: FileSystemVisitor): void {
    visitor.visitDirectory(this);
  }
}

// Visitor interface
interface FileSystemVisitor {
  visitFile(file: File): void;
  visitDirectory(directory: Directory): void;
}


// Concrete Visitor: SizeCalculatorVisitor
class SizeCalculatorVisitor implements FileSystemVisitor {
  private totalSize: number = 0;

  public visitFile(file: File): void {
    this.totalSize += file.getSize();
  }

  public visitDirectory(directory: Directory): void {
    for (const element of directory.getElements()) {
      element.accept(this);
    }
  }

  public getTotalSize(): number {
    return this.totalSize;
  }
}

// Concrete Visitor: ListContentsVisitor
class ListContentsVisitor implements FileSystemVisitor {
  private contents: string[] = [];

  public visitFile(file: File): void {
    this.contents.push(file.getName());
  }

  public visitDirectory(directory: Directory): void {
    this.contents.push(directory.getName());
    for (const element of directory.getElements()) {
      element.accept(this);
    }
  }

  public getContents(): string[] {
    return this.contents;
  }
}

// Usage
const root = new Directory("root");
const file1 = new File("file1.txt", 100);
const file2 = new File("file2.txt", 200);
const subDir = new Directory("subdir");
const file3 = new File("file3.txt", 300);

root.addElement(file1);
root.addElement(file2);
subDir.addElement(file3);
root.addElement(subDir);

const sizeCalculator = new SizeCalculatorVisitor();
const listContents = new ListContentsVisitor();

console.log("Calculating total size:");
root.accept(sizeCalculator);
console.log(`Total Size: ${sizeCalculator.getTotalSize()} bytes`);
// Output: Total Size: 600 bytes

console.log("\nListing contents:");
root.accept(listContents);
console.log("Contents:");
console.log(listContents.getContents().join("\n"));
// Output:
// Contents:
// root
// file1.txt
// file2.txt
// subdir
// file3.txt
