import { VehicleType } from "../ParkingSpot/parking-spot.interface";
import { IPricingStrategy, ParkingSession } from "./pricing,interface";

export abstract class BasePricingStrategy implements IPricingStrategy {


    abstract calculateFees(session: ParkingSession): number


}