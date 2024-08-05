// Mediator interface
interface AirTrafficControl {
  registerFlight(flight: Flight): void;
  notifyFlights(sender: Flight, message: string): void;
}

// Concrete Mediator: ControlTower
class ControlTower implements AirTrafficControl {
  private flights: Flight[] = [];

  public registerFlight(flight: Flight): void {
    this.flights.push(flight);
  }

  public notifyFlights(sender: Flight, message: string): void {
    for (const flight of this.flights) {
      if (flight !== sender) {
        flight.receiveMessage(message);
      }
    }
  }
}


// Colleague class
class Flight {
  private mediator: AirTrafficControl;
  private flightNumber: string;

  constructor(mediator: AirTrafficControl, flightNumber: string) {
    this.mediator = mediator;
    this.flightNumber = flightNumber;
    mediator.registerFlight(this);
  }

  public getFlightNumber(): string {
    return this.flightNumber;
  }

  public sendMessage(message: string): void {
    console.log(`Flight ${this.flightNumber} sending message: ${message}`);
    this.mediator.notifyFlights(this, message);
  }

  public receiveMessage(message: string): void {
    console.log(`Flight ${this.flightNumber} received message: ${message}`);
  }
}

// Usage
const controlTower = new ControlTower();

const flightA = new Flight(controlTower, "A123");
const flightB = new Flight(controlTower, "B456");
const flightC = new Flight(controlTower, "C789");

console.log("Communication through Control Tower:");
flightA.sendMessage("Requesting permission to land.");
// Output:
// Flight A123 sending message: Requesting permission to land.
// Flight B456 received message: Requesting permission to land.
// Flight C789 received message: Requesting permission to land.

flightB.sendMessage("Holding at 10,000 feet.");
// Output:
// Flight B456 sending message: Holding at 10,000 feet.
// Flight A123 received message: Holding at 10,000 feet.
// Flight C789 received message: Holding at 10,000 feet.
