import { ElevatorDispatchStrategy } from "../Dispatchers/Strategy/dispatcher.strategy.abstract"
import { IElevatorCar } from "./elevator-car.interface"

export interface IElevatorCarController {
    addNewRequest(floor:number): void
    getElevator(): IElevatorCar
    getElevatorStrategy(): ElevatorDispatchStrategy
}