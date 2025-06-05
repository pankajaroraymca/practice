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
reassignment()

