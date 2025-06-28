import { Observable } from "../Observable/observable.class";
import { ObservableInterface } from "../Observable/observable.interface";
import { ObserverInterface } from "./observer.interface";

export class EmailObserver implements ObserverInterface {
    email: string
    observable: ObservableInterface

    constructor(email: string, observable: ObservableInterface){
        this.email = email
        this.observable = observable
    }
    update(): void {
        console.log("Notification sent via email to ", this.email);
        
    }
    
}