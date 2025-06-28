import { ObserverInterface } from "../Observer/observer.interface";
import { ObservableInterface } from "./observable.interface";

// An observable class usually have these method and properties
// An array to store all observers like email and sms in this case
// A stock count property.
// Add and remove methods for observers
// set and get methods for stock count property
// A notify method

export class Observable implements ObservableInterface {

    private observersList: ObserverInterface[]
    private stockCount: number
    constructor(){
        this.observersList = []
        this.stockCount = 0
    }

    add(observer: ObserverInterface): void {
        this.observersList.push(observer)
    }
    remove(observer: ObserverInterface): void {
       this.observersList
    }
    notify(): void {

       for( const item of this.observersList){
            item.update()
       }
    }
    
    setStockCount(count: number): void {
        if(this.stockCount == 0 && count > 0){
            this.notify()
        }
        this.stockCount = count

    }
    getStockCount(): number {
        return this.stockCount
    }
    
}