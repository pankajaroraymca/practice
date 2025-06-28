import { VehicleType } from "../ParkingSpot/parking-spot.interface";

export interface ParkingSession {
    entryTime: number;
    exitTime: number;
    vehicleType: VehicleType;
}

export interface IPricingStrategy {
    calculateFees(session: ParkingSession): number

}

export enum EPricingStrategies {
    FIXED = 'FIXED',
    HOURLY = 'HOURLY',
    MINUTELY = 'MINUTELY'
}