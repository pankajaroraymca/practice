// ------------------------------------ Why node js uses google v8 engine? ---------------------------------------------

// There are many other js engines provided by different browser like spidermonkey from firefox, chakra from edge.
// 1) still node js chooses v8 because v8 is mostly evolved and is open source. So makes other to contribute.
// 2) V8 compiles js code directly into native machine code using JIT compilation making it faster.
// 3) V8 is written in c++ language, node js is also written in c++, so compatibily is good.

// ------------------------------------why should you separate your app and server? --------------------------------------

// 1) Readibility and Maintainlibilty: Your routes, middleswares, business logic should be in app or server config. like port,  env should go in server file.
// It keep better readibility.
// 2) Reusability: if you want to deploy in serverless archietecture, then your app logic should be separate. 
// If you want to deploy your server in http and https, then also server should be separate
// 3) 

// ------------------------------------- How to measure performance of your async task ---------------------------------

// 1) Simply take the Date.now() time before async operation and again take the Date.now() after async operation is completed. Diff is the time duration.
// 2) You can use the performance hooks. 

import { performance } from 'perf_hooks';

const start = performance.now();

// await someAsyncOperation();

const end = performance.now();
console.log(`Duration: ${end - start} ms`);

