import { IPricingStrategy } from "../Pricing/pricing,interface";

export enum VehicleType {
    TWO_WHEELER = 'TWO_WHEELER',
    FOUR_WHEELER = 'FOUR_WHEELER'
}

export interface ParkingSpotConfig {
    type: VehicleType;
    pricingStrategy: IPricingStrategy
}

export interface ParkingSpotInfo {
    id: number;
    status: boolean;
    type: VehicleType;
}

export interface IParkingSpot {
    getId(): number;
    getType(): VehicleType;
    getStrategy(): IPricingStrategy;
    isAvailable(): boolean;
    occupy(): void;
    release(): void;
    getInfo(): ParkingSpotInfo;
    getStatus(): boolean
}