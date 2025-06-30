import { IElevatorCarController } from "../../ElevatorCar/elevator-car-controller.interface"
import { IExternalButton } from "./external-button.interface"

export class ExternalButton implements IExternalButton {
    private elevatorControllerMap: Map<number, IElevatorCarController>
    constructor() {
        this.elevatorControllerMap = new Map()
     }

    addElevatorController(elevatorController: IElevatorCarController) {
        this.elevatorControllerMap.set(elevatorController.getElevator().getId(), elevatorController)
    }
}