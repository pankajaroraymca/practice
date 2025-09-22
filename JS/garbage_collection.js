// ----------------------------- How Garbage Collection Works in Js -------------------------------------------------

// GC ensures memory used by “dead objects” (objects that can no longer be reached) is reclaimed.

// 1) Mark and Sweep Algorithm
// It starts from the root and marks all the objects as reachable by references first
// Then check those objects are are not reachable and free up their memory.
// It works automatically in the background

// GC run automatically when reached to heap memory threshold.
// So Mark and sweep was not a good optimized solution for modern browsers because when gc runs, it can create halts executions
// and thus lag is experinced sometimes. So there is a new way of garbage collection

// 2) Generational GC + Marks & Sweep: 
// In this algorithm, heap memory is deivided in two segments - young generation memory and old generation memory
// Objects stores first in young generation heap memory then it is moved to old generation memory. There is some criteria for moving process
// Young generation objects are garbage collected frequenlty while old is not. Young generation gc is not very expensive, you will get to know further.

// Young generation memory hold small objects or arrays so scanning the whole memory is not very expensive. So even if we frequenctly does gc
// js execution is not halted or lag is experienced. That's why there was a need to divide memory
// Old generation gc does not run very frequenctly.

// How data is moved from young to old
// when data size is too large, it is moved to old
// when objects survives 2 young gc. it means when gc was running objects was still reachable.

// ----------------------------------------------- Memory Leak Root Causes ---------------------------------------------------

// 1) Variables attached to the global object (window in browsers, global in Node.js) are always reachable.
// 2) setTimeout or setInterval callbacks hold references to variables in their scope. If you don’t clear them, those variables stay in memory.
// 3) When a DOM node is removed from the document but still referenced by JS variables, it cannot be collected.

let oldNode = document.getElementById("myDiv");
document.body.removeChild(oldNode); // node removed from DOM
// oldNode is still in memory because we hold a reference

// 4) Closures keep references alive to their outer scope.
function setup() {
    let bigData = new Array(1e6).fill("x");
    return function() { console.log("leak"); } // bigData stays in memory
  }
  const leaked = setup(); 
  
// 5) Attaching listeners but never removing them keeps all associated DOM nodes and variables alive.