const { Worker } = require('worker_threads');
const worker = new Worker('./worker.js');

const { fork } = require('child_process');

// Flow of code when executed in JS

// 1) Memoray Allocation - Heap Memory Allocation. It is a large pool of memory. Also knows as Creation phase. variables are stored as undefined and functions are stored by reference.

// 2) Execution Phase - Now js will run your code line by line. Regular code will be executed in global execution context. if the function is invoked, function will create it's own execution context in the global context.

// 3) Call Stack - Your syncronus code will be moved to call stack. There is only one call stack in JS. That's why js is a single threaded language. If the function is invoked, function will be moved to the call stack
// and so it's logic inside. Call stack follows LIFO. If the code is syncronus, it will be executed instantly. if it sees it's a async task, that particular code will be handled by browser Web API's so that our main thread 
// should not block. Now 

// 4) Async code - Async functions like setTimeout, fetch, or fs.readFile are not handled directly by JavaScript. Instead: They are delegated to the browser's Web APIs or Node.js's C++ libuv library.
// JS registers a callback and continues executing the next lines.

// 5) Task Queues - After async operations finish, their callback functions are sent to one of the Task Queues:
// Microtask Queue - Promise.then, queueMicrotask, MutationObserver
// Macrotask Queue - setTimeout, setInterval, setImmediate (Node.js), requestAnimationFrame (Browser)

// 6) Event Loop - The Event Loop constantly checks: Is the Call Stack empty? If yes: It executes all Microtasks (in order) until Microtask Queue is empty.
// Then, it executes ONE Macrotask from the Macrotask Queue. Repeats.

// Event Loop: There are different phases of event loop.
//  (i) Timers - settimeout, setinterval
//  (ii) Pending Callbacks
//  (iii) Idle Prepare
//  (iv) poll - fs read write
//  (v) check - setimmediate
//  (vi) close callbacks

// Example 1
console.log("Sequence Started"); // Sync Task

function greet(){
    console.log("Hello"); 
}
greet() // Sync Function
console.log("Sequence End"); // Sync Task

// Above three logs will be printed in sequence because all of them are syncronus task. One by one task are pushed to the call stack and executed instantly and poped out.

// Example 2 - Here is the involvement of async task

console.log("Async Started"); // Sync Task

setTimeout(()=>{
    console.log("timeout log");
}, 0) // even the time out is 0 ms, still the task is handled by browser webapi, and then moved to the macro task. then event loop will check if the call stack is empty , then this task is executed

console.log("Async ended"); // Sync Task

// Above will print two sync logs in sequence and at last timeout callback will be called

// Example 3 - Promises and set timeout.

console.log("Micro Macro started");

Promise.resolve("Promise resolved").then((data)=> console.log(data)) // this is also an async task but this is a micro task, it has higher priority than macro task. set timeout is a macro task

setTimeout(()=>{
    console.log("Micro Macro timeout");
    
})

console.log("micro macro ended");

// Example 4 - Allocation phase

function greetName(name) {
  console.log("Hello", name);
} // in creation phase , function is stored by reference in memory
let myName = "Alice"; // In Creation Phase, myname is initialized my undefined

// Then after creation phase, code is executed in execution context. functions have their own execution context

greetName(myName)

// Interview Question 1 - Predict the output
console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

process.nextTick(() => {
  console.log("process.nextTick");
});

setImmediate(() => {
  console.log("setImmediate");
});

console.log("End");

// Output
// start
// end
// process.nextTick
// setImmediate
// setTimeout

// Note: The order of set immediate and set timeout might swap with each other. Because both are macrotask. How will you decide which one execute first between both.
// The ans is simple - it depends actually on the event loop phase. As we said event loop has 6 phase. Check phase is responsible for set immediate and timer phase is responsible for settimeout
// Now whatever is current position of event loop, it moves next to see pending aysnc task. So whatever comes next, it will be executed first.

// -------------------------------------------------------------- Worker thread ---------------------------------------------------------------------------


