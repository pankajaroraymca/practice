const fs = require('fs');
// What is Buffer?

// Buffer is a built in class in js to handle binary data directly in memory. It is helpful when dealing with data that comes in stream not whole strings or objects.
// In Js, traditional data is dealt with string utf-16 format but data like files needs to be read as raw bytes. That's where buffers comes in.

const buf1 = Buffer.from('Hello')
console.log("buf", buf1);
// By default buffer converts the strings into bytes of utf8 format 

console.log("buf 1 to string", buf1.toString()); // utf8 buffer is converted back to string

// Buffer fron Array
const buf2 = Buffer.from([60,61,62]) // value in array should be from range 0 to 255. This is the range of byte
console.log("buf2", buf2.toString());


// How to check if something is buffer?
console.log("is buffer", Buffer.isBuffer(buf1));

// What is the purpose of Buffer.byteLength()?
const bytelength = Buffer.byteLength("Pankaj", 'utf-8') // It tells how many number of bytes required to store the converted string in specified format
console.log("bytelength", bytelength);

// Allocate buffer with fixed size of byte 00.
const allocBuf = Buffer.alloc(5) // initialize the buffer of byte size 5 with 00. 
console.log("allocBuf", allocBuf);

// Allocate unsafe buffer with fixed z.
const allocUnsafeBuf = Buffer.allocUnsafe(5) // initialize the buffer of byte size 5 with random memory data. 
console.log("allocUnsafeBuf", allocUnsafeBuf);

// alloc vs allocUnsafe
// 1) alloc is safe and is initialized with 00. Ready to use. But allocunsafe is unsafe as it uses random memory data. so security wise is weak. It needs to be overwrite first to use.
// 2) alloc is slow while allocunsafe is faster performance wise.

// convert the string into base 64
const name = "Pankaj is a coder"
const base64Version = Buffer.from(name).toString('base64')
console.log("base64 version", base64Version);
console.log("original version", Buffer.from(base64Version, 'base64').toString());

// const data = fs.readFileSync('file.jpg'); // returns a Buffer






