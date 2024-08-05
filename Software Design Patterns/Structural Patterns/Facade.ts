// Subsystem component: TV
class TV {
  public turnOn(): void {
    console.log("TV is turned on.");
  }

  public turnOff(): void {
    console.log("TV is turned off.");
  }

  public setInput(input: string): void {
    console.log(`TV input set to ${input}.`);
  }
}

// Subsystem component: Sound System
class SoundSystem {
  public turnOn(): void {
    console.log("Sound system is turned on.");
  }

  public turnOff(): void {
    console.log("Sound system is turned off.");
  }

  public setVolume(volume: number): void {
    console.log(`Sound system volume set to ${volume}.`);
  }
}

// Subsystem component: DVD Player
class DVDPlayer {
  public turnOn(): void {
    console.log("DVD player is turned on.");
  }

  public turnOff(): void {
    console.log("DVD player is turned off.");
  }

  public play(movie: string): void {
    console.log(`Playing movie: ${movie}.`);
  }
}

// Facade
class HomeTheaterFacade {
  private tv: TV;
  private soundSystem: SoundSystem;
  private dvdPlayer: DVDPlayer;

  constructor(tv: TV, soundSystem: SoundSystem, dvdPlayer: DVDPlayer) {
    this.tv = tv;
    this.soundSystem = soundSystem;
    this.dvdPlayer = dvdPlayer;
  }

  public watchMovie(movie: string): void {
    console.log("Getting ready to watch a movie...");
    this.tv.turnOn();
    this.tv.setInput("DVD");
    this.soundSystem.turnOn();
    this.soundSystem.setVolume(20);
    this.dvdPlayer.turnOn();
    this.dvdPlayer.play(movie);
  }

  public endMovie(): void {
    console.log("Shutting down home theater...");
    this.tv.turnOff();
    this.soundSystem.turnOff();
    this.dvdPlayer.turnOff();
  }
}

// Usage
const tv = new TV();
const soundSystem = new SoundSystem();
const dvdPlayer = new DVDPlayer();
const homeTheater = new HomeTheaterFacade(tv, soundSystem, dvdPlayer);

homeTheater.watchMovie("Inception");
// Output:
// Getting ready to watch a movie...
// TV is turned on.
// TV input set to DVD.
// Sound system is turned on.
// Sound system volume set to 20.
// DVD player is turned on.
// Playing movie: Inception.

homeTheater.endMovie();
// Output:
// Shutting down home theater...
// TV is turned off.
// Sound system is turned off.
// DVD player is turned off.
// 

// Subsystem component: User Management API
class UserManagementAPI {
  public getUser(id: string): string {
    // Simulate fetching user data from an external API
    console.log(`Fetching data for user with ID: ${id}`);
    return `User data for ${id}`;
  }
}

// Subsystem component: Payment Gateway API
class PaymentGatewayAPI {
  public processPayment(amount: number): string {
    // Simulate processing payment through an external API
    console.log(`Processing payment of $${amount}`);
    return `Payment of $${amount} processed`;
  }
}

// Subsystem component: Notification Service API
class NotificationServiceAPI {
  public sendNotification(userId: string, message: string): string {
    // Simulate sending a notification through an external API
    console.log(`Sending notification to user ${userId}: ${message}`);
    return `Notification sent to ${userId}`;
  }
}

// Facade
class WebApplicationFacade {
  private userAPI: UserManagementAPI;
  private paymentAPI: PaymentGatewayAPI;
  private notificationAPI: NotificationServiceAPI;

  constructor() {
    this.userAPI = new UserManagementAPI();
    this.paymentAPI = new PaymentGatewayAPI();
    this.notificationAPI = new NotificationServiceAPI();
  }

  public handleUserRequest(userId: string, paymentAmount: number, message: string): void {
    console.log("Handling user request...");

    // Fetch user data
    const userData = this.userAPI.getUser(userId);
    console.log(userData);

    // Process payment
    const paymentStatus = this.paymentAPI.processPayment(paymentAmount);
    console.log(paymentStatus);

    // Send notification
    const notificationStatus = this.notificationAPI.sendNotification(userId, message);
    console.log(notificationStatus);

    console.log("User request handled.");
  }
}

// Usage
const webAppFacade = new WebApplicationFacade();

webAppFacade.handleUserRequest("12345", 100, "Welcome to our service!");
// Output:
// Handling user request...
// Fetching data for user with ID: 12345
// User data for 12345
// Processing payment of $100
// Payment of $100 processed
// Sending notification to user 12345: Welcome to our service!
// Notification sent to 12345
// User request handled.

