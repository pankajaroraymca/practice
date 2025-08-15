import { IExternalButton } from "../Buttons/External/external-button.interface"
import { EDisplayDirection } from "../Display/display.interface"

export class Floor {
    private number: number
    private externalButtonMap: Map<number, IExternalButton>
    constructor(number: number) {
        this.number = number
        this.externalButtonMap = new Map()
    }

    pressButton(externalButtonId: number, direction: EDisplayDirection) {
        const externalButton = this.externalButtonMap.get(externalButtonId)

        if (!externalButton) {
            throw new Error('Invalid Id.')
        }

        externalButton.pressButton(direction, this.number)

    }

    addExternalButtons(externalButton: IExternalButton) {
        this.externalButtonMap.set(externalButton.getId(), externalButton)
    }

    getFloorNumber(): number {
        return this.number
    }
}