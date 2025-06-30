import { EDisplayDirection, IDisplay } from "./display.interface"

export class Display implements IDisplay {
    private floor: number
    private direction: EDisplayDirection

    constructor(){

    }

    setFloor(floor: number){
        this.floor = floor
    }

    setDirection(direction: EDisplayDirection){
        this.direction = direction
    }

    getFloor(){
        return this.floor
    }

    getDirection(){
        return this.direction
    }

    show(){
        console.log("Floor: ", this.floor, " ", this.direction);
    }
}