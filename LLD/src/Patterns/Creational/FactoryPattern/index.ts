import { ShapeFactory } from "./shape.factory";

// Factory Desing Pattern is used to create objects of multiple classes dynamically
// Only Shape fatory is responsible for creating the new instances of shape. 
// Instead of using new ClassName(), you use a factory method that returns the right object.

// Abstract Factory Design Pattern.
// It is same as factory patern. the only difference, it is factory of factories.
// 

const shapeFactory = new ShapeFactory()

const circleShape = shapeFactory.getShape('Circle')
const squareShape = shapeFactory.getShape('Square')
const rectangleShape = shapeFactory.getShape('Rectangle')

console.log(circleShape.draw());
console.log(squareShape.draw());
console.log(rectangleShape.draw());
