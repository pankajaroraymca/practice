
// ----------------------------------------------- ES6 version -------------------------------------------------------------------------

// to support es 6 version, you have to define type: "module" in package json file or name your file as .mjs

function add(a,b){
    return a+b
}

// 2) Export as an object

function subtract(a,b){
    return a-b
}

function product(a,b){
    return a*b
}

export default add
export {
    subtract,
    product
}