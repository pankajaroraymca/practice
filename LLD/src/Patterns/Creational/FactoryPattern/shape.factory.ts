import { CircleShape } from "./circle.shape";
import { SquareShape } from "./square.shape";

export class ShapeFactory {


    constructor() { }

    getShape(shape: string) {
        switch (shape) {
            case 'Circle':
                return new CircleShape()
                break;
            case 'Square':
                return new SquareShape()
                break;
            case 'Rectangle':
                return new CircleShape()
                break;

            default:
                break;
        }
    }

}