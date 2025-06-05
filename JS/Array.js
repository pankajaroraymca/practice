// Create a map polyfill

Array.prototype.myMap = function (callback, thisArg) {

// thisArg is the reference of context which we can provide when using myMap just like orignla map method. This is optional
  if (typeof callback != "function") {
    throw Error("Invalid function");
  }

  const array = this; // this refers to the array on which this method is called.

  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {

    // using call method of function to pass the thisArg context and then passing the arguments in callback function
    // now you will question, how come we can pass 3 params to callback when originally i have defined only 1 param in function.
    // This is because, it is mimicking the behavior of array methods where we can use current value, index and orginal array.
    // it is not mandatory to pass all fields, we can ignore them
      result.push(callback.call(thisArg, array[i], i, array));
    // result.push(callback(array[i]))
    }
  }
  return result;
};

const array = [1, 2, 3, 4];
console.log("original map", array.map((value) => value * 2))
console.log("my map", array.myMap((value) => value * 3))

// ----------------------------------------------------------------- FILTER POLYFILL ---------------------------------------------------

Array.prototype.myFilter = function(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];
  const arr = this;

  for (let i = 0; i < arr.length; i++) {
   
    if (arr[i]) {
      if (callback.call(thisArg, arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
  }

  return result;
};

console.log("original filter", array.filter(value => value % 2 ===0));
console.log("custom filter", array.myFilter(value => value % 2 ===0));

// ------------------------------------------------------ REDUCE ----------------------------------------------------------

Array.prototype.myReduce = function(callback, initial, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const arr = this;
  let acc = initial

  for (let i = 0; i < arr.length; i++) {
   
    if (arr[i]) {
     
        acc = callback(acc, arr[i])
    }
  }

  return acc

};

console.log("original reduce", array.reduce((acc,current) => { return acc + current}, 0));
console.log("custom reduce", array.myReduce((acc,current) => { return acc + current}, 0));



