const _ = require('lodash');

// How many ways i can create objects in js?

// 1) Object literals :

let obj1 = {
  name: "Pankaj",
  age: 26,
};
console.log("obj1", obj1);

// 2) Object assign method:

let obj2 = Object.assign({}, { name: "Ankush", age: 27 });
console.log("obj2", obj2);

// 3) Object create method

let obj3 = Object.create(null);
obj3.name = "Shilpa";
obj3.age = 30;

console.log("obj3", obj3);

// 4 Class

class Person {
  name;
  age;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let obj4 = new Person("Shubham", 26);

console.log("obj4", obj4);

// 5 Constructor function

function PersonFunction(name, age) {
  this.name = name;
  this.age = age;
}

const obj5 = new PersonFunction("Vikas", 29);
console.log("obj5", obj5);

// 6) Object new

const obj6 = new Object();
obj6.name = "Ram";
obj6.age = 31;

console.log("obj6", obj6);

// ---------------------------------------- Pass by Value and Pass by reference ------------------------------------

// 1) Primitive data types like string number are pass by value

let isPassValue = "hey pass by value";

function PassValue(data) {
  data = "changed the value";
}

console.log("inital value", isPassValue);
PassValue(isPassValue);
console.log("final value", isPassValue); // the final value will be same, because a new copy is passed to the function

// 2) Non primitive data type like object array are also pass by value, it's just the value passed is referenced of the object/array
// 3) When we do comparisons on non primitive data types, they are also on refernces.
// 4) They are mutable, means the content can be changed even after declaring with const. Because const variable is storing the refernce not the actual object.
// 5) if you want to disable the mutable behavior of object, use freeze method

function update(obj) {
  obj.name = "John";
}

let user = { name: "Alice" };
update(user);
console.log(user.name); // Output: "John", because the obj pass is by refenence, it is actually updaitng the orignal obj

// How do you copy non primitive data types then?

// 1) Shallow copy - using spread operator
// here there is a problem, only the top level properties are copied, rest are still referenced.

let demo5 = {
    key1: "value 1",
    key2: {
        nestedKey1: "nestedValue",
        key3: {
            nestedKey2: "nestedValue"
        }
    }
}

let copyObj = {
    ...demo5
}

copyObj.key2.key3 = "value has been changed"

console.log("shallow copy", demo5) // as you can see, original demo5 obj has been changed.

// 2) Deep Copy - Copy all levels including nested key value pairs.
// but it won't work with function, map, set etc.

let demo6 = {
    task: "make a coffee",
    data: {
        amount: "20",
        data: {
            ingredients: "caffeine"
        }
    },
    greet: function(){
        console.log("cofee is ready");
        
    }
}

let deepCopyObj1 = JSON.parse(JSON.stringify(demo6))
deepCopyObj1.data.amount = 100 // 
console.log("deep copy", demo6); // the original demo6 object remains the same, it means we have cloned it deeply
// deepCopyObj1.greet() // it will give you error as this copy method does not work with functions

// 3) Deep Copy - Using lodash
// works with function, map, set etc.

const deepCloneWithLoadash = _.cloneDeep(demo6)
console.log("deepCloneWithLoadash", deepCloneWithLoadash);
deepCloneWithLoadash.greet() // functions are intact with lodash deep clone





