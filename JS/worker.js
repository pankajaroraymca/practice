console.log("Hello from worker js");

const { parentPort } = require('worker_threads');

parentPort.on('message', (message) => {
  // Simulate heavy computation
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    sum += i;
  }
  parentPort.postMessage(`Done! Sum is ${sum}`);
});
