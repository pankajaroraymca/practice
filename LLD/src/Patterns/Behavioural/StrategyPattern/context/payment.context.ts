import { PaymentStrategy } from "../strategies/strategy";

export class PaymentContext {
    private strategy: PaymentStrategy

    setStrategy(strategy: PaymentStrategy) {
        this.strategy = strategy
    }

    pay(amount: number) {
        this.strategy.pay(amount)
    }
}