// -----------------------------------Generator functions-----------------------------------------------------------

// These types of functions can pause and resume its execution by using yield keyword. we have to use * 

// E.g 1
function* counter(){
    let i = 0;
    while(true){
        yield i++
    }
}

// It is an infinite counter, as we are not returning anything
const infiniteCounter = counter()
console.log("counter", infiniteCounter.next());
console.log("counter", infiniteCounter.next());
console.log("counter", infiniteCounter.next());

// done flag will be true if we return after yields. let try that

// E.g 2

function* logSomething(){

    yield "Hello"
    yield "there"
    return "end"
    yield "there?" // after return we can not yield
}

const log = logSomething()
console.log("log", log.next());
console.log("log", log.next());
console.log("log", log.next());
console.log("log", log.next()); // value will be undfined as there are no next yield defined

// ---------------------------------------------- First Class functions ---------------------------------------

// It means function can be treated like any other value like string and number
// In Js, you can pass fn as argument, return it from another function and function can also be assigned to any varible

// E.g 1. Assign functions to variables

const greet = function(name) {
  return `Hello, ${name}`;
};

// E.g 2. Pass functions as arguments

function callWithJohn(fn) {
  return fn('John');
}
callWithJohn(greet); // returns "Hello, John"

// E.g 3 Return function from another function
function multiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

// -------------------------------------------- Higher Order Function ---------------------------

// Those fns are called higher order which return fn or takes another fn as an arguement.

// Note: First class fns are the reason for Higher order fns but not vice versa.


// --------------------------------- Call, bind, Apply ----------------------------------------

function greet(city, country) {
  console.log(`Hello, my name is ${this.name}, from ${city}, ${country}`);
}
const person = { name: "Pankaj" };

greet.call(person, "Delhi", "India");
// Calls a function immediately with a given this value and arguments passed individually.

greet.apply(person, ["Delhi", "India"]);
// Similar to call(), but arguments are passed as an array.

const greetPankaj = greet.bind(person, "Delhi", "India");
greetPankaj();
// Returns a new function with this bound, but doesn’t call it immediately.

// -------------------------------- this keyword ---------------------------------

// this keywords refers to the context in which the function is invoked.

const user = {
  name: "Pankaj",
  greet() {
    console.log(this.name);
  }
};

user.greet(); // "Pankaj"

const user2 = {
  name: "Pankaj",
  greet: () => {
    console.log(this.name);
  }
};

user2.greet(); // undefined
// why ?  because Arrow functions don’t have their own this. They inherit this from the surrounding lexical scope.