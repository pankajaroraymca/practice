// ---------------------------------------------ES6 Version ----------------------------------------------

import add from './exports.js' // you have exported add as default, thats why you can directly access it
import { subtract, product } from './exports.js'; // other non default properties can be accessed like this

import * as everything from './exports.js' // you can access everything including default and non default properties like this



console.log("default", add);
console.log("non default", subtract, product);
