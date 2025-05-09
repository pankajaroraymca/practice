console.log("Prototype Learning Started");

// Prototype --> It is a blueprint of an object. The prototype allows us to use properties and methods of an object even
// if they does not exist on the current object

// Prototype Chain --> When I access property/methods from an object
// 1) JS looks it in the object itself
// 2) If not found, it look in the prototype chain.
// 3) This continue until it reaches null

// Object inherit properties/methods from Object Prototype
// String inherit properties/methods from String Prototype. Then String inherits from Object Prototype
// Number inherit properties/methods from Number Prototype. Then Number inherits from Object Prototype
// Array inherit properties/methods from Array Prototype. Then Array inherits from Object Prototype

// Everything in JS has an object prototype except few like null, undefinded, Object.create(null)

const user = {
    name: "Pankaj"
}

// proto gives us the refernce to the Object Prototype. So age property is added in the Object Prototype
// All objects will not have age property 
user.__proto__.age = 15

const car = {
    name: "creata"
}

console.log("user", user.__proto__)

// You will find age property in both prototypes. it means when you define any propery/method. it is globally added in prototypes.
console.log("user proto type", Object.getOwnPropertyNames(Object.getPrototypeOf(user)))
console.log("car proto type", Object.getOwnPropertyNames(Object.getPrototypeOf(car)))

const string = "abc"
string.__proto__.test = 12

// String.prototype gives us the string prototype while "abc".__proto__ gives us the referece to that String prototpe
// All these built in global constructors have prototype method attached to them. Like String, Number, Array
console.log("proto and prototype", string.__proto__ == String.prototype)


// Primitive data types like string, number, boolean etc don't have their prototype but JS temporarily wraps them in object
// When you access these datas, only then JS wraps them. E.g
const number1 = 1
const array = [1,2,3]
function Proto() {
    console.log("inside fn")
}

// Number --> Number Prototype --> Object Prototype
console.log("number proto", number1.__proto__)

// You can still use tofixed method, it means prototype inheritance is there. So when you acess these primitie data types
// JS wraps them in object wrappers
console.log("number is primitive", number1.toFixed())

// HOw JS is wrapping these datatypes. Internally they are doing like this
// const number1 = new Number(1)
// const array = new Array(1,2,3)
// Every global constructors has prototype attached to it. So that's how their inheritance is working

// Array --> Array Prototype --> Object Prototype
console.log("array proto", array.__proto__)

console.log("function proto", Proto.__proto__)
console.log("string proto", string.__proto__, String.prototype)

// JS follows prototypal inheritance not class based. But in ES6, classes were introduced. Under the hood,
// prottype inheritance is working. Let me you give you an example.

class AnimalClassBased {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise, Class Based`);
    }
}

const dogObject = new AnimalClassBased("Rex");
dogObject.speak();

// Under the hood it is working like this. Class based is just the syntactic version introduced in ES6.
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function () {
    console.log(`${this.name} makes a noise, Function Based`);
};

const dog = new Animal("Rex");
dog.speak()

// Number prototype method/properties
console.log("number prototype method/properties", Object.getOwnPropertyNames(number1.__proto__))

// String prototype method/properties
console.log("string prototype method/properties", Object.getOwnPropertyNames(string.__proto__))
