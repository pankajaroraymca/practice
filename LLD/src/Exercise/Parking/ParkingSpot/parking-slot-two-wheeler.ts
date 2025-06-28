import { IPricingStrategy } from "../Pricing/pricing,interface";
import { ParkingSpot } from "./parking-spot.class";
import { VehicleType } from "./parking-spot.interface";

export class TwoWheelerParkingSpot extends ParkingSpot {

    constructor(pricingStrategy: IPricingStrategy) {

        super({ type: VehicleType.TWO_WHEELER, pricingStrategy })
    }
}