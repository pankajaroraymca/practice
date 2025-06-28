import { ParkingSpot } from "../ParkingSpot/parking-spot.class"
import { IParkingSpot } from "../ParkingSpot/parking-spot.interface"
import { Vehicle } from "../Vehicle/vehicle.class"
import { IVehicle } from "../Vehicle/vehicle.interface"

export interface ITicket {
    getId(): number;
    getEntryTime(): number;
    getVehicle(): IVehicle;
    getParkingSpot(): IParkingSpot;
    calculateFee(): number;
}