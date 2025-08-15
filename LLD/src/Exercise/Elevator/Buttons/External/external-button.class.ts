import { IElevatorCarController } from "../../ElevatorCar/elevator-car-controller.interface"
import { IExternalButton } from "./external-button.interface"

export class ExternalButton implements IExternalButton {
    private elevatorControllerMap: Map<number, IElevatorCarController>
    private floor: number
    constructor(floor: number) {
        this.elevatorControllerMap = new Map()
        this.floor = floor
     }

    addElevatorController(elevatorController: IElevatorCarController) {
        this.elevatorControllerMap.set(elevatorController.getElevator().getId(), elevatorController)
    }
}