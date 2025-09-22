// What are event emitters ?

// It is core module of node js. It allows you to create, emit and listen to custom events.,
// By use of these module, an event driven programming language can be possible. And asyncronus also.
// Internally nodejs modules uses event emitters in streams, file system, http connection, process etc.

import { EventEmitter } from 'events';

const emitter = new EventEmitter();

function greetHandler(name) {
  console.log(`Hello, ${name}`);
}

// Listen to an event
emitter.on('greet', greetHandler);

// Emit the event
emitter.emit('greet', 'Alice');

// Stop listening to events
emitter.off('greet', greetHandler)

// even if you emit again, you won't be able to listen it again
emitter.emit('greet', 'Alice');

// it will listen once and automatically removes listening
emitter.once('greet', greetHandler)