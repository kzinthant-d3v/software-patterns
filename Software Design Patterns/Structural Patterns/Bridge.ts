// Implementation interface
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
}

// Concrete Implementation: TV
class TV implements Device {
  private on: boolean = false;
  private volume: number = 50;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
    console.log("TV is now enabled.");
  }

  public disable(): void {
    this.on = false;
    console.log("TV is now disabled.");
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(percent: number): void {
    this.volume = percent;
    console.log(`TV volume set to ${this.volume}`);
  }
}

// Concrete Implementation: Radio
class Radio implements Device {
  private on: boolean = false;
  private volume: number = 30;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
    console.log("Radio is now enabled.");
  }

  public disable(): void {
    this.on = false;
    console.log("Radio is now disabled.");
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(percent: number): void {
    this.volume = percent;
    console.log(`Radio volume set to ${this.volume}`);
  }
}

// Abstraction
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  public togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  public volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  public volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }
}

// Refined Abstraction
class AdvancedRemoteControl extends RemoteControl {
  public mute(): void {
    this.device.setVolume(0);
    console.log("Device is muted.");
  }
}

// Usage
function clientCode(remote: RemoteControl) {
  remote.togglePower();
  remote.volumeUp();
  remote.volumeDown();
}

// Using the Bridge pattern
const tv = new TV();
const tvRemote = new RemoteControl(tv);
console.log("Operating TV with Remote Control:");
clientCode(tvRemote);

const radio = new Radio();
const radioRemote = new AdvancedRemoteControl(radio);
console.log("\nOperating Radio with Advanced Remote Control:");
clientCode(radioRemote);
radioRemote.mute();


// Implementation interface
interface Renderer {
  renderCircle(radius: number): void;
  renderRectangle(width: number, height: number): void;
}

// Concrete Implementation: Vector Renderer
class VectorRenderer implements Renderer {
  public renderCircle(radius: number): void {
    console.log(`Rendering circle with radius ${radius} using vector graphics.`);
  }

  public renderRectangle(width: number, height: number): void {
    console.log(`Rendering rectangle with width ${width} and height ${height} using vector graphics.`);
  }
}

// Concrete Implementation: Raster Renderer
class RasterRenderer implements Renderer {
  public renderCircle(radius: number): void {
    console.log(`Rendering circle with radius ${radius} using raster graphics.`);
  }

  public renderRectangle(width: number, height: number): void {
    console.log(`Rendering rectangle with width ${width} and height ${height} using raster graphics.`);
  }
}

// Abstraction
abstract class Shape {
  protected renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  public abstract draw(): void;
  public abstract resize(factor: number): void;
}


// Refined Abstraction: Circle
class Circle extends Shape {
  private radius: number;

  constructor(renderer: Renderer, radius: number) {
    super(renderer);
    this.radius = radius;
  }

  public draw(): void {
    this.renderer.renderCircle(this.radius);
  }

  public resize(factor: number): void {
    this.radius *= factor;
  }
}

// Refined Abstraction: Rectangle
class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(renderer: Renderer, width: number, height: number) {
    super(renderer);
    this.width = width;
    this.height = height;
  }

  public draw(): void {
    this.renderer.renderRectangle(this.width, this.height);
  }

  public resize(factor: number): void {
    this.width *= factor;
    this.height *= factor;
  }
}

// Usage
function clientCode2(shape: Shape) {
  shape.draw();
  shape.resize(2);
  shape.draw();
}

// Using the Bridge pattern
const vectorRenderer = new VectorRenderer();
const rasterRenderer = new RasterRenderer();

const circle = new Circle(vectorRenderer, 5);
console.log("Drawing circle using vector renderer:");
clientCode2(circle);

const rectangle = new Rectangle(rasterRenderer, 4, 3);
console.log("\nDrawing rectangle using raster renderer:");
clientCode2(rectangle);
