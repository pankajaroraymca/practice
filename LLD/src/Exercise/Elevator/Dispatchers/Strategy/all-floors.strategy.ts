import { ElevatorDispatchStrategy } from "./dispatcher.strategy.abstract"

export class AllFloorsElevatorDispatchStrategy extends ElevatorDispatchStrategy {


    constructor() {
        super()
    }

    shouldServeRequest(floor: number): boolean {
        return true
    }

}