// There are main 4 Pillars of OOPS

// 1) Inheritance
// 2) Polymorpism
// 3) Encapsultaion
// 4) Data Abstraction

// ------------------------------------Inheritance-------------------------------------

// Inheritance allows one class ( child or sub class ) to reuse the properties and methods of another class
// ( parent or super class)
// By doing this, we can acheive code reusability and heirachical relation ships.

// child class = subclass
// parent class = superclass

// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

// Child class
class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog("Tommy");
dog.speak(); // Tommy barks.

// Multiple Inheritance: It means, inheriting properties and methods from more than one class
// Python and C++ supports multiple inheritance. But java and JS does not support it.
// To achieve multiple inheritance in JS, we can use mixin
// Mixin is a technique, internally we will use our own function mixin and insert the properties and methods of child classes to parent class to achieve multiple inheritance.

// ----------------------------------------------- Polymorphism ---------------------------------------------

// The same method can have different implementations.
// It has 2 types: 

// Overloading ( compile time): The method is same but implementation is different either on paramters or return type

// class MathUtil {
//     sum(int a, int b) { return a + b; }
//     sum(double a, double b) { return a + b; }
// }

// Over riding ( run time): Child class provides its own implementation of a method

class Payment {
    process() { System.out.println("Processing generic payment"); }
}
class CreditCardPayment extends Payment {
    
    process() { System.out.println("Processing credit card payment"); }
}
class UpiPayment extends Payment {
   
    process() { System.out.println("Processing UPI payment"); }
}

// Caller code
p = new CreditCardPayment();
p.process(); // "Processing credit card payment"


// -------------------------------------------- Encapsulation --------------------------------------

// Wrapping data fields and methods into a single class.
// It controls how data and methods are accesed or modified thorugh access modifiers ( public, private, protected)
// these data fields are accesed through public getter and setter methods generally.

class BankAccount {
   balance // private variable

  constructor(balance){
    this.balance = balance
  }

  // public method
  getBalance(){
    return this.balance
  }

  // public method
  depositAmount(amount){
    this.balance = this.balance + amount
  }
}

// ------------------------------------ Data Abstraction ----------------------------------------

// showing only the essential details while hiding the internal complexity.

class Payment {
  process(amount) {
    throw new Error("process() must be implemented");
  }
}

class CreditCardPayment extends Payment {
  process(amount) {
    console.log(`Processing credit card payment of ${amount}`);
  }
}

class UpiPayment extends Payment {
  process(amount) {
    console.log(`Processing UPI payment of ${amount}`);
  }
}

function pay(paymentMethod, amount) {
  paymentMethod.process(amount);
}

pay(new CreditCardPayment(), 500); // Processing credit card payment of 500
pay(new UpiPayment(), 300);        // Processing UPI payment of 300

// The function pay() abstracts away the details. It doesn’t know/care if it’s UPI, Card, or something else.


// --------------------------------- Abstract classes ------------------------------------

// can not be instanciated. Means you can not do like this const newClass = new AbstractClass()
// they have abstract as well as concrete methods. Abstract methods needs to be implemented.
// these classes can be extended by child classes

// -------------------------------- Interface ------------------------------------

// An interface is a contract that defines a set of methods (and sometimes properties) that a class must implement, but provides no implementation itself.
// They can not be instanciated.
// A class can implement multiple interfaces

// The most impactful project I worked on is the RBL Digital Account Opening Journey. The goal of the project was to eliminate the need for new customers to visit a physical branch to open a savings account.

// We used a modern tech stack: NestJS for backend, Next.js for frontend, and a headless CMS tool, Strapi. Since not everyone might be familiar with Strapi, here’s a brief explanation:

// Strapi is a headless CMS, which means unlike traditional CMS tools like WordPress — where content is tied to HTML/CSS and dictates the frontend layout — Strapi only manages content configuration.
//  It exposes this data via REST or GraphQL APIs in JSON format, and the frontend decides how to render the UI.

// In our project, we used Strapi because we had different types of account journeys — Savings, Salary, Premium accounts — each with different input fields. 
// To promote code reusability and faster development cycle, we managed all content in Strapi and rendered forms dynamically on the frontend using the JSON from its APIs.
//  This approach allowed us to implement a new journey in just a few days by updating configurations in Strapi.

// In my initial months, I managed Strapi and the frontend functionality with Next.js. After building it from scratch, I handed over the module to a junior developer and moved to backend development.
// On the backend, I worked on complex features, including integrating Aadhaar APIs, NSDL APIs, and the RBL Video KYC service. Later, I integrated the Razorpay payment gateway to process final customer payments.