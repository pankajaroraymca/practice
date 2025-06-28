export abstract class BasePizza {
    abstract cost: number
    abstract getCost(): number

}

// What is abstract class ?
// A class which can not be directly instantiated directly, it is meant to be extended by another class.
// Some methods with implementation
// Some abstract methods (method declarations without implementation)