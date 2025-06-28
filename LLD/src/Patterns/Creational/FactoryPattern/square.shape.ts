import { Shape } from "./shape.interface";

export class SquareShape implements Shape {
    constructor() { }
    draw(): void {
        console.log("Square is drawing");

    }
}