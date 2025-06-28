import { EntryGate } from "./EntryGate/entry-gate";
import { ExitGate } from "./ExitGate/exit-gate.class";
import { TwoWheelerParkingSpot } from "./ParkingSpot/parking-slot-two-wheeler";
import { FourWheelerParkingSpot } from "./ParkingSpot/parking-spot-four-wheeler";
import { ParkingSpotManagerFactory } from "./ParkingSpot/parking-spot-manager.factory";
import { VehicleType } from "./ParkingSpot/parking-spot.interface";
import { EPricingStrategies } from "./Pricing/pricing,interface";
import { PricingFactory } from "./Pricing/pricing.factory";
import { Vehicle } from "./Vehicle/vehicle.class";

async function run() {

    // Step 1: Idenitfy the Key Objects for the LLD of Parking Spot
    // Objects are Entry Gate, Parking Spots, Vehicles, Ticket, Exit Gate, Pricing Strategies for fees calculation

    // Entry Gate: Tere can be multiple entry gates for the parking system

    // Parking Spots: Parking Spots are of different types. Two Wheeler, Four Wheeler etc There will be a Parking Manager for
    // managing different types of parking spots.

    // Vehicle: There are different types of vehicle two wheelers, four wheeler, trucks etc.

    // Ticket: A ticket will be generated while entering the gate.

    // Exit Gate: There can be multiple exit gates. Upon exiting, fees is calculated. There are different pricing strategies like
    // hourly, minutely, fixed etc.

    // Get the Parking Spot Manager
    const parkingSpotManager = new ParkingSpotManagerFactory()

    // Create the first gate
    const gate1 = new EntryGate(parkingSpotManager)

    // Get the factory method for creating different types of strategies. We can also fixed pricing strategies for each type of spots
    const pricingStrategyFactory = new PricingFactory()

    // Create multiple two wheeler spots
    const twoWheelerParkingSpot1 = new TwoWheelerParkingSpot(pricingStrategyFactory.getPricingStrategies(EPricingStrategies.HOURLY, 20))
    const twoWheelerParkingSpot2 = new TwoWheelerParkingSpot(pricingStrategyFactory.getPricingStrategies(EPricingStrategies.FIXED, 100))
    const twoWheelerParkingSpot3 = new TwoWheelerParkingSpot(pricingStrategyFactory.getPricingStrategies(EPricingStrategies.MINUTELY, 2))

    // Create multiple four wheeler spots
    const fourWheelerParkingSpot1 = new FourWheelerParkingSpot(pricingStrategyFactory.getPricingStrategies(EPricingStrategies.MINUTELY, 60))
    const fourWheelerParkingSpot2 = new FourWheelerParkingSpot(pricingStrategyFactory.getPricingStrategies(EPricingStrategies.FIXED, 500))
    const fourWheelerParkingSpot3 = new FourWheelerParkingSpot(pricingStrategyFactory.getPricingStrategies(EPricingStrategies.HOURLY, 5))

    // Ask manager to add the spots in the list
    parkingSpotManager.addSpot(twoWheelerParkingSpot1)
    parkingSpotManager.addSpot(twoWheelerParkingSpot2)
    parkingSpotManager.addSpot(twoWheelerParkingSpot3)


    parkingSpotManager.addSpot(fourWheelerParkingSpot1)
    parkingSpotManager.addSpot(fourWheelerParkingSpot2)
    parkingSpotManager.addSpot(fourWheelerParkingSpot3)

    // Get their respective managers to see the stats
    const twoWheelerManagerOnly = parkingSpotManager.getManager(VehicleType.TWO_WHEELER)
    const fourWheelerManagerOnly = parkingSpotManager.getManager(VehicleType.FOUR_WHEELER)

    console.log("stats 2 wheeler", twoWheelerManagerOnly.getStatistics());
    console.log("stats 4 wheeler", fourWheelerManagerOnly.getStatistics());

    // Create different types of vehicles
    const vehicle1 = new Vehicle(VehicleType.TWO_WHEELER, 'R2200')
    const vehicle2 = new Vehicle(VehicleType.TWO_WHEELER, 'AZS00')
    const vehicle3 = new Vehicle(VehicleType.FOUR_WHEELER, 'PB459')

    // Generate their ticket through gate number 1
    const ticket1 = gate1.generateTicket(vehicle1)
    const ticket2 = gate1.generateTicket(vehicle2)
    const ticket3 = gate1.generateTicket(vehicle3)

    // Check again stats of respective parking spots
    console.log("stats 2 wheeler", twoWheelerManagerOnly.getStatistics());
    console.log("stats 4 wheeler", fourWheelerManagerOnly.getStatistics());

    // Implement a delay to see real world scenario of parking fees based on strategies.
    const delay = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, 1000)
    })
    await delay

    // Create the first exit gate
    const exitGate1 = new ExitGate(parkingSpotManager)

    // Process vehicle exits and calculate their fees
    const receit1 = exitGate1.processExit(ticket1)
    const receit2 = exitGate1.processExit(ticket2)
    const receit3 = exitGate1.processExit(ticket3)

    console.log("receit1", receit1);
    console.log("receit2", receit2);
    console.log("receit3", receit3);

    console.log("stats 2 wheeler", twoWheelerManagerOnly.getStatistics());
    console.log("stats 4 wheeler", fourWheelerManagerOnly.getStatistics());

    // What we can further improve?
    // 1) We can set pricing strategies like tax, rush hours, subscription model
    // 2) We can have multiple entry and exit gates
    // 3) We can also have floors for parking
}

run()




