// Component interface
interface Coffee {
  getCost(): number;
  getDescription(): string;
}

// Concrete component
class SimpleCoffee implements Coffee {
  public getCost(): number {
    return 5; // Base cost of the coffee
  }

  public getDescription(): string {
    return "Simple coffee";
  }
}


// Decorator class
class CoffeeDecorator implements Coffee {
  protected coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  public getCost(): number {
    return this.coffee.getCost();
  }

  public getDescription(): string {
    return this.coffee.getDescription();
  }
}

// Concrete Decorator: Milk
class MilkDecorator extends CoffeeDecorator {
  public getCost(): number {
    return this.coffee.getCost() + 1; // Additional cost for milk
  }

  public getDescription(): string {
    return `${this.coffee.getDescription()}, milk`;
  }
}

// Concrete Decorator: Sugar
class SugarDecorator extends CoffeeDecorator {
  public getCost(): number {
    return this.coffee.getCost() + 0.5; // Additional cost for sugar
  }

  public getDescription(): string {
    return `${this.coffee.getDescription()}, sugar`;
  }
}

// Concrete Decorator: Whipped Cream
class WhippedCreamDecorator extends CoffeeDecorator {
  public getCost(): number {
    return this.coffee.getCost() + 1.5; // Additional cost for whipped cream
  }

  public getDescription(): string {
    return `${this.coffee.getDescription()}, whipped cream`;
  }
}

// Usage
let myCoffee: Coffee = new SimpleCoffee();
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);

myCoffee = new MilkDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);

myCoffee = new SugarDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);

myCoffee = new WhippedCreamDecorator(myCoffee);
console.log(`${myCoffee.getDescription()} costs $${myCoffee.getCost()}`);

//

// Logger interface
interface Logger {
  log(message: string): void;
}

// Concrete Logger
class SimpleLogger implements Logger {
  log(message: string): void {
    console.log(`Log: ${message}`);
  }
}

// Decorator for info level
function Info(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (message: string) {
    originalMethod.call(this, `INFO: ${message}`);
  };
}

// Decorator for warning level
function Warning(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (message: string) {
    originalMethod.call(this, `WARNING: ${message}`);
  };
}

// Decorator for error level
function Errord(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (message: string) {
    originalMethod.call(this, `ERROR: ${message}`);
  };
}

// Logger with decorators applied
class VerboseLogger extends SimpleLogger {
  @Info
  logInfo(message: string): void {
    this.log(message);
  }

  @Warning
  logWarning(message: string): void {
    this.log(message);
  }

  @Errord
  logError(message: string): void {
    this.log(message);
  }
}

// Usage
const logger = new VerboseLogger();

logger.logInfo("This is an info message.");
// Output: INFO: This is an info message.

logger.logWarning("This is a warning message.");
// Output: WARNING: This is a warning message.

logger.logError("This is an error message.");
// Output: ERROR: This is an error message.
