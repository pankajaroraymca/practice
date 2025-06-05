// Constructors functions are used to create new objects with the same properties. These functions should start with the first Capital letter. 
// New objects will be created by using new keyword.

function Person(name, age){
    this.name = name
    this.age = age
}

const person1 = new Person("Pankaj", 26)
const person2 = new Person("Ankush", 27)

console.log("person1", person1);
console.log("person2", person2);

Person.prototype.greet = function(){
    console.log("Person function name is", this.name);
    
}
person1.greet()

// let's see how it is working under the hood

class PersonClass {
    name

    constructor(name){
        this.name = name
    }

    greet(){
        console.log("Class Person religion is", this.name);
        
    }
}

const classPerson = new PersonClass("Shilpa")
classPerson.greet()
console.log("class Person", classPerson);

// Consclusion - In modern Js, class is just sugar syntactic over constructor functions
// A class can inherit properties of another class bu using extend keyword
// A class is not hoisted unlike constructor functions


