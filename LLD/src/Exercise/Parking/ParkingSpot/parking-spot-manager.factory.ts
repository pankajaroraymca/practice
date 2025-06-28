import { ParkingSpotManager } from "./parking-spot-manager";
import { IParkingSpotManager } from "./parking-spot-manager.interface";
import { IParkingSpot, VehicleType } from "./parking-spot.interface";

export class ParkingSpotManagerFactory {
    private managers: Map<VehicleType, IParkingSpotManager> = new Map();

    constructor() {

        Object.values(VehicleType).forEach(type => {
            this.managers.set(type, new ParkingSpotManager());
        });
    }

    getManager(vehicleType: VehicleType): IParkingSpotManager {
        const manager = this.managers.get(vehicleType);
        if (!manager) {
            throw new Error(`No manager found for vehicle type: ${vehicleType}`);
        }
        return manager;
    }

    addSpot(spot: IParkingSpot): void {
        const manager = this.getManager(spot.getType());
        manager.addSpot(spot);
    }

    findAvailableSpot(vehicleType: VehicleType): IParkingSpot {
        const manager = this.getManager(vehicleType);
        const spot = manager.findAvailableSpot();

        if (!spot) {
            throw new Error('Spot Not Found');
        }

        return spot;
    }

    occupySpot(spotId: number, vehicleType: VehicleType): boolean {
        const manager = this.getManager(vehicleType);
        return manager.occupySpot(spotId);
    }

    releaseSpot(spotId: number, vehicleType: VehicleType): boolean {
        const manager = this.getManager(vehicleType);
        return manager.releaseSpot(spotId);
    }
}