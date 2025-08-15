import { ElevatorDispatchStrategy } from "../Dispatchers/Strategy/dispatcher.strategy.abstract";
import { EDisplayDirection } from "../Display/display.interface";
import { IElevatorCarController } from "./elevator-car-controller.interface";
import { IElevatorCar } from "./elevator-car.interface";

export class ElevatorCarController implements IElevatorCarController {
    private elevatorCar: IElevatorCar
    private minQueue: number[]
    private maxQueue: number[]
    private pendingRequests: number[]
    private elevatorStrategy: ElevatorDispatchStrategy

    constructor(elevatorCar: IElevatorCar, elevatorStrategy: ElevatorDispatchStrategy) {
        this.elevatorCar = elevatorCar
        this.elevatorStrategy = elevatorStrategy
        this.minQueue = []
        this.maxQueue = []
    }

    addNewRequest(floor: number): void {

        if (this.elevatorCar.getDirection() === EDisplayDirection.UP) {
            if (this.elevatorCar.getCurrentFloor() < floor) {
                this.insertSortedAscending(floor)
            } else {
                this.pendingRequests.push(floor)
            }
        } else if (this.elevatorCar.getDirection() === EDisplayDirection.DOWN) {
            if (this.elevatorCar.getCurrentFloor() > floor) {
                this.insertSortedDescending(floor)
            } else {
                this.pendingRequests.push(floor)
            }
        }else{
            this.elevatorCar.getCurrentFloor() > floor ?  this.insertSortedDescending(floor) :  this.insertSortedAscending(floor)
        }
    }

    getElevator(): IElevatorCar {
        return this.elevatorCar
    }

    getElevatorStrategy(): ElevatorDispatchStrategy {
        return this.elevatorStrategy
    }

    // Priority Queue Insertion methods for O(logn) time compleexity

    // Max Queue
    private insertSortedDescending(num: number) {
        let i = this.maxQueue.findIndex(x => x < num);
        if (i === -1) this.maxQueue.push(num);
        else this.maxQueue.splice(i, 0, num);
    }

    // Min Queue
    private insertSortedAscending(num: number) {
        let i = this.minQueue.findIndex(x => x > num);
        if (i === -1) this.minQueue.push(num);
        else this.minQueue.splice(i, 0, num);
    }
}