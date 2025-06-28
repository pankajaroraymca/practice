import { BasePizza } from "../base-pizza.class";
import { ToppingDecorator } from "./topping.decorator";

export class ExtraCheese extends ToppingDecorator {
    cost: number;
    basePizza: BasePizza

    constructor(basePizza: BasePizza){
        super()
        this.basePizza = basePizza
        this.cost = basePizza.getCost()
    }


    getCost(): number {
        return this.cost + 20
    }
    
}