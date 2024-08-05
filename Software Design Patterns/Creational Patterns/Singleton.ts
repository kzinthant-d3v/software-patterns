class Singleton {
  private static instance: Singleton;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Static method to provide access to the instance
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someMethod() {
    console.log("This is a method in the Singleton class.");
  }
}

// Usage
const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

console.log(singleton1 === singleton2); // Output: true

//Functional
const SingletonFunction = (() => {
  let instance: any;

  function createInstance() {
    return {
      someMethod: () => {
        console.log("This is a method in the Singleton function.");
      },
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

// Usage
const singletonFunc1 = SingletonFunction.getInstance();
const singletonFunc2 = SingletonFunction.getInstance();

console.log(singletonFunc1 === singletonFunc2); // Output: true
