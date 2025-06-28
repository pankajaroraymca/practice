import { IPricingStrategy } from "../Pricing/pricing,interface";
import { PricingFactory } from "../Pricing/pricing.factory";
import { ParkingSpot } from "./parking-spot.class";
import { VehicleType } from "./parking-spot.interface";

export class FourWheelerParkingSpot extends ParkingSpot {

    constructor(pricingStrategy: IPricingStrategy) {

        super({ type: VehicleType.FOUR_WHEELER, pricingStrategy })
    }
}