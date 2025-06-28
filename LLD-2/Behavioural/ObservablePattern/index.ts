import { Observable } from "./Observable/observable.class";
import { EmailObserver } from "./Observer/email.observer";
import { SmSObserver } from "./Observer/sms.observer";

// Problem: Design a notify me feature of amazon for product iphone.

// Solution:
// This will be solved using observable
// I will create an observable i.e iphone stock observable. There are as of now 2 observers.
// one is email and second is sms observer. We can add more if required.
// Why we passed observable as constructor injection in observers?
// Because in observers i dont have to manually write instance of.

const iphoneStockCountObservable = new Observable()
const observer1 = new EmailObserver("pankaj@gmail.com", iphoneStockCountObservable)
const observer2 = new SmSObserver(8930499484, iphoneStockCountObservable)
const observer3 = new EmailObserver("ankush@gmail.com", iphoneStockCountObservable)

iphoneStockCountObservable.add(observer1)
iphoneStockCountObservable.add(observer2)
iphoneStockCountObservable.add(observer3)

// when ever the stock is updated, notification will be sent to all observers
iphoneStockCountObservable.setStockCount(10)