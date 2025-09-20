import { useEffect, useMemo, useReducer, useRef, useState } from "react";

// ------------------------------------------------ What is React Hooks -------------------------------------------------------

// React hooks are nothing but functions which helps us use React states and lifecycles features from functional component.
// why they were introduced?
// Because prior this, functional components were stateless

// -------------------------------------------------------------useState ---------------------------------------------------------

// It is a built in hook which is used for state management
// that lets you add state (data that changes over time) to a functional component.

const [count, setCount] = useState(0);

// count stores the current value of the state i.e 0
// setCount is the function to update the value
setCount(1);

// ------------------------------------------------------------- use effect ----------------------------------------------------

// The useEffect React Hook is used for performing the side effects in functional components. With the help of useEffect,
// you will inform React that your component requires something to be done after rendering the component or after a state change.

// The useeffect has 3 lifecycles phases

// 1) Mount -  it will run when the component is first renders
useEffect(() => {
  // some side effect work
}, []); // empty dependency array

// 2) Updated - it will re run when the state of variable is changed.
useEffect(() => {
  // some side effect work
}, [state]);

// 3) Unmount - It will run when the component is removed from the DOM.
useEffect(() => {
  // some side effect work

  return () => {
    // some logic...
  };
}, []); // the code inside the return function will be executed when the component is removed from the dom.

// ----------------------------------------------------- Custom Hooks -----------------------------------------------------

// They are simple js functions which internally uses reacts inbuilt hooks. They starts with 'use'.
// Custom Hooks are reusable functions that let you extract and share logic using React Hooks

// Reusabe hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
const [name, setName] = useLocalStorage("username", "Guest");

// ----------------------------------------------------- use Reducer ------------------------------------------

// It is a powerful alternative to use state.
// It is used when the state is complex, updates using previous state value
// It has main 3 components: 
// 1) Reducer: A function that determines how state updates based on an action.
// 2) dispatch: A function you call to send actions to the reducer.
// 3) initialState: The initial value of the state.

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}

// -------------------------------------------- Use Memo -----------------------------------------

// It is a hook that memorizes the result of a computation so that next time for the same query, it does not re run the whole computation
// it is one of the ways to optimize performance.
// It is used for memorizing the values

// E.g finding fruits based on a query. for the same query we will directly get the fruits instead of runing the whole logic.

import React, { useState, useMemo } from 'react';

const items = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
];

export default function FruitFilter() {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    console.log('Filtering...');
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search fruits..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filteredItems.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------------------------- React Memo -------------------------------------------------

// It avoids unneccessary re-render of the component. Only reder the component when there is a change in its props.
// It is applicable to functional components only.
// It does shallow comparison between old props and new props. means only privitive values are compared like string numbers booleans. arrays and objects are compared by reference.

const MyComponent = ({ name }) => {
  console.log('Rendered:', name);
  return <h3>Hello, {name}</h3>;
};

const MemoizedMyComponent = React.memo(MyComponent);

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <MemoizedMyComponent name="Pankaj" />
    </div>
  );
}

// The component will not be render unless there is a change in property name.


// ------------------------------------------------ Use Callback -------------------------------------------------

// useCallback is a React Hook that returns a memoized (cached) version of a function.
// It’s mainly used to avoid unnecessary re-creations of functions on every render
// dependencies → the array of values that, when changed, will re-create the function.

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});

// here you can see, even we have memorized child component, but when state count changes, whole component is re render. because react memo compare props and functions are compared by reference
// so when count changes, function is recreated so does their reference and child component is re render evcen with using of react memo

// how to solve this?
// we have to also memomrize handle click function, and by using usecallback we can memorize functions
// now reference will remain same so child component will not be rendered again

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // ✅ No re-creation unless deps change

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child2 onClick={handleClick} />
    </>
  );
}

const Child2 = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});



// ------------------------------------------------ Use ref -----------------------------------------------------

// It is a react hook. It is commonly used for 
// 1) Accessing Dom elements directly
// 2) Store values that dont trigger automatic re render

function Timer() {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current += 1;
    console.log("Clicked", countRef.current);
  };

  return (
    <div>
      <p>Count: {countRef.current}</p> {/* UI does NOT reflect changes */}
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// countRef.current will have the updated value always but it will not cause the re render of the component.
// So Count: will always have the initial value i.e 0


// -------------------------------------- use effect layout -------------------------------------

// It is a hook that runs before the browser is repainted.
// Now what does it mean? Repaint is one of the steps of browser rendering process.
// Use effect layout is used when we need to read the dom information and apply the changes to the DOM elements without visual changes.
// If we use normal use effect here, we will some glitches like first we see old changes and then after few seconds new changes will be applied. This is visual changes
// Noraml use effects run after the browser is repainted. Use effect layout runs before browser is repainted.

// ----------------------------------------- React lifecycle methods -------------------------------------------------

// 1) Mounting Phase
// - constructor: to setup the inital values of the component
// - static getDerivedStatesFromProps: to manage states wih the props received of component. Rarerly used
// - render: This method is not optional. It must be used. It is used to render the JSX elements to the UI.
// - componentDidMount - It will run just after the rendering of UI is complete. ( use effect with [] array )

// 2) Updating Phase
// - shouldComponentUpdate - Just like React.memo hook to prevent unneccessary renders. (React.memo)
// - getSnapshotBeforeUpdate - captures infor before the dom is updated ( uselayouteffect )
// - componentDidUpdate - runs after the changes are updated to the Dom ( use effect with dependency )

// 3) Unmounting Phase
// - static getDerivedStateFromError - to show fallback ui in case of error in ui rendering
// - componentDidCatch - runs when error is encouintered in ui rendering part ( error boundary )
// - componentWillUnmount - runs when the component is removed from the dom. ( return function in useeffect with [] dependency )

// ----------------------------------- What is higher order component -----------------------------------

// simply that takes another component to return the new component.
// why? in out application, there are components will similar functionalities with minor code changes. so to follow dry principle
// we need high order component feature

// ---------------------------------- Pure Component ------------------------------------

// It is a base component class that checks the state and props of a component to know whether the component should be updated.
// Instead of using the simple React.Component, we can use React.PureComponent to reduce the re-renders of a component unnecessarily.
// It is used only in classed based component. In functionaly component it is equivalent to the React.memo

// ----------------------------------- Lazy Loading -------------------------------------------------------

// It is an performance optimization technique.
// It is used for less visiting routes or heavy components.
// it decreases the initial js bundle size so performance is optimized.
// whenever that route is visited or that component, dynamically those code are fetched to show to the user. till then fallback ui is shown.
// we have to use Suspense when using lazy loading technique


const About = lazy(() => import('./pages/About'));

<Route path="/about" element={
  <Suspense fallback={<div>Loading page...</div>}>
    <About />
  </Suspense>
} />

// when abount route is navigated, only then About component is loaded, till fallback ui is shown


// --------------------------------------------- What are react optimization techniques? ------------------------------------------------

// 1) React.memo
// 2) Use memo hook
// 3) Lazy Loading
// 4) use callback








