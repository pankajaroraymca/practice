// ----------------------------------------- module.exports---------------------------------------

// In Node.js, every file is treated as a module. module.exports is the object that a module returns when it's required elsewhere.
// This is a common js practice of exporting importing.

// -----------------------------------------------------Common js version ------------------------------------------------------

// 1) Exporting a function

function add(a,b){
    return a+b
}

module.exports = add

// 2) Export as an object

function subtract(a,b){
    return a-b
}

module.exports = {
    add, 
    subtract
} 

// Note: Module export is overwritten at the end.

function product(a,b){
    return a*b
}

// exports method is the shorthand for module.exports. Both point to the same thing
// When you import or require any exported thing, then internally node js checks the object which is refering to module.exports.
// but if you try to break the relationship like here you are assigning new value, it will be ignored. 
// you will not be able to use product function like this.

// exports= product

// instead do like this.
exports.product = product // this function will not be exported. Why because whole module is exported above. exports is just the reference to module.exports. when module.exports is done, the reference is broken

// you have to export again
module.exports = {
    add, 
    product
}