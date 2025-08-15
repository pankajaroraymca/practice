import { EDisplayDirection } from "../Display/display.interface";
import { IElevatorCarController } from "../ElevatorCar/elevator-car-controller.interface";

export interface IElevatorDispatcher {
    addElevatorController(elevatorController: IElevatorCarController): void
     handleExternalRequest(floor: number, direction: EDisplayDirection): boolean
}