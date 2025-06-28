import { BasePizza } from "./base-pizza.class";

export class MargeritaPizza extends BasePizza {

    cost: number;
    constructor(){
        super()
        this.cost = 300
    }

    getCost(): number {
        return this.cost
    }
}