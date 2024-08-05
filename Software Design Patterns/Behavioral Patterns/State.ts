// State interface
interface VendingMachineState {
  insertMoney(): void;
  ejectMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

// Concrete State: IdleState
class IdleState implements VendingMachineState {
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  public insertMoney(): void {
    console.log("Money inserted.");
    this.vendingMachine.setState(this.vendingMachine.getHasMoneyState());
  }

  public ejectMoney(): void {
    console.log("No money to eject.");
  }

  public selectProduct(): void {
    console.log("Insert money first.");
  }

  public dispenseProduct(): void {
    console.log("Insert money and select a product first.");
  }
}

// Concrete State: HasMoneyState
class HasMoneyState implements VendingMachineState {
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  public insertMoney(): void {
    console.log("Money already inserted.");
  }

  public ejectMoney(): void {
    console.log("Money ejected.");
    this.vendingMachine.setState(this.vendingMachine.getIdleState());
  }

  public selectProduct(): void {
    console.log("Product selected.");
    this.vendingMachine.setState(this.vendingMachine.getDispensingState());
  }

  public dispenseProduct(): void {
    console.log("Select a product first.");
  }
}

// Concrete State: DispensingState
class DispensingState implements VendingMachineState {
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  public insertMoney(): void {
    console.log("Please wait, dispensing product.");
  }

  public ejectMoney(): void {
    console.log("Cannot eject money, already dispensing.");
  }

  public selectProduct(): void {
    console.log("Product already selected.");
  }

  public dispenseProduct(): void {
    console.log("Dispensing product...");
    this.vendingMachine.setState(this.vendingMachine.getIdleState());
  }
}

// Concrete State: SoldOutState
class SoldOutState implements VendingMachineState {
  private vendingMachine: VendingMachine;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
  }

  public insertMoney(): void {
    console.log("Cannot insert money, product sold out.");
  }

  public ejectMoney(): void {
    console.log("No money to eject.");
  }

  public selectProduct(): void {
    console.log("Cannot select product, sold out.");
  }

  public dispenseProduct(): void {
    console.log("No product to dispense.");
  }
}


// Context: VendingMachine
class VendingMachine {
  private idleState: VendingMachineState;
  private hasMoneyState: VendingMachineState;
  private dispensingState: VendingMachineState;
  private soldOutState: VendingMachineState;

  private currentState: VendingMachineState;

  constructor() {
    this.idleState = new IdleState(this);
    this.hasMoneyState = new HasMoneyState(this);
    this.dispensingState = new DispensingState(this);
    this.soldOutState = new SoldOutState(this);

    this.currentState = this.idleState; // Initial state
  }

  public setState(state: VendingMachineState): void {
    this.currentState = state;
  }

  public getIdleState(): VendingMachineState {
    return this.idleState;
  }

  public getHasMoneyState(): VendingMachineState {
    return this.hasMoneyState;
  }

  public getDispensingState(): VendingMachineState {
    return this.dispensingState;
  }

  public getSoldOutState(): VendingMachineState {
    return this.soldOutState;
  }

  public insertMoney(): void {
    this.currentState.insertMoney();
  }

  public ejectMoney(): void {
    this.currentState.ejectMoney();
  }

  public selectProduct(): void {
    this.currentState.selectProduct();
  }

  public dispenseProduct(): void {
    this.currentState.dispenseProduct();
  }
}

// Usage
const vendingMachine = new VendingMachine();

console.log("Vending Machine Operations:");
vendingMachine.insertMoney(); // Output: Money inserted.
vendingMachine.selectProduct(); // Output: Product selected.
vendingMachine.dispenseProduct(); // Output: Dispensing product...

console.log("\nTrying to eject money after dispensing:");
vendingMachine.ejectMoney(); // Output: No money to eject.

console.log("\nTrying to insert money in the idle state:");
vendingMachine.insertMoney(); // Output: Money inserted.
vendingMachine.ejectMoney(); // Output: Money ejected.

console.log("\nTrying to dispense without selecting a product:");
vendingMachine.dispenseProduct(); // Output: Insert money and select a product first.
