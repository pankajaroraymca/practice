// -------------------------------------------Weak Set----------------------------------------

// 1) Just like set , it stores unique value, but only objects not any primitive data type. if you try to store privitive data, it will give you error.
// 2) objects added are held weakly, means if the reference does not exist, it is garbage collected by gc.
// 3) Does not have size , map, methods in it.
// 4) only add, delete, has method is available to use
// 5) why they are used?  for memory efficiency. automatic garbage collection.

const weakSet = new WeakSet();
let demo1 = {
  try: "1",
};
let demo2 = {
  why: "not",
};
weakSet.add(demo1);
weakSet.add(demo2);

console.log("weak set", weakSet.has(demo1));
console.log("weak set", weakSet.has(demo2));

demo2 = null;
console.log("weak set", weakSet.has(demo2)); // false because demo2 does not reference to any object, hence it will be gc

// ---------------------------------------Weak Map ---------------------------------------------

// 1) Just like ordinary map, it stores key value pairs. But keys should be objects and not privite data type, value can be anything.
// 2) Keys object are held weakly, so that it can be gc.
// 3) no map or iterable methods are present.
// 4) only get, set, has , delete methods available

const weakMap = new WeakMap();
let demo3 = {
  map: "value",
};
let demo4 = {
  weak: "yes",
};

weakMap.set(demo3, "it is a object");
weakMap.set(demo4, "it is a also object");

console.log("weak map", weakMap.has(demo3));
console.log("weak map", weakMap.has(demo4));

demo4 = null;
console.log("weak map", weakMap.has(demo4)); // false because demo4 does not reference to any object, hence it will be gc

// Note: if you want to make you normal map behave like weak map means you want you key value pairs to be automaically deleted, then you should use method delete of normal
// map. Because in normal map, key are strongly held means even if the original key is referenced to null, map will still retain it;s copy.
