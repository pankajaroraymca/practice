import { useState } from "react"
import { CounterClassComponent } from "../components/basic-component.class"
import ErrorBoundary from "../components/error-boundary-component"

export function LandingPage(props) {

    const [count, setCount] = useState(0)

    function increaseCounter(e) {
        setCount(count + 1)
    }

    return (
        <>
            <ErrorBoundary>
                <h5>This is a Landing Page</h5>
                <span>Counter: {count}</span>
                <button onClick={increaseCounter}>Increase Counter</button>
                <CounterClassComponent name="Pankaj" age="6"></CounterClassComponent>
            </ErrorBoundary>

        </>
    )
}