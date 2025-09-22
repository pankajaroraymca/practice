// ------------------------------- diff between  || and ?? ------------------------------------------

// falsely value --> "", 0, -0, null, undeined, Nan
// ||: If the left operand value is falsely, it will return the right operand even if right operand is also falsely.
// If both values are truthy, it will return the first truthy value
// ??: if the left operand is null or undefined, then only it will return the right operand.

const value = "" || null
const dfg =  "" ?? "abc"
console.log("output", value, dfg); // null ""


const value1 = 1 || "trythy"
const dfg1 =  null ?? "abc"
console.log("output 2", value1, dfg1); // 1 "abc"
