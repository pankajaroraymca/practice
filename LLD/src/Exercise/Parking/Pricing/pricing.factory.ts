import { FixedPricingStrategy } from "./fixed-price.strategy";
import { HourlyPricingStrategy } from "./hourly-price.strategy";
import { MinutelyPricingStrategy } from "./minutely-pricing.strategy";
import { EPricingStrategies, IPricingStrategy } from "./pricing,interface";

export class PricingFactory {

    constructor() {
    }

    getPricingStrategies(type: EPricingStrategies, basePrice: number): IPricingStrategy {
        switch (type) {
            case EPricingStrategies.FIXED:
                return new FixedPricingStrategy(basePrice);

            case EPricingStrategies.HOURLY:
                return new HourlyPricingStrategy(basePrice);

            case EPricingStrategies.MINUTELY:
                return new MinutelyPricingStrategy(basePrice)

            default:
                throw new Error(`Unsupported pricing strategy: ${type}`);
        }
    }

}