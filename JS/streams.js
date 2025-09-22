import fs from 'fs'
// What are streams in js?
// when you want to deal with data in chunks, streams come into play. They can read or write data in chunks without loading the whole data in ram.
// In Node.js, streams are instances of the EventEmitter class.

// There are 4 types of streams:

// 1) Readable stream

const readableStream = fs.createReadStream('./assets/IMG_20200116_010555.jpg')

readableStream.on('data', (chunk)=>{
    console.log("chunk is receiving", chunk);
})

readableStream.on('end', (chunk)=>{
  console.log('No more data.');
})


// 2) Writable stream

const writerableStream = fs.createWriteStream('output.jpg');
readableStream.pipe(writerableStream); // copies file efficiently using streams

// 3) Duplex stream

// both readable & writable (e.g., TCP sockets).

// 4) Tranaform stream
// like duplex, but can modify data while passing through (e.g., zlib.createGzip for compression).

// ---------------------------------- Diff between events and stream --------------------------------------------

// A stream is a continuos sequence of events over time
// while event is a single occurence of something happening