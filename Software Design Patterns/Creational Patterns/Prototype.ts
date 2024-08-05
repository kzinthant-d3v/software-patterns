// Prototype interface
interface CharacterPrototype {
  duplicate(): CharacterPrototype;
  getDetails(): string;
}

// Concrete Prototype: Warrior
class Warrior implements CharacterPrototype {
  private name: string;
  private health: number;
  private strength: number;

  constructor(name: string, health: number, strength: number) {
    this.name = name;
    this.health = health;
    this.strength = strength;
  }

  public duplicate(): CharacterPrototype {
    // Creating a variation by duplicating the character
    return new Warrior(this.name, this.health, this.strength);
  }

  public getDetails(): string {
    return `Warrior - Name: ${this.name}, Health: ${this.health}, Strength: ${this.strength}`;
  }
}

// Concrete Prototype: Mage
class Mage implements CharacterPrototype {
  private name: string;
  private health: number;
  private mana: number;

  constructor(name: string, health: number, mana: number) {
    this.name = name;
    this.health = health;
    this.mana = mana;
  }

  public duplicate(): CharacterPrototype {
    // Creating a variation by duplicating the character
    return new Mage(this.name, this.health, this.mana);
  }

  public getDetails(): string {
    return `Mage - Name: ${this.name}, Health: ${this.health}, Mana: ${this.mana}`;
  }
}

// Usage
const originalWarrior = new Warrior("Thor", 100, 80);
const copiedWarrior = originalWarrior.duplicate();

console.log("Original Warrior:");
console.log(originalWarrior.getDetails());

console.log("Copied Warrior:");
console.log(copiedWarrior.getDetails());

const originalMage = new Mage("Gandalf", 80, 120);
const copiedMage = originalMage.duplicate();

console.log("Original Mage:");
console.log(originalMage.getDetails());

console.log("Copied Mage:");
console.log(copiedMage.getDetails());
