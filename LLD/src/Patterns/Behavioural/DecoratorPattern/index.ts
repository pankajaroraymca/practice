import { ExtraCheese } from "./decorators/extra-cheese-topping.decorator";
import { Mushroom } from "./decorators/musroom-topping.decorator";
import { MargeritaPizza } from "./margerita-pizza.class";
import { VeggiePizza } from "./veggie-pizza.class";

// Problem: We have to implement Pizza Cost Calculation functionality
// We can solve it by simple technique without decorator pattern, but it will lead to class explosion. Means there will be too many classes for each pizza combination.
// So to solve this we will use decorator pattern, we we have to make base class for each pizza type like veggie or margerita.
// And each class for different types of Topping.
// We will implement both is a and has a relationship becase topping can also be a pizza and base can also be pizza.
// For this relationship, we will have to make abstract class for base pizza and abstract class for topping decorator.


// These are two base pizzas
const vegPizza = new VeggiePizza()
const margeritaPizza = new MargeritaPizza()

console.log("vegPizza price", vegPizza.getCost());
console.log("margeritaPizza price", margeritaPizza.getCost());

// Extra cheese is a topping decorator which takes base pizza as constructor initilization
const vegExtraCheesePizza = new ExtraCheese(vegPizza)
const margeritaExtraCheesePizza = new ExtraCheese(margeritaPizza) 

console.log("vegExtraCheesePizza price", vegExtraCheesePizza.getCost());
console.log("margeritaExtraCheesePizza price", margeritaExtraCheesePizza.getCost());

// Now base pizza with cheese is also a pizza. so will pass this pizza in constructor initalization for another topping decorator
const vegMusroomPizza = new Mushroom(vegPizza)
const margeritaExtraCheeseMushroomPizza = new Mushroom(margeritaExtraCheesePizza)

console.log("vegMusroomPizza price", vegMusroomPizza.getCost());
console.log("margeritaExtraCheeseMushroomPizza price", margeritaExtraCheeseMushroomPizza.getCost());