// As we widely say JS is a single thread. It is a single thread as it has only one main thread . and one call stack for execution
// But how come other async tasks handled by web APIs. Basically web api functionality is provided by browser's and the environment in which browser are running are multi threaded.
// browsers like chrome are built on c++. So under the hood browser is using os level threads. So indirectly our execution is running is multi threaded system.

// We can achieve true multi threading using worker threads. This way actually two js will be running independently, out main thread will not be impacted
// to communicate between these threads, we have to post messages.
// A new thread is running parralelly. But they both are in the same process. So they will share memory as well as resources.
// Worker threads are good for cpu intensive tasks.

// post message or data to worker threads
worker.postMessage('Start heavy work');

// receive messages from worker threads
worker.on('message', (message) => {
  console.log('Received from worker:', message);
  worker.terminate()
});

// error
worker.on('error', (error) => {
  console.error('Worker error:', error);
});

// worker exit
worker.on('exit', (code) => {
  console.log(`Worker exited with code ${code}`);
});

// ---------------------------------------------------------Fork ---------------------------------------------------------------

// In Node.js fork() is a method provided by the child_process module that allows you to create a new child process. 
// It is specifically used to spawn a new Node.js process and is often used for parallel execution or running separate scripts without blocking the main thread.
// You can use message passing between the parent and the child process.
// It's useful for CPU-intensive tasks or tasks you want to isolate.

const child = fork('./child_process.js');

child.send('Hello from parent');

child.on('message', (msg) => {
  console.log('Message from child:', msg);
});

// Note: Diff between worker threads and child process ?
// 1) Worker threads creates a new thread. Both main and new thread are working in the same process. So they are sharing memory and resources.
// but in child process, a new process is created, which has its own memory and resources usage. Now in child process i can again create worker threads.
// 2) Worker threads communicate faster as they are in the same process.


// ------------------------------------------------Clustering ---------------------------------------------------------------------------------------------

// It is a technique by which node js take advantage of multi core system. Built in module cluster in node js.
// It is useful for scalibility and perfornance of application in case of high workload.
// In clustering, mutiple processes of node js are running to ditribute the load evenly.
// Load Balancing is handled by os round robin algorithm.
// The master process distribute incoming request across workers. cluster.isPrimary true for the main process.

// How is clustering different from child process.
// 1) In child process, you manually invoke a new process and decided which script will be executed in different process. But in clustering, you dont have the option for it. 
// Load balancing is automatically taken.
// 2) There is no concept of inter communication in clustering which you already know why. They communicate through IPC.

// import cluster from 'cluster';
// import http from 'http';
// import { cpus } from 'os';

// if (cluster.isPrimary) {
//   for (let i = 0; i < cpus().length; i++) cluster.fork();
// } else {
//   http.createServer((req, res) => {
//     res.end(`Handled by PID: ${process.pid}`);
//   }).listen(3000);
// }


// --------------------------------------------- Control flow -------------------------------------------------------

// It is basically the order of execution. It manages the execution of your code line by line from top to buttom.
// Control flow structures like if, else, for, try etc decides which code will execute
// Advanced control flow with set timeout, promise asyn await does not strictly follow top to bottom floe of execution


// --------------------------------------------- Core Concepts -------------------------------------------------------
// 🔹 Process
// A process is a running instance of a program.
// It has its own memory and system resources.
// One app can run multiple processes.

// 🔹 Thread
// A thread is the smallest unit of execution within a process.
// Threads share memory with other threads in the same process.
// A process can have multiple threads (multi-threaded).

// 🔹 CPU Core
// A core is a physical processing unit on your CPU chip.
// Each core can execute one thread at a time (or more with hyper-threading).

// Process
//  ├─ Thread 1
//  ├─ Thread 2
//  └─ Thread 3

// CPU
//  ├─ Core 1 → can run Thread 1
//  ├─ Core 2 → can run Thread 2
//  └─ Core 3 → can run Thread 3






