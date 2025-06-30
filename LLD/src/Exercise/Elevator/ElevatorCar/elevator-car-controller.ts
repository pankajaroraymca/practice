import { IElevatorCarController } from "./elevator-car-controller.interface";
import { IElevatorCar } from "./elevator-car.interface";

export class ElevatorCarController implements IElevatorCarController {
    private elevatorCar: IElevatorCar

    constructor(elevatorCar: IElevatorCar){
        this.elevatorCar = elevatorCar
    }
    addNewRequest(): void {
        throw new Error("Method not implemented.");
    }
    getElevator(): IElevatorCar {
       return this.elevatorCar
    }




}