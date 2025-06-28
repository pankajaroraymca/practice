import { IPricingStrategy } from "../Pricing/pricing,interface";
import { PricingFactory } from "../Pricing/pricing.factory";
import { VehicleType, IParkingSpot, ParkingSpotConfig, ParkingSpotInfo } from "./parking-spot.interface";

export function generateRandomFiveDigitNumber(): number {
    return Math.floor(10000 + Math.random() * 90000);
}

export abstract class ParkingSpot implements IParkingSpot {

    private readonly id: number;
    private status: boolean;
    private readonly type: VehicleType;
    private readonly pricingStrategy: IPricingStrategy


    constructor(config: ParkingSpotConfig) {
        this.id = generateRandomFiveDigitNumber()
        this.type = config.type;
        this.status = true
        this.pricingStrategy = config.pricingStrategy
    }

    getId(): number {
        return this.id;
    }

    getType(): VehicleType {
        return this.type;
    }

    getStatus(): boolean {
        return this.status;
    }

    getStrategy(): IPricingStrategy {
        return this.pricingStrategy;
    }

    isAvailable(): boolean {
        return this.status
    }

    occupy(): void {
        if (this.status !== true) {
            throw new Error('occupy spot error');
        }
        this.status = false
    }

    release(): void {
        if (this.status !== false) {
            throw new Error('release spot error');
        }
        this.status = true
    }

    getInfo(): ParkingSpotInfo {
        return {
            id: this.id,
            status: this.status,
            type: this.type,
        };
    }

}