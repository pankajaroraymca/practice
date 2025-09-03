const result = Promise.resolve("RESOLVED VALUE");

console.log(("result", result));
result.then((data) => {
  console.log("result waited", data);
});

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success case");
  }, 1000);
});

// wait for the promise results, if you directly print the promise you will get promise in pending state.
promise.then((data) => {
  console.log("", data);
});

// Promises are called when initialized, if they have a rejecting case, we should handle the promise rejection
const rejectPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("reject case");
  }, 1000);
});

// This is one of the way to catch promise rejections
rejectPromise.catch((data) => {
  console.log("promise catched", data);
});

// if you catch promises separstely and do finally, still you will get unhandled promise rejection error because they are running independently
// rejectPromise.finally(()=>{ console.log("don't know whether promise will success or reject")})

// Instead do like this
rejectPromise
  .catch((data) => {
    console.log("promise catched with finally", data);
  })
  .finally(() => {
    console.log("finally");
  });

// if you dont want to use then and catch methods , wrap them in async await syntax but it is not handling rejections. so use try catch blocks
async function listenPromises() {
  const awaitedResult = await promise;
  console.log("listen promises result", awaitedResult);
}
listenPromises();

//  Promise States:
// Pending – initial state.

// Fulfilled – resolve() called.

// Rejected – reject() called.

// Method	Description
// .then()	Handles resolved value.
// .catch()	Handles errors (rejections).
// .finally()	Executes regardless of resolve/reject.
// Promise.all()	Runs multiple promises in parallel, waits for all. Resolves when all promises resolve or rejects if any fail. Means if any promise fails, overall it rejects.
// Promise.allSettled()	Runs multiple promises in parallel,Resolves when all settle (gives status/result per)
// Promise.race()	Resolves/rejects as soon as any one promise settles.
// Promise.any()	Resolves when first successful promise resolves

const promise1 = Promise.resolve("Success 1");
const promise2 = Promise.reject("Failure 2");
const promise3 = Promise.resolve("Success 3");

Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  results.forEach((result, index) => {
    console.log(`Promise All Settled ${index + 1}:`, result);
  });
});

// you have to explicitly handle catch cases, otherwise it will throw rejection error. or you can use try catch with asnc await
// Promise.all([promise1, promise2, promise3]).then((results) => {
//   results.forEach((result, index) => {
//     console.log(`Promise All Settled ${index + 1}:`, result);
//   });
// });

// Async Await
// A syntax sugar over Promises that makes asynchronous code look synchronous.
// Makes code easier to read and write
// You still need to use Promises under the hood
// Works only inside a function declared as async

// What is Promise chaining?
// You return a new Promise from each .then() and continue chaining.

// What is the return value of an async function?
// Always a Promise, even if you return a non-promise value.

// Before Promises or async await . callbacks were used for asynchronus tasks
// Note in today's era still promises under the hood uses callbacks.

// Callback E.g 1
// getUserById(id, (error, result) => {
//   // do something
//   if (error) {
//     // handle error
//   }
//   // user is fetched
// });

// Interview question: Why promises are better than callbacks.
// 1) Better readability and management. If there are nested callbacks it will create a callback hell.
// 2) Centralized error handling: you have to handle error case in each callback. But in promise, you need only one catch method.
// 3) Compatibility with aysnc/await: Promises integrate seamlessly with async/await, which makes asynchronous code look and behave like synchronous code.
// 4) Avoid Inversion of Control: in callbacks you trust your callback will called automatically once async task is done. but in promises you have to explicitly use .then method.

// API calls were made like this when there was no promises
function getAPIData(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  // when response was received, onload method was called. it was an event based. and then we would call our callback function to the part.
  xhr.onload = () => {
    if (xhr.status === 200) {
      callback(null, xhr.responseText);
    } else {
      callback(`Error: ${xhr.status}`);
    }
  };
  xhr.onerror = () => callback("Network error");
  xhr.send();
}

//
const multiplePromise = new Promise((resolve, reject) => {
  resolve("Done1");
  resolve("Done 2"); // promise is already resolved, it will be ignored
});

multiplePromise
  .then((res) => {
    console.log("res", res);
    return "srirng";
  })
  .then((res) => {
    console.log("res 2", res);
  });

// ------------------------------------------------------ Async queue -------------------------------------------------

// This is an external library. By using this, we can run concurrent task. Also we can define the number of concurrency.
// It is different from promise all and any because here we can define the concurrency but not in promises.
// we can also make our own concurrent function using promises without using this lib.

// const async = require('async')

// const queue = async.queue(async (task, callback) => {
//   await new Promise((resolve)=>{
//     setTimeout(()=>{
//       resolve()
//     }, 1000)
//   })
//   callback()
// }, 2);

// // quque function takes 2 arguement, one is task function and other is concurrency limit

// [1,2,3,4,5].map(item=> queue.push(item, ()=>{
//   console.log(`Done ${item}`);
  
// }))

// ----------------------------------------- What is top level await -----------------------------------

// we know that to use await, we must wrapt it in the async function
// BUt we can create top level await when the file is .mjs or we are using type: "module" in package.json

const response = await fetch("https://api.example.com/data");
const data = await response.json();
console.log(data);

// pros: cleaner code

// drawbacks:
// when you try to import this module, then it will wait for the module to resolve the depency. so it can create a chain of delays