import { IExternalButton } from "../Buttons/External/external-button.interface"
import { EDisplayDirection } from "../Display/display.interface"

export interface IFloor {
    getFloorNumber(): number
    addExternalButtons(externalButton: IExternalButton): void
    pressButton(externalButtonId: number, direction: EDisplayDirection): void
}