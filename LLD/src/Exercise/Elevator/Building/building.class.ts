import { IFloor } from "../floors/floor.interface";

export class Building {
    floorList: IFloor[]
    constructor() {
        this.floorList = []
    }

    addFloors(floor: IFloor) {
        this.floorList.push(floor)
    }
}