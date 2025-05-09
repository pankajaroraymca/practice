import { PaymentStrategy } from "./strategy";

export class CreditCardStrategy implements PaymentStrategy {

    pay(amount: number): void {
        console.log("Payment paid using credit card", amount)
    }

}