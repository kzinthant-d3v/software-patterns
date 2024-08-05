// Product interfaces
interface Button {
  render(): void;
}

interface TextField {
  display(): void;
}

// Concrete Products for Light Theme
class LightButton implements Button {
  public render(): void {
    console.log("Render a light-themed button.");
  }
}

class LightTextField implements TextField {
  public display(): void {
    console.log("Display a light-themed text field.");
  }
}

// Concrete Products for Dark Theme
class DarkButton implements Button {
  public render(): void {
    console.log("Render a dark-themed button.");
  }
}

class DarkTextField implements TextField {
  public display(): void {
    console.log("Display a dark-themed text field.");
  }
}

// Abstract Factory interface
interface ThemeFactory {
  createButton(): Button;
  createTextField(): TextField;
}

// Concrete Factory for Light Theme
class LightThemeFactory implements ThemeFactory {
  public createButton(): Button {
    return new LightButton();
  }

  public createTextField(): TextField {
    return new LightTextField();
  }
}

// Concrete Factory for Dark Theme
class DarkThemeFactory implements ThemeFactory {
  public createButton(): Button {
    return new DarkButton();
  }

  public createTextField(): TextField {
    return new DarkTextField();
  }
}


// Function to demonstrate usage
function buildUI(factory: ThemeFactory) {
  const button = factory.createButton();
  const textField = factory.createTextField();

  button.render();
  textField.display();
}

// Usage with Light Theme
console.log("Light Theme:");
const lightThemeFactory = new LightThemeFactory();
buildUI(lightThemeFactory);

// Usage with Dark Theme
console.log("\nDark Theme:");
const darkThemeFactory = new DarkThemeFactory();
buildUI(darkThemeFactory);
