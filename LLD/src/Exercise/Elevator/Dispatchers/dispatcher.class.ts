import { EDisplayDirection } from "../Display/display.interface"
import { IElevatorCarController } from "../ElevatorCar/elevator-car-controller.interface"


export class ElevatorDispatcher {
    private elevatorControllerList: IElevatorCarController[]
    constructor() {
        this.elevatorControllerList = []
    }

    addElevatorController(elevatorController: IElevatorCarController): void {
        this.elevatorControllerList.push(elevatorController)
    }

    handleExternalRequest(floor: number, direction: EDisplayDirection): boolean {

        // find applicable elevator controller
        const filteredController = this.elevatorControllerList.filter(item => item.getElevatorStrategy().shouldServeRequest(floor))

        if (!filteredController.length) {
            console.log("Can't fulfill floor", floor, 'request');
            return false
        }

        filteredController.forEach((item) => {
            item.addNewRequest(floor)
        })
        return true
    }

    getElevatorControllerList(): IElevatorCarController[]{
        return this.elevatorControllerList
    }
}