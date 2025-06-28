import { generateRandomFiveDigitNumber, ParkingSpot } from "../ParkingSpot/parking-spot.class";
import { IParkingSpot } from "../ParkingSpot/parking-spot.interface";
import { Vehicle } from "../Vehicle/vehicle.class";
import { IVehicle } from "../Vehicle/vehicle.interface";
import { ITicket } from "./ticket.interface";

export class Ticket implements ITicket {
    private id: number
    private entryTime: number;
    private parkingSpot: IParkingSpot;
    private vehicle: Vehicle;

    constructor(vehicle: Vehicle, parkingSpot: IParkingSpot) {
        this.entryTime = Date.now()
        this.parkingSpot = parkingSpot
        this.vehicle = vehicle
        this.id = generateRandomFiveDigitNumber()
    }

    getId(): number {
        return this.id;
    }

    getEntryTime(): number {
        return this.entryTime;
    }

    getVehicle(): IVehicle {
        return this.vehicle;
    }

    getParkingSpot(): IParkingSpot {
        return this.parkingSpot;
    }

    calculateFee(): number {
        const pricingStrategy = this.parkingSpot.getStrategy()
        const session = {
            entryTime: this.entryTime,
            exitTime: Date.now(),
            vehicleType: this.vehicle.getType()
        }
        return pricingStrategy.calculateFees(session)
    }

}