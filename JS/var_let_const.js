// The main difference between them is distimguish between on these 4 factors

// -------------- 1) Scope ---------------------

// var is a function
// let is a block Scope. Also follow function scope
// const is also a block scope. Also follows function scope

function scope() {
  if (true) {
    var a = 10;
    let b = 15;
    const c = 20;
  }
  console.log("a", a);
  //console.log("b", b); // reference error. why because blocked scope
  // console.log("c", c); // refernce error why because blocked scope
}
scope();

// --------------2) Hoisting -------------------------

function Hoisting() {
  console.log("Hoisitng a", a);
  // console.log("Hoisitng b", b); // can not access b before initialization. They do follow hoisting but they are specifically designed to retain in TDZ.
  // console.log("Hoisitng c", c); // can not access c before initialization. They do follow hoisting but they are specifically designed to retain in TDZ.
  var a = 100;
  let b = 200;
  const c = 300;
}
Hoisting();

// why let and const are designed to follow TDZ?
// to predict the code behavior
// to make our code less bug proof

// --------------- 3) Re declaration ------------------------------------------------

function redcrelation() {
  var a = "hello";
  let b = "how r u";
  const c = "i am fine";

  // let b = "good" it will give you error, you can re declare the variable b with let
  // const c = "what about you" // this will also give you error
}

// --------------------------4) re assignment---------------

function reassignment() {
  var a = "first value of a";
  let b = "first value of b";
  const c = "first value of c";

  a = "scond value of a";
  b = "second value of b"
  // c = "second value of c" // it will give you error, you can not re assign value to const variables

  console.log("a,b,c", a,b);
  
}
// const is mutable, means if you have assigned the non primite data type in const varibale, you can change the properties of object.
reassignment()

// Interview Questions 

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 3 3 3
// why ? var is function-scoped, so there’s only one i shared by all callbacks.


for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// 0 1 2
// why ? let is block-scoped, so a new i is created for each iteration.

for (const i = 0; i < 3; i++) {
  console.log(i);
}

// It will give you an error. Because In a loop, the variable updates every iteration → not allowed.
// But you can use const in for of and for in loops. because new binding is created every time

for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 1000);
  })(i);
}

// 0 1 2
// even though var is function scoped, but here we are usng IIFEE, so everytime callback get its own j parameter

var x = 1;
{
  var x = 2;
}
console.log(x);
// 2

let y = 1;
{
  let y = 2;
}
console.log(y); // 
// 1

foo(); // ?

function foo() {
  console.log("Hello");
}
// hello

bar(); // ?

var bar = function() {
  console.log("Hi");
};
// Type error: bar is not a function. Function expressions (bar) follow variable hoisting rules → bar is hoisted as undefined.

function test() {
  undeclaredVar = 5; // No var/let/const
}
test();
console.log(undeclaredVar); 
// 5 Because when not declared with anything, it is marked as global ( not function scope)

function test() {
  var undeclaredVar = 5; // No var/let/const
}
test();
console.log(undeclaredVar); 

// reference error. because function scoped