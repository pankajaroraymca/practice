// -------------------------------------------- What is the command used to create react app ----------------------------------------------
// npx create-react-app my-app

// -------------------------------------------- What is npx used for ? ---------------------------------------------------------------------

// npx stands for Node Package execute. It is used for executing the apps without installing globally.
// we can create react app with npm also but it will be installed globally. Npx does it locally

// ------------------------------------------- What is React js ----------------------------------------------------------------------------

// React js is a library built over js for web and mobile applications.
// It is usefull for building single page web application.
// As it uses component based UI structure. Only those components which have changed will be rendered again in the UI. Thus making its performance better.
// React uses virtual DOM. A virtual dom is a lightweight copy of the real dom.
// Whatever are the changes in the UI, React first updates the changes in the virtual DOM. then these changes are compared with the previous version of the virtual dom.
// only the actual changes are then rendered on to the browser ui. As browser redner is expensive. Whole page rendered will be expensinve.
// Diffing -  This technique of comparing the older version of vDom with the current one is known as diffing. It is also known as diffing algorithm.
// Virtual dom is just plain javascript object in memory. Thus comparing changes is better performance wise
// Reacts uses unidirectional data binding or data flow. Means props data are transfered only in one direction i.e from parent to child. Thus making code more
// predictable and easier to debug.

// ---------------------------------------------Cons of React --------------------------------------------------------------------------------

// It is a library not a framework. Means many other modules are required to be installed separately to fully utilise the features of reactjs


// -------------------------------------------------- What is JSX -------------------------------------------------------------------------

// Stands for Javascript XML.
// It is useful for writing HTML inside javascipt.
// JSX is just a sugar syntaxtic version of React.createElement()
// We can create react application without using jsx.
// To write js code in html, simple use {}.

// Without JSX
React.createElement('h1', null, 'Hello World');

// With JSX
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// ------------------------------------ Diff between functional components and class components -----------------------------------------

// 1) Declaration
// Class based components follows ES6 syntax. While functional compoennts are simple javascipt functions

// 2) Props Handling
// Props needs to be handled differently in clas based components. They needs to be passed in constructor and also super is called. But
// in functional components it is pretty straight forward

// 3) State Managment
// Functional components were there when there was class based components. But ther were stateless compoennts. with the introduction of hooks
//  they are equivalent to class based component in terms of functionalites.


// ------------------------------------- What are controlled and uncontrolled components -----------------------------------------------

// Controlled: Thses components are controlled by React itslef. Take an example. An input box value is controlled by onchange callback function.
// You are in charge to control the component value in realtime


function ControlledInput() {
  const [name, setName] = useState('');

  const handleChange = (event) => setName(event.target.value);

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <p>Typed: {name}</p>
    </div>
  );
}

// Uncontrolled: Here dom itself is responsible for controlling the component. we have to use ref. inputRef.current.value will give the latest value always.
// So what's the issue with it?. Because how do we know value is changed. In realtime form validations, we need onchange event handler. We can use onchange event handler in
// uncontrolled compoent but this make them controlled component.
// Uncontrolled components are best for default form value submissions.

import { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    alert(`Input value: ${inputRef.current.value}`);
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// ----------------------------------------------------------- React side effects ----------------------------------------------------

// In React, side effects are operations that affect something outside the scope of the current function/component or depend on things outside React’s rendering process.
// These side effects are achieved using hook useeffect

// 1) API calls
// 2) Timers and intervals.
// 3) Navigating to different routes.
// 4) Dom Manipulation directly using documents ids.
// 5) Reading/Writing localstorage and cookies.
// 6) Event Listners.

// ------------------------------------------------------------ What is prop drilling ----------------------------------------------------

// Prop drilling is a term used in React to describe the process of passing data (props) from a parent component down to deeply nested child components, 
// even when intermediate components don't need the data themselves, but are required to pass it along.

// Problem?
// 1) Intermediate components are forced to know about data they don’t use.
// 2) Hard to maintain: Adding or modifying deeply used props requires touching many layers.

// Solution
// 1) Context API: Global/Shared state management
// 2) State management tools: Redux.

// ------------------------------------------------------------- Context API vs Redux ------------------------------------------------------

// Both are state management solutions but they differ in complexity, features and use cases.

// 1) Context API is best for small scale applications while redux is suitable for large scale applications. Because Context API is a built in 
// library in react and it's a lightweight library while redux needs to be installed separately.

// 2) Context API boilerplate code is very less as compared to redux as redux boilerplate required store, actions, reducers, middlewares etc.
// Thus learning curve is not easy in case of redux.

// 3) Context API can lead to performance issue in large scale applications because it can cause re render of all components who are consuming the state from context APIs.
// But it can be optimized but needs extra attention. But on the other hand redux has built in optimizations to prevent unnecessary re renders of component.

// 4) Redux provide advanced debugging tools for developers like state diff, actions logs, time travel etc but context API has basic React devtools.
// That's why developer prefer redux for large scale apps because it is more complex to debug.

// -------------------------------------------------------------- What are error boundaries ---------------------------------------------------

// In React, if a component throws an error during rendering, lifecycle methods, or in constructors, the entire component tree below it unmounts — causing the app to crash or show a blank screen.
// Error boundaries help prevent that, by catching the error and showing a safe UI.


// -------------------------------------------------------------- React Routes -------------------------------------------------------------

// Routing in React is handled using a popular library called React Router.
// As we know react apps are single page application. aLL HTML is loaded from single file. Even if the url is changed, page is not refreshed. only the specific component ui is rendered.
// So how it is possible?
// React router internally uses browser history api to change the url. The url is changed but page is nor refreshed. Then the react identifies there is a change is url.
// Allows the React app to detect and render the right component for the new route
// React Router's <BrowserRouter> listens to these URL changes:

// 1) BrowserRouter - Wraps the entire app to enable routing
// 2) Routes - 	Defines multiple routes
// 3) Route - Defines a single path and its component
// 4) Link - Navigation to route without reloading the page
// 5) useNavigate - programitcally route to different path.

// ---------------------------------------------------------How to re-render the view when the browser is resized?-----------------------------------------

// You can add a event listner to resize event, whenever the browser is resized, event will be triggered, then you update the view accroding to needs

import React, { useState, useEffect } from 'react';

function WindowSizeComponent() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <p>Window width: {size.width}px</p>
      <p>Window height: {size.height}px</p>
    </div>
  );
}


// ---------------------------------------------------------Do Hooks cover all the functionalities provided by the classes?-------------------------------------------

// Some functionalities of classes which are not yet provided by hooks as of today.

// 1) error boundaries in class - getDerivedStateFromError()
// 2) getSnapshotBeforeUpdate()


// ------------------------------------------------- Cross origin resource sharing (CORS) ---------------------------------------------------

// It is security mechanism provided by the browser that controls how resources are requested from different domains

// Example scenario:
// Your frontend app runs at http://localhost:3000
// Your backend API runs at http://localhost:5000
// When your frontend tries to call the backend API (fetch("http://localhost:5000/data")), the browser blocks the request by default because it’s a cross-origin request.

// How it works?

// The server sends a preflight request to the server - am i allowed to access resource from this domain
// then server sends the response
// Access-Control-Allow-Origin: http://localhost:3000
// Access-Control-Allow-Methods: GET, POST, PUT
// Access-Control-Allow-Headers: Content-Type, Authorization

// If headers are valid → the browser allows the request. If not → the request is blocked.
