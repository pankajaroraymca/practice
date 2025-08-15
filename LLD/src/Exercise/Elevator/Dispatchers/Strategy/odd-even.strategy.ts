import { ElevatorDispatchStrategy } from "./dispatcher.strategy.abstract"

export class OddEvenElevatorDispatchStrategy extends ElevatorDispatchStrategy {
    canServerEven: boolean

    constructor(canServerEven: boolean) {
        super()

        this.canServerEven = canServerEven
    }

    shouldServeRequest(floor: number): boolean {
        return floor % 2 == 0 && this.canServerEven
    }

}