import { BasePricingStrategy } from "./base-pricing.abstract";
import { ParkingSession } from "./pricing,interface";

export class MinutelyPricingStrategy extends BasePricingStrategy {

    private basePrice: number
    constructor(basePrice: number) {
        super()
        this.basePrice = basePrice
    }

    calculateFees(session: ParkingSession): number {

        const maxMinutes = Math.max(Math.ceil((session.exitTime - session.exitTime) / (1000 * 60)), 1)
        return maxMinutes * this.basePrice

    }

}