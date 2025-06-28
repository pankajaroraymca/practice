import { BasePizza } from "./base-pizza.class";

export class VeggiePizza extends BasePizza {

    cost: number;
    constructor(){
        super()
        this.cost = 200
    }

    getCost(): number {
        return this.cost
    }
}