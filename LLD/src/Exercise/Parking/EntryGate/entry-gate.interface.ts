import { ParkingSpotManagerFactory } from "../ParkingSpot/parking-spot-manager.factory"
import { VehicleType } from "../ParkingSpot/parking-spot.interface"
import { Ticket } from "../Ticket/ticket"
import { ITicket } from "../Ticket/ticket.interface"
import { Vehicle } from "../Vehicle/vehicle.class"

export interface EntryGateInterface {
    gateNumber: number
    parkingSpotManagerFactory: ParkingSpotManagerFactory
    generateTicket(vehicle: Vehicle): ITicket

}