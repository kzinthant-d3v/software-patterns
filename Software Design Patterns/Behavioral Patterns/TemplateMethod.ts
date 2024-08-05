// Abstract class
abstract class DataProcessor {
  // Template method
  public process(): void {
    this.loadData();
    this.processData();
    this.saveData();
  }

  protected abstract loadData(): void;
  protected abstract processData(): void;
  protected abstract saveData(): void;
}

// Concrete Class: CSVDataProcessor
class CSVDataProcessor extends DataProcessor {
  protected loadData(): void {
    console.log("Loading CSV data.");
  }

  protected processData(): void {
    console.log("Processing CSV data.");
  }

  protected saveData(): void {
    console.log("Saving processed CSV data.");
  }
}

// Concrete Class: XMLDataProcessor
class XMLDataProcessor extends DataProcessor {
  protected loadData(): void {
    console.log("Loading XML data.");
  }

  protected processData(): void {
    console.log("Processing XML data.");
  }

  protected saveData(): void {
    console.log("Saving processed XML data.");
  }
}

// Usage
const csvProcessor = new CSVDataProcessor();
const xmlProcessor = new XMLDataProcessor();

console.log("Processing CSV Data:");
csvProcessor.process();
// Output:
// Loading CSV data.
// Processing CSV data.
// Saving processed CSV data.

console.log("\nProcessing XML Data:");
xmlProcessor.process();
// Output:
// Loading XML data.
// Processing XML data.
// Saving processed XML data.

//

// Abstract class
abstract class Game {
  // Template method
  public play(): void {
    this.initialize();
    this.startPlay();
    this.endPlay();
  }

  protected abstract initialize(): void;
  protected abstract startPlay(): void;
  protected abstract endPlay(): void;
}
