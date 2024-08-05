// Product class
class Computer {
  public cpu?: string;
  public ram?: string;
  public storage?: string;
  public graphicsCard?: string;

  public displayConfiguration(): void {
    console.log("Computer Configuration:");
    console.log(`CPU: ${this.cpu}`);
    console.log(`RAM: ${this.ram}`);
    console.log(`Storage: ${this.storage}`);
    console.log(`Graphics Card: ${this.graphicsCard}`);
  }
}


// Builder interface
interface ComputerBuilder {
  setCPU(cpu: string): this;
  setRAM(ram: string): this;
  setStorage(storage: string): this;
  setGraphicsCard(graphicsCard: string): this;
  build(): Computer;
}


// Concrete Builder
class CustomComputerBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  public setCPU(cpu: string): this {
    this.computer.cpu = cpu;
    return this;
  }

  public setRAM(ram: string): this {
    this.computer.ram = ram;
    return this;
  }

  public setStorage(storage: string): this {
    this.computer.storage = storage;
    return this;
  }

  public setGraphicsCard(graphicsCard: string): this {
    this.computer.graphicsCard = graphicsCard;
    return this;
  }

  public build(): Computer {
    return this.computer;
  }
}

// Usage
const gamingComputerBuilder = new CustomComputerBuilder();
const gamingComputer = gamingComputerBuilder
  .setCPU("Intel Core i9")
  .setRAM("32GB")
  .setStorage("1TB SSD")
  .setGraphicsCard("NVIDIA RTX 3080")
  .build();

gamingComputer.displayConfiguration();

const officeComputerBuilder = new CustomComputerBuilder();
const officeComputer = officeComputerBuilder
  .setCPU("Intel Core i5")
  .setRAM("16GB")
  .setStorage("512GB SSD")
  .build();

officeComputer.displayConfiguration();
