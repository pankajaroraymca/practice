
import { IElevatorDispatcher } from "../../Dispatchers/dispatcher.interface"
import { EDisplayDirection, IDisplay } from "../../Display/display.interface"
import { IElevatorCarController } from "../../ElevatorCar/elevator-car-controller.interface"
import { generateRandomFiveDigitNumber } from "../../ElevatorCar/elevator-car.class"
import { IExternalButton } from "./external-button.interface"

export class ExternalButton implements IExternalButton {
    private id: number
    private elevatorDispatcher: IElevatorDispatcher
    constructor(elevatorDispatcher: IElevatorDispatcher) {
        this.id = generateRandomFiveDigitNumber()
        this.elevatorDispatcher = elevatorDispatcher
    }

    pressButton(direction: EDisplayDirection, currentFloor: number) {
        this.elevatorDispatcher.handleExternalRequest(currentFloor, direction)
    }

    getId(): number { return this.id }


}