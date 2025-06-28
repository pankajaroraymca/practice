import { Vehicle as Vehicle } from './vehicle.class'

export class SportsVehicle extends Vehicle {
    constructor(){
        super()
    }

    drive(): void {
        console.log("Vehicle is driving sportsly");
        
    }
}