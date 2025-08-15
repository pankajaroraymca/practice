import { InternalButton } from "../Buttons/Internal/internal-buttons.class";
import { Display } from "../Display/display.class";
import { EDisplayDirection, IDisplay } from "../Display/display.interface";
import { EElevatorCarStatus, IElevatorCar } from "./elevator-car.interface"

export function generateRandomFiveDigitNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
}

export class ElevatorCar implements IElevatorCar {
    private id: number
    private status: EElevatorCarStatus
    private display: IDisplay
    private currentFloor: number
    private direction: EDisplayDirection


    constructor() {
        this.id = generateRandomFiveDigitNumber()
        this.status = EElevatorCarStatus.IDLE
        this.display = new Display()
        this.direction = EDisplayDirection.NONE
    }

    getId(): number {
        return this.id
    }

    getStatus(): EElevatorCarStatus {
        return this.status
    }

    getCurrentFloor(): number {
        return this.currentFloor
    }

    setStatus(status: EElevatorCarStatus): void {
        this.status = status
    }

    setCurrentFloor(floor: number): void {
        this.currentFloor = floor
        this.display.setFloor(floor)
    }

    setDirection(direction: EDisplayDirection) {
        this.direction = direction
        this.display.setDirection(direction)
    }

    getDirection(): EDisplayDirection {
        return this.direction
    }

    move(floor: number): boolean {

        if (floor == this.currentFloor) {
            return true
        }

        if (this.getStatus() != EElevatorCarStatus.IDLE) {
            return false
        }

        this.setStatus(EElevatorCarStatus.MOVING)
        if (floor > this.currentFloor) {
            this.setDirection(EDisplayDirection.UP)

            for (let i = this.currentFloor; i <= floor; i++) {
                this.setCurrentFloor(i)
                this.display.show()

            }
        } else {
            this.setDirection(EDisplayDirection.DOWN)

            for (let i = this.currentFloor; i >= floor; i--) {
                this.setCurrentFloor(i)
                this.display.show()
            }
        }
        this.setStatus(EElevatorCarStatus.IDLE)
        this.setDirection(EDisplayDirection.NONE)
        return true
    }
}