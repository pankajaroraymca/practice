import { Drive } from "./interface/drive.interface";

export class Vehicle{

    private driveMode: Drive
    constructor(driveMode: Drive){
        this.driveMode = driveMode
    }

    drive(): void {
        this.driveMode.drive()
    }
}