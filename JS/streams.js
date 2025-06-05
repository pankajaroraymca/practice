import fs from 'fs'
// What are streams in js?
// when you want to deal with data in chunks, streams come into play. They can read or write data in chunks without loading the whole data in ram.

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
// 4) Tranaform stream