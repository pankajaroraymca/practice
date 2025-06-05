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

