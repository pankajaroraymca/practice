import { PaymentContext } from "./context/payment.context";
import { CreditCardStrategy } from "./strategies/creditcard.strategy";
import { UpiStrategy } from "./strategies/upi.strategy";

export function StrategyPattern() {
    const context = new PaymentContext();

    context.setStrategy(new CreditCardStrategy());
    context.pay(1000);  // Output: Paid ₹1000 using Credit Card.

    context.setStrategy(new UpiStrategy());
    context.pay(1500);  // Output: Paid ₹1500 using PayPal.
}


