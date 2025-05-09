import { PaymentStrategy } from "./strategy";

export class UpiStrategy implements PaymentStrategy {

    pay(amount: number): void {
        console.log("Payment paid using upi", amount)
    }

}