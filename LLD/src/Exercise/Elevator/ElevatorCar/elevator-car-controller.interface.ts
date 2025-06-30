import { IElevatorCar } from "./elevator-car.interface"

export interface IElevatorCarController {
    addNewRequest(): void
    getElevator(): IElevatorCar
}