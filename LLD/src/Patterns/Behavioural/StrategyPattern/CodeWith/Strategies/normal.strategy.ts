import { Drive } from "../interface/drive.interface";

export class NormalDrive implements Drive {

    constructor (){

    }

    drive(): void {
        console.log("Vehicle is driving normally");
        
    }

    

}