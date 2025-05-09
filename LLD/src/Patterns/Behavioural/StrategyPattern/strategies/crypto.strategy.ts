import { PaymentStrategy } from "./strategy";

export class CryptoStrategy implements PaymentStrategy {

    pay(amount: number): void {
        console.log("Payment paid using crypto", amount)
    }

}