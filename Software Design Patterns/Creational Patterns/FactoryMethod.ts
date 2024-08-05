// Product interface
// Example 1
interface INotification {
  send(recipient: string, message: string): void;
}

// Concrete Products
class EmailNotification implements INotification {
  public send(recipient: string, message: string): void {
    console.log(`Sending Email to ${recipient}: ${message}`);
  }
}

class SMSNotification implements INotification {
  public send(recipient: string, message: string): void {
    console.log(`Sending SMS to ${recipient}: ${message}`);
  }
}

// Creator class with Factory Method
abstract class NotificationCreator {
  // The factory method
  public abstract createNotification(): INotification;

  public notify(recipient: string, message: string): void {
    // Use the factory method to create a Notification object
    const notification = this.createNotification();
    // Use the product
    notification.send(recipient, message);
  }
}

// Concrete Creators
class EmailNotificationCreator extends NotificationCreator {
  public createNotification(): INotification {
    return new EmailNotification();
  }
}

class SMSNotificationCreator extends NotificationCreator {
  public createNotification(): INotification {
    return new SMSNotification();
  }
}

// Usage
const emailCreator = new EmailNotificationCreator();
emailCreator.notify("user@example.com", "Hello via Email!");

const smsCreator = new SMSNotificationCreator();
smsCreator.notify("123-456-7890", "Hello via SMS!");


//example 2
// Product interface
interface Payment {
  process(amount: number): void;
}

// Concrete Products
class CreditCardPayment implements Payment {
  public process(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
  }
}

class PayPalPayment implements Payment {
  public process(amount: number): void {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}

class BankTransferPayment implements Payment {
  public process(amount: number): void {
    console.log(`Processing bank transfer payment of $${amount}`);
  }
}

// Creator class with Factory Method
abstract class PaymentCreator {
  // The factory method
  public abstract createPayment(): Payment;

  public makePayment(amount: number): void {
    // Use the factory method to create a Payment object
    const payment = this.createPayment();
    // Use the product
    payment.process(amount);
  }
}

// Concrete Creators
class CreditCardPaymentCreator extends PaymentCreator {
  public createPayment(): Payment {
    return new CreditCardPayment();
  }
}

class PayPalPaymentCreator extends PaymentCreator {
  public createPayment(): Payment {
    return new PayPalPayment();
  }
}

class BankTransferPaymentCreator extends PaymentCreator {
  public createPayment(): Payment {
    return new BankTransferPayment();
  }
}

// Usage
const creditCardCreator = new CreditCardPaymentCreator();
creditCardCreator.makePayment(100);

const payPalCreator = new PayPalPaymentCreator();
payPalCreator.makePayment(200);

const bankTransferCreator = new BankTransferPaymentCreator();
bankTransferCreator.makePayment(300);
