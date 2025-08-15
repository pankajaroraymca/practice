import { IElevatorDispatcher } from "../../Dispatchers/dispatcher.interface"
import { IElevatorCarController } from "../../ElevatorCar/elevator-car-controller.interface"

export class InternalButton implements InternalButton {
    private elevatorController: IElevatorCarController
    constructor(elevatorController: IElevatorCarController) {
        this.elevatorController = elevatorController
    }

    pressButton(button: number) {
        const canServeRequest = this.elevatorController.getElevatorStrategy().shouldServeRequest(button)

        if (!canServeRequest) {
            console.log("Can't fulfill floor", button, 'request');
            return false
        }

        this.elevatorController.addNewRequest(button)
        return true
    }
}