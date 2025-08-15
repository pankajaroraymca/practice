import { ElevatorDispatchStrategy } from "./dispatcher.strategy.abstract"

export class FixedElevatorDispatchStrategy extends ElevatorDispatchStrategy {
    serveFloors: Set<number>

    constructor(serveFloors: number[]) {
        super()
        this.serveFloors = new Set()
        serveFloors.forEach(item => this.serveFloors.add(item))
    }

    shouldServeRequest(floor: number): boolean {
        return this.serveFloors.has(floor)
    }

}