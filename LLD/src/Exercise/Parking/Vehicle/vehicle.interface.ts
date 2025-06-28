import { VehicleType } from "../ParkingSpot/parking-spot.interface";

export interface IVehicle {
    getType(): VehicleType
    getNumber(): string
}