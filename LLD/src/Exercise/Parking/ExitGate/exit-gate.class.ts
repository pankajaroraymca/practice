import { ParkingSpotManagerFactory } from "../ParkingSpot/parking-spot-manager.factory"
import { generateRandomFiveDigitNumber } from "../ParkingSpot/parking-spot.class"
import { ITicket } from "../Ticket/ticket.interface"

export interface ExitReceipt {
    ticketId: number;
    vehicleNumber: string;
    entryTime: number;
    exitTime: number;
    duration: string;
    fee: number;
}

export class ExitGate {
    gateNumber: number
    parkingSpotManagerFactory: ParkingSpotManagerFactory

    constructor(parkingSpotManagerFactory: ParkingSpotManagerFactory) {
        this.gateNumber = generateRandomFiveDigitNumber()
        this.parkingSpotManagerFactory = parkingSpotManagerFactory
    }

    processExit(ticket: ITicket): ExitReceipt {

        const fees = ticket.calculateFee()
        const spot = ticket.getParkingSpot()
        this.parkingSpotManagerFactory.releaseSpot(spot.getId(), ticket.getVehicle().getType())
        const exitTime = Date.now();
        // Calculate duration
        const durationMs = exitTime - ticket.getEntryTime();
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
        const duration = `${hours}h ${minutes}m`;

        return {
            ticketId: ticket.getId(),
            vehicleNumber: ticket.getVehicle().getNumber(),
            entryTime: ticket.getEntryTime(),
            exitTime,
            duration,
            fee: fees
        };
    }
}