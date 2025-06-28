import { VehicleType } from "../ParkingSpot/parking-spot.interface";
import { IVehicle } from "./vehicle.interface";

export class Vehicle implements IVehicle {
    private readonly type: VehicleType;
    private readonly vehicleNumber: string;

    constructor(type: VehicleType, vehicleNumber: string) {
        this.type = type
        this.vehicleNumber = vehicleNumber
    }

    getType(): VehicleType {
        return this.type;
    }

    getNumber(): string {
        return this.vehicleNumber;
    }
}