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
