// In JS, there are main two types of queues

// 1) Macro Task queue
// 2) Micro Task Queue

// Now what are the tasks included in macro and micro, let's go one by one
// Macro Task Queue List:

// (i) set timeout, setinterval, set immediate
// (ii) I/O callbacks
// (iii) UI rendering events like click scroll etc

// Micro Task List
// (i) .then, .catch, .finally
// (ii) queueMicrotask
// (iii) MutationObserver (browser specific) - is a built-in browser API that allows you to watch for changes in the DOM

// Priority of execution of task in JS

//  syncronus code > microqueue > macroqueue

// Priority queue in Nodejs. Node js has process.nextTick, which has higher priority than micro task queue
//  syncronus code > process.nexttick > microqueue > macroqueue

// what is process.nextTick?
// Runs the callback immediately after the current operation finishes and before any other events, including I/O or timers.


// syncronus code, it will be executed first
function queueFunction(){
    console.log("function code");
}

// Micro Task 
Promise.resolve("Promised Value").then((data)=>{ console.log(data);
})

// queue microtask adds the execution in the micro task list, so it will be executed after syncronus code excetion
queueMicrotask(()=>{
    console.log("queue microtask");
    
})

queueFunction()
console.log("normal log");

// Even the function is async, it does not means it's a macro task until something is defined with await in this funcion
async function AsyncQueueFunction(){
    console.log("Aync Queue function") // this is a syncronus code, it will be executed first
    await Promise.resolve("hello kitty") // this is an async code , it is a macro task . so has a least priority
    console.log("log after awaited promised"); // this log is printed after the completing of promise
    
}
AsyncQueueFunction()




