import { Observable } from "../Observable/observable.class";
import { ObservableInterface } from "../Observable/observable.interface";
import { ObserverInterface } from "./observer.interface";

export class SmSObserver implements ObserverInterface {
    mobileNumber: number
    observable: ObservableInterface

    constructor(mobileNumber: number, observable: ObservableInterface){
        this.mobileNumber = mobileNumber
        this.observable = observable
    }

    update(): void {
        console.log("Notification sent via sms to ", this.mobileNumber);
        
    }
    
}