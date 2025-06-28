import { ObserverInterface } from "../Observer/observer.interface"

export interface ObservableInterface {
    add(observer: ObserverInterface): void
    remove(observer: ObserverInterface): void
    notify():void
    setStockCount(count: number): void
    getStockCount(): number
}