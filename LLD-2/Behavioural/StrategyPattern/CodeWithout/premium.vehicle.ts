import { Vehicle as Vehicle } from './vehicle.class'

export class PremiumVehicle extends Vehicle {

    constructor() {
        super()
    }

    drive(): void {
        console.log("Vehicle is driving sportsly");
        
    }

}