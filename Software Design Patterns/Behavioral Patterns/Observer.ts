// Observer interface
interface Observer {
  update(temperature: number): void;
}

// Subject interface
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// Concrete Subject: WeatherStation
class WeatherStation implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;

  public attach(observer: Observer): void {
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature);
    }
  }

  public setTemperature(temperature: number): void {
    console.log(`WeatherStation: new temperature is ${temperature}°C`);
    this.temperature = temperature;
    this.notify();
  }
}

// Concrete Observer: PhoneDisplay
class PhoneDisplay implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(temperature: number): void {
    console.log(`${this.name}: Temperature updated to ${temperature}°C`);
  }
}

// Concrete Observer: WindowDisplay
class WindowDisplay implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(temperature: number): void {
    console.log(`${this.name}: Temperature updated to ${temperature}°C`);
  }
}

// Usage
const weatherStation = new WeatherStation();

const phoneDisplay = new PhoneDisplay("Phone Display");
const windowDisplay = new WindowDisplay("Window Display");

weatherStation.attach(phoneDisplay);
weatherStation.attach(windowDisplay);

console.log("Simulating temperature changes:");
weatherStation.setTemperature(25);
// Output:
// WeatherStation: new temperature is 25°C
// Phone Display: Temperature updated to 25°C
// Window Display: Temperature updated to 25°C

weatherStation.setTemperature(30);
// Output:
// WeatherStation: new temperature is 30°C
// Phone Display: Temperature updated to 30°C
// Window Display: Temperature updated to 30°C

weatherStation.detach(phoneDisplay);
weatherStation.setTemperature(20);
// Output:
// WeatherStation: new temperature is 20°C
// Window Display: Temperature updated to 20°C
