// What are event emitters ?

// It is core module of node js. It allows you to create, emit and listen to custom events.,
// By use of these module, an event driven programming language can be possible. And asyncronus also.
// Internally nodejs modules uses event emitters in streams, file system, http connection, process etc.

import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// Listen to an event
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}`);
});

// Emit the event
emitter.emit('greet', 'Alice');