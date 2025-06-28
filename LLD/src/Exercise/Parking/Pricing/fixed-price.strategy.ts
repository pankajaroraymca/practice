import { BasePricingStrategy } from "./base-pricing.abstract";
import { ParkingSession } from "./pricing,interface";

export class FixedPricingStrategy extends BasePricingStrategy {

    private basePrice: number
    constructor(basePrice: number) {
        super()
        this.basePrice = basePrice
    }

    calculateFees(session: ParkingSession): number {

       return this.basePrice

    }

}