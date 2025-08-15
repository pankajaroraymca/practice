import { EDisplayDirection } from "../../Display/display.interface"

export interface IExternalButton {
    getId(): number
    pressButton(direction: EDisplayDirection, currentFloor: number): void

}