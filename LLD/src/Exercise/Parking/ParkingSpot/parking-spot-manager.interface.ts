import { IParkingSpot } from "./parking-spot.interface";

export interface IParkingSpotManager {
    addSpot(spot: IParkingSpot): void;
    removeSpot(spotId: number): boolean;
    findAvailableSpot(): IParkingSpot | null;
    occupySpot(spotId: number): boolean;
    releaseSpot(spotId: number): boolean;
    getSpotById(spotId: number): IParkingSpot | null;
    getAllSpots(): IParkingSpot[];
    getAvailableSpots(): IParkingSpot[];
    getStatistics();
}