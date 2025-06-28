import { IParkingSpotManager } from "./parking-spot-manager.interface";
import { ParkingSpot } from "./parking-spot.class";
import { IParkingSpot } from "./parking-spot.interface";

export class ParkingSpotManager implements IParkingSpotManager {

    private spots: Map<number, IParkingSpot> = new Map();

    addSpot(spot: IParkingSpot): void {
        this.spots.set(spot.getId(), spot);
    }

    removeSpot(spotId: number): boolean {
        const spot = this.spots.get(spotId);
        if (!spot) return false;

        if (spot.getStatus()) {
            throw new Error('Spot is currently occupied');
        }

        return this.spots.delete(spotId);
    }
    findAvailableSpot(): IParkingSpot | null {
        for (const spot of this.spots.values()) {
            if (spot.isAvailable()) {
                return spot;
            }
        }
        return null;
    }
    occupySpot(spotId: number): boolean {
        const spot = this.getSpotById(spotId);
        if (!spot) throw new Error('Spot Not found');

        spot.occupy();
        return true;
    }
    releaseSpot(spotId: number): boolean {
        const spot = this.getSpotById(spotId);
        if (!spot) throw new Error('Spot Not found');

        spot.release();
        return true;
    }
    getSpotById(spotId: number): IParkingSpot | null {
        return this.spots.get(spotId) || null;
    }
    getAllSpots(): IParkingSpot[] {
        return Array.from(this.spots.values());
    }
    getAvailableSpots(): IParkingSpot[] {
        return this.getAllSpots().filter(spot => spot.isAvailable());
    }
    getStatistics() {
        const total = this.spots.size;
        const available = this.getAvailableSpots().length;
        const occupied = total - available;
        const occupancyRate = total > 0 ? (occupied / total) * 100 : 0;

        return {
            total,
            available,
            occupied,
            occupancyRate: Math.round(occupancyRate * 100) / 100
        };
    }

}