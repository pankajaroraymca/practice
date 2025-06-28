import { Shape } from "./shape.interface";

export class CircleShape implements Shape {
    constructor() { }
    draw(): void {
        console.log("circle is drawing");

    }
}