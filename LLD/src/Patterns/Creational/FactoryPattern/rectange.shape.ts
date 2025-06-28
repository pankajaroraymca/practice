import { Shape } from "./shape.interface";

export class RectangleShape implements Shape {
    constructor() { }
    draw(): void {
        console.log("Rectange is drawing");

    }
}