import { ParkingSpotManagerFactory } from "../ParkingSpot/parking-spot-manager.factory";
import { VehicleType } from "../ParkingSpot/parking-spot.interface";
import { Ticket } from "../Ticket/ticket";
import { EntryGateInterface } from "./entry-gate.interface";
import { Vehicle } from "../Vehicle/vehicle.class";
import { generateRandomFiveDigitNumber } from "../ParkingSpot/parking-spot.class";
import { ITicket } from "../Ticket/ticket.interface";

export class EntryGate implements EntryGateInterface {

    gateNumber: number;
    parkingSpotManagerFactory: ParkingSpotManagerFactory;

    constructor(parkingSpotManagerFactory: ParkingSpotManagerFactory) {
        this.gateNumber = generateRandomFiveDigitNumber()
        this.parkingSpotManagerFactory = parkingSpotManagerFactory
    }

    generateTicket(vehicle: Vehicle): ITicket {

        const parkingSpot = this.parkingSpotManagerFactory.findAvailableSpot(vehicle.getType())
        this.parkingSpotManagerFactory.occupySpot(parkingSpot.getId(), vehicle.getType())
        const ticket = new Ticket(vehicle, parkingSpot)
        return ticket
    }


}