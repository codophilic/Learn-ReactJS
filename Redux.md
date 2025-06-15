# About Redux

- What is Redux? Redux is a state management library that helps you manage and share data (called "state") across components in a predictable and centralized way.
- Think of it like a global storage box that React components can use to read from or write to.

## Different types of States

![alt text](image.png)


- We have seen React's State Management Hooks like `useState` or `useReducer` so that we can tell React that some data changed and so that it then updates the UI. But we can split the definition of state into three main kinds of state.

1. Local State
    - Local state is state so data which changes that affects UI which belongs to a single component. And for example, if we listen to a user input and we use `useState` to store that input with every keystroke in a state variable. Or we have a button that toggles some detailed field.
    - So if we click that button we show the details if we click it again we hide them. That would be local state. And typically we manage such local state inside of a single component with `useState`

2. Cross-component State
    - Now we also often have state that affects not just one component but multiple components. That would be cross component state.
    - For example, if we have a button that opens or closes a modal overlay such a modal component might affect multiple components. So then we have multiple components working together to display and hide a modal. And we can also implement that with `useState` or `useReducer` we then just need to pass props around so we need to build those prop chains or do this prop drilling as it's also called where we pass drops across multiple components where we also might pass functions as props across multiple components
    - That's not bad or anything like that it's just a little bit more complex than local state.


3. App-wide State
    - Sometimes we also have State that does not just affect multiple components but basically all components of an application. Now when that happens we could call this app-wide state
    - An example here would be user authentication. If we logged in we might need to change the navigation bar because we now show new options or menu on application and we also certainly affect a lot of other components which now show more or less data.
    - We can also manage this with the `useState`, `useReducer` and then by passing state values like prop-drilling




- Now for cross-component and app-wide state passing around data and updating function fruit props can become cumbersome though. And that's why we came across about React Context. React Context is a built in feature in React that makes managing cross-component or application wide state easier. So that's one way of simplifying cross-component and app-wide state management.
- Redux solves the same problem. So both React Context and Redux are there to help us manage such cross-component or app-wide States.
- **`But Why do we need Redux if we already have React Context for managing state that affects multiple components?`**

### React Context Potential Disadvantages

![alt text](image-1.png)


- One potential disadvantage is that with React Context, you can have a very complex setup and managing state with React Context can become quite complex. And that definitely depends on the kind of application you're building.
- For a lot of small or medium-sized applications that will very likely not be a problem. But if you're building a large application an enterprise level application with a lot of components and a lot of things going on, then when using React Context, you can end up with code like this

![alt text](image-2.png)

- Where you have a lot of different pieces of Context,  lot of different States that affect multiple components or the entire app, and therefore a lot of different Context Provider components which you built for managing these states. And you can end up with deeply nested JSX code
- Either using this way or you could just use one big Context and one Context Provider component for a managing the entire state and all the different kinds of state of your application.

![alt text](image-3.png)


- But that could lead in a large Context Provider component which manages a lot of different things, and therefore itself becomes quite difficult to maintain and manage because it's doing a lot of things. You might end up with a large Context that cares about authentication, theming, user input, if a modal should be displayed or not, and maybe a lot of other things as well.
- You can absolutely face this problem in real react projects you might be working on, and therefore this is one potential disadvantage.
- Another potential disadvantage could be performance. We have an official quote by a member of their React team, who basically says that the React Context, **that React Context is great for low-frequency updates like changing a theme, or maybe also authentication, but it's not that great if your data changes a lot**.

![alt text](image-4.png)

- So he says that React Context is not really a great replacement for Redux in all scenarios, in all cases. So therefore Redux is an alternative for React Context.


>[!NOTE]
> - Typically for application wide-state, you will only use one of the two, but then you could be using Redux for the general application wide-state and still use Context for selected multi-component states which are important in parts of your application.
> - So mixing and matching like that would also be possible


## How Redux Works?

- Redux is like a central control room that manages all the data (state) of your app. Instead of data being scattered in different components, Redux keeps everything in one place, so it's easier to manage and debug.
- Well, Redux is all about having one Central data or state store, in your application. **You have exactly one store. You never have more than one store.** It's one store, for all your state for your entire application.
- So in this store, you would store authentication state theming, maybe some user input state you wanna save, whatever it is. Whichever cross component or app wide state you have, it goes into this one store.
- Let's understand some concepts in redux.


![alt text](image-5.png)



- So we have this Central Data Store that we can use it from inside our components. Because if some data there changes, we wanna know about that change to the react components so that the UI gets update accordingly.
- All the components must set up subscription to our Central Store. They subscribe to the store, and whenever the data changes, the store notifies components, and then components can get the data they need, and they can then use it in UI.
- So data changes from time to time. So how do we change data into stored in? Here's one very important rule. **Components, never directly manipulate the store data.** So we have that subscription, but we don't have a data flow in the other direction. So how will the data or state would get changed? we use a concept called reducers.
- We have a reducer function is responsible, for mutating the data or state. So for changing the store data. This reducer function is **not** `useReducer()` hook. Reducer functions in general, are just a general concept. Reducer functions are functions, which takes some input, and then transform that input, they reduce it, and spit out a new output a new result. So we have a reducer function, which is responsible for updating the store data.

![alt text](image-6.png)

- We know component can subscribe to the data but do we now connect components and that reducer function? Because ultimately, it will of course be the components that should trigger a data change. We have `actions` and components `dispatch` actions. And therefore we could also say that components trigger, certain actions. Now an action is really just a simple JavaScript object, which describes the kind of operation, the reducers should perform. Therefore, Redux then forwards actions to the reducer, reads that description of the desired operation, and then this operation is performed by the reducer.
- So components dispatch actions, which describe what should be done, but don't do it directly, then these actions are forwarded to the reducer, the reducer then does what the action wants, the reducer to do. And then the reducer, spits out a new state, which effectively will replace the existing state in that Central Data Store. And when that happens, when that state in that data store is updated, subscribing components are notified, so that they can update their UI.
- That's how Redux works.
- Let's see a simplest implementation of Redux. So let's create a new folder `simple-example-redux`. Let's create a simple javascript file `redux-demo.js`. Run below command to create a `package.json`.

```
npm init -y
```

- The flag `-y` answers `Yes` to all default question which is asked in the CMD. Now let's install redux.

```
npm install redux
```

- `redux-demo.js` will be executed as `NodeJS` and not normal JS file. So now we will import redux and create a store.

```
const redux = require('redux');

// Creating a Store
const store = redux.createStore();
```

- Now let's create a reducer function which will determined what data must be given to the store. The reducer function which takes action and based on the action it will produce new state snapshots.

```
const redux = require('redux');

// Reducer function
/**
 * Here, we define a reducer function that takes the current state and an action,
 * and returns a new state based on the action type.
 * The state is initialized with a default value of { count: 0 }.
 * The reducer handles two action types: 'INCREMENT' and 'DECREMENT'.
 * When 'INCREMENT' is dispatched, it increases the count by 1.
 * When 'DECREMENT' is dispatched, it decreases the count by 1.
 * If the action type is not recognized, it returns the current state unchanged.
 * This is a pure function, meaning it does not have side effects and always returns the same output for the same input.
 */
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}


// Creating a Store
const store = redux.createStore(reducer); //Passing the reducer to store
```

- The reducer function must have an initial state value when its is loaded `state = { count: 0 }`.
- The reducer function usually returns an object but it can return anything like number, string etc.. Now let's create a subscriber.

```
const redux = require('redux');

// Reducer function
/**
 * Here, we define a reducer function that takes the current state and an action,
 * and returns a new state based on the action type.
 * The state is initialized with a default value of { count: 0 }.
 * The reducer handles two action types: 'INCREMENT' and 'DECREMENT'.
 * When 'INCREMENT' is dispatched, it increases the count by 1.
 * When 'DECREMENT' is dispatched, it decreases the count by 1.
 * If the action type is not recognized, it returns the current state unchanged.
 * This is a pure function, meaning it does not have side effects and always returns the same output for the same input.
 */
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}


// Creating a Store
const store = redux.createStore(reducer); //Passing the reducer to store

// Subscribe to store updates
// This function will be called whenever the state changes
// It logs the updated state to the console.
const subscription = () => {
  console.log('State updated:', store.getState());
};

store.subscribe(subscription); // Register the subscription function
```

- Now let's modify our state by dispatch.

```
const redux = require('redux');

// Reducer function
/**
 * Here, we define a reducer function that takes the current state and an action,
 * and returns a new state based on the action type.
 * The state is initialized with a default value of { count: 0 }.
 * The reducer handles two action types: 'INCREMENT' and 'DECREMENT'.
 * When 'INCREMENT' is dispatched, it increases the count by 1.
 * When 'DECREMENT' is dispatched, it decreases the count by 1.
 * If the action type is not recognized, it returns the current state unchanged.
 * This is a pure function, meaning it does not have side effects and always returns the same output for the same input.
 */
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}


// Creating a Store
const store = redux.createStore(reducer); //Passing the reducer to store

// Subscribe to store updates
// This function will be called whenever the state changes
// It logs the updated state to the console.
const subscription = () => {
  console.log('State updated:', store.getState());
};

store.subscribe(subscription); // Register the subscription function


// Dispatching actions modify the state based on the reducer logic. In reducer function,
// we defined how the state should change in response to different actions.
store.dispatch({ type: 'INCREMENT' }); // Dispatch an action to increment the count
store.dispatch({ type: 'INCREMENT' }); // Dispatch another action to increment the count
store.dispatch({ type: 'DECREMENT' }); // Dispatch an action to decrement the count
store.dispatch({ type: 'UNKNOWN' }); // Dispatch an action with an unknown type (no change expected)
// The subscription function will log the updated state after each dispatch
```

- On console

```
State updated: { count: 1 }
State updated: { count: 2 }
State updated: { count: 1 }
State updated: { count: 1 }
```


>[!IMPORTANT]
> - **Redux is not react specific, it can be used with vanilla javascript as well**

### Redux in React

- Let's implement the above counter into react application. Let's create a folder `simple-react-redux` and create a simple react app.
- Run command `npm create vite@latest simple-react-redux-counter -- --template react`. It will create a new react application with help of vite. After navigating to your project directly install the dependencies `npm install`. To start the development server run `npm run dev`.


![alt text](image-7.png)

- Let's modify the `App.jsx`, and create a new component under `/component` folder.

```
//Counter.jsx

import classes from './Counter.module.css';

export default function Counter(){
    return (
     <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>-- COUNTER VALUE --</div>
    </main>
    )
}

//Counter.module.css

.counter {
  margin: 5rem auto;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  width: 40rem;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background-color: #f4f0fa;
}

.counter h1 {
  text-transform: uppercase;
  color: #575757;
  margin: 0;
  font-size: 1rem;
}

.value {
  font-size: 2rem;
  color: #3c0080;
  margin: 2rem 0;
  font-weight: bold;
}

//App.jsx
import Counter from '../component/Counter'
import './App.css'

function App() {

  return (
      <div className="card">
        <Counter />
      </div>
  )
}

export default App
```

- On browser

![alt text](image-8.png)

- Let's setup store and reducer function with help of `redux` library under folder `store`

```
//store.js
import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
```

- Install `react-redux` library as it helps to connect react and redux.
- Now we have set-up our store and to provide our Redux store to the React app, we typically go to `main.jsx` where our `App` component is mentioned, where we rendered the entire app and now import `Provider` from `react-redux` library and pass our react store

```
//main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
)
```

- We wrap, all our root component, with `Provider` and provide this store access to all our component as root is the highest component level. You could also wrap nested components with provider, but only wrapped components and their all child components, and further nested child component will have access to Redux store. If maybe your entire app, needs access to the store, you should typically provide, on root level which is the highest level.
- Now just by wrapping Provider around app, we're not telling to react that which store you need to share across the component, We have a `store` prop in `Provider` which we have to set to the `store` value of our react store and that now provides our Redux store to this react app.
- Now all the child components can tap into that store. They can get data out of the store. They can set up a subscription to that data to be precise, and they also can dispatch actions.
- Now let's use the redux data or state in our `Counter` component. Now here in `Counter` component we show the current counter from the store. To do so we need to use `useSelector` which is hook provided by `react-redux` library. There also is `useStore` hook, which we could use as well which gives us direct access to the store but `useSelector` is a bit more convenient to use because that allows us to then automatically select a part of our state managed by the store.

```
import { useSelector } from 'react-redux';
import classes from './Counter.module.css';
export default function Counter(){

  // useSelector is a hook that allows you to extract data from the Redux store state.
  // It takes a selector function as an argument, which receives the entire state and returns the part of the state you want.
  const counter = useSelector((state) => state.counter);
    return (
     <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
    </main>
    )
}
```

- On browser

![alt text](image-9.png)




>[!NOTE]
> - For class-based components, to access the store data we need to use `connect` function provided by `react-redux` library. This function must be wrapper around our class component to connect that class component to the store.


- We need to pass a function to use selector. A function which will be executed by a React Redux. A function which then basically determines which piece of data we wanna extract from the store. Of course at the moment we have a very simple state. Just an object with a counter property. But in bigger applications, you will have more complex states with tons of different properties maybe nested objects and arrays and therefore being able to just get a slice just a tiny part of that overall state object in a easy way is worth a lot and that's what `useSelector` allows us to do.
- The function `(state)` will be executed by react redux and it will pass the redux state and retrieve the part of the state which we required. Now the great thing is that when you use `useSelector`, React Redux will automatically set up a subscription to the Redux store for this component. So your component will be updated and will receive the latest counter automatically whenever that data changes in the Redux store.
- So it's an automatically reactivemand changes to the Redux store will cause **`Counter` component function to be re executed**. So you always have the latest counter.
- If you ever would unmount this component if it would be removed from the DOM for whatever reason, React Redux would also automatically clear the subscription for you. So it manages that subscription for you behind the scenes.
- Now how we can change that data? How can we dispatch actions? now to dispatch action we need to use `useDispatch` hook provided by `react-redux` library.

```
import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';

export default function Counter(){

  // useSelector is a hook that allows you to extract data from the Redux store state.
  // It takes a selector function as an argument, which receives the entire state and returns the part of the state you want.
  const counter = useSelector((state) => state.counter);

  // useDispatch is a hook that returns a reference to the dispatch function from the Redux store.
  const dispatch = useDispatch();
  // Dispatching actions to the Redux store
  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  }
  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  }
    return (
     <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
    </main>
    )
}
```

- On browser

<video controls src="2025-1.mov" title="title"></video>

- When we call `useDispatch` we don't pass any argument to it, but instead, this gives us back a `dispatch` function which you can execute. So `dispatch` is a function, a function which we can call, which will dispatch an action against our Redux store.
- In the increment handler (`incrementHandler`) we want to use this dispatch function and execute it to dispatch a new action. An action is an object with a `type` property and the value for `type` should be one of the identifiers we use in our Redux store reducer which are `increment` or `decrement`.

### Working with `action` property


- Now when we dispatch any action, there could be a scenario where we need to pass more properties with the action or we can say we need to pass a `payload` object or any data type which consist of more information what that action must do. Consider below example

```
// store.js
import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {

  // Handling the case where an action has a payload
  // This allows for incrementing by a specific value, e.g., incrementing by 5
  // when the action payload is provided.
  if (action.type === 'increment' && action.payload) {
    return {
      counter: state.counter + action.payload,
    };
  }
  
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;


// Counter.jsx

import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';

export default function Counter(){

  // useSelector is a hook that allows you to extract data from the Redux store state.
  // It takes a selector function as an argument, which receives the entire state and returns the part of the state you want.
  const counter = useSelector((state) => state.counter);

  // useDispatch is a hook that returns a reference to the dispatch function from the Redux store.
  const dispatch = useDispatch();
  // Dispatching actions to the Redux store
  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  }
  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  }

  const incrementHandlerby5 = () => {
    dispatch({ type: 'increment', payload: 5 });
  }
    return (
     <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={incrementHandlerby5}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
    </main>
    )
}
```

- On browser

<video controls src="2025-2.mov" title="title"></video>

- Here, we are incrementing the counter by 5 using `payload` as property of `action`.


### Working with Multiple State

- Let's say you wanted to show/hide a counter. To do so you require a new state. This can be achieve by modifying the reducer function which will now consist of two states (`counter: 0, showCounter: true`). Let's modify the reducer function.

```
//store.js
import { createStore } from 'redux';

const counterReducer = (state = { counter: 0, showCounter: true }, action) => {

  // Handling the case where an action has a payload
  // This allows for incrementing by a specific value, e.g., incrementing by 5
  // when the action payload is provided.
  // showCounter will maintain its value unless explicitly changed by another action.
  if (action.type === 'increment' && action.payload) {
    return {
      counter: state.counter + action.payload,
      showCounter: state.showCounter
    };
  }
  
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    };
  }

  // Adding a new action type to toggle the visibility of the counter
  if (action.type === 'toggle') {
    return {
      counter: state.counter, 
      // Toggling the showCounter state, if it was true (show), it becomes false(hide) and vice versa
      showCounter: !state.showCounter
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
```

- Now let's create a new button to toggle the counter visibility in `Counter.jsx`

```
//Counter.jsx

import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';

export default function Counter(){

  // useSelector is a hook that allows you to extract data from the Redux store state.
  // It takes a selector function as an argument, which receives the entire state and returns the part of the state you want.
  const counter = useSelector((state) => state.counter);

  // Extracting showCounter from the Redux store state which will determine if the counter should be displayed or not.
  const showCounter = useSelector((state) => state.showCounter);

  // useDispatch is a hook that returns a reference to the dispatch function from the Redux store.
  const dispatch = useDispatch();
  // Dispatching actions to the Redux store
  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  }
  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  }

  const incrementHandlerby5 = () => {
    dispatch({ type: 'increment', payload: 5 });
  }

  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
  }
    return (
     <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={incrementHandlerby5}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </div>
    </main>
    )
}
```

- On browser

<video controls src="2025-3.mov" title="title"></video>

- **In a reducer function, you must always return a new object (i.e., a new reference) whenever the state changes. This is one of the core principles of immutability in Redux or any reducer-based state management.**
- **React (and Redux) relies on *shallow comparison* `(===)` to check if the state has changed. If you mutate the existing state object instead of returning a new one, React or Redux might not detect that anything has changed, and your UI won’t re-render.**
- Suppose you modify the existing state value

```
const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  if (action.type === "INCREMENT") {
    // ❌ Direct mutation (WRONG)
    state.count += 1;
    return state;
  }

  return state;
}
```

- If you use this in a React component, the component may not re-render after dispatching INCREMENT because `state === state` still holds true (the reference object didn't change), so React thinks nothing changed.
- When we return a new object

```
function reducer(state = initialState, action) {
  if (action.type === "INCREMENT") {
    // ✅ Correct Way: Return a New State Object
    return {
      ...state,        // copy the existing state
      count: state.count + 1  // update just the changed part
    };
  }

  return state;
}
```

- Now, a new object is returned, so `newState !== oldState`, React/Redux sees a difference and triggers re-render.
- So if you mutate the existing object and return it, the comparison fails to detect a change — because the reference didn't change.


## Redux ToolKit

- Let's identify a couple of potential problems we could be facing if our application would continue to groww when we manage more and more state with Redux.
- One potential issue can be our action types.

```
action.type === 'increment'
```

- When you dispatch an action, you have to make sure that you don't mistype the identifier here otherwise it of course won't be handled by the reducer or won't be handled correctly.mNow that's not a problem in a small app like this but in bigger applications with a lot of developers working on the app and with a lot of different actions that you could mess up one of these identifiers. You could even have clashing identifiers names.
- For ensuring that we have unique identifiers and we don't miss type we could create constants,

```
export const INCREMENT = 'increment'

  if (action.type === INCREMENT) {
    // ✅ Correct Way: Return a New State Object
    return {
      ...state,        // copy the existing state
      count: state.count + 1  // update just the changed part
    };
  }
```

- These constant can be maintained into a separate file `constant.js` and can be maintained.
- Another potential problem is the amount of data which we manage inside the reducer.

```
    return {
      counter: state.counter + action.payload,
      showCounter: state.showCounter
    };
```

- The more data we have the more different pieces of state we have, the bigger our state objects get. And that means that we need to copy a lot of state and update the corresponding property based on action type and keep all the other state properties, and it also means that this reducer function gets longer and longer and all of a sudden we might have an unmaintainable big Redux file.
- Another potential problem we could be facing is the state immutability which we have to respect.

```
function reducer(state = initialState, action) {
  if (action.type === "INCREMENT") {
    // ❌ Direct mutation (WRONG)
    state.count += 1;
    return state;
  }

  return state;
}

function reducer(state = initialState, action) {
  if (action.type === "INCREMENT") {
    // ✅ Correct Way: Return a New State Object
    return {
      ...state,        // copy the existing state
      count: state.count + 1  // update just the changed part
    };
  }

  return state;
}
```

- We have to ensure that we always return a brand new state object and that we don't accidentally change the existing state anywhere. And especially if you have more complex data with nested objects and arrays it's easy to mess this up and accidentally change some nested data even though you didn't want to.
- All these issue can be handle by a library called Redux Toolkit. Redux Toolkit simply as an extra package which makes working with Redux more convenient and easier.
- Let's install Redux Toolkit

```
npm install @reduxjs/toolkit
```

>[!NOTE]
> - When using Redux Toolkit, you don't need to install Redux separately. Redux Toolkit includes the core Redux library as a dependency.

- In Redux toolkit we do have method `createReducer` but we will be using `createSlice`. In Redux Toolkit, a slice is a way to define a piece of your application state along with the reducers and actions related to that specific state — all in one place. It simplifies the typical Redux boilerplate code.

```
import { createSlice } from '@reduxjs/toolkit';
import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

// Using createSlice from Redux Toolkit to create a slice of the store
const counterSlice = createSlice({
  name: 'counter', // Name of the slice
  // Initial state of the slice -> initialState: initialState (variable), a shorter syntax of writing the same attribute without repeating the key
  initialState,
  reducers: { // Reducers for the slice
    // Each reducer function handles a specific action type
    // The action parameter is an object that contains the type and payload
    // The state parameter is the current state of the slice
    // The state is mutable in Redux Toolkit, so we can directly modify it
    // This is different from the traditional Redux where we return a new state object
    // The payload is optional, and if provided, it will be used to increment the counter by that value
    // If no payload is provided, the counter will be incremented by 1
    increment(state, action) {
      // Incrementing the counter by the payload value if provided, otherwise by 1
      state.counter += action.payload || 1;
    },
    decrement(state) {
      state.counter -= 1;
    },
    toggle(state) {
      // Toggling the visibility of the counter
      state.showCounter = !state.showCounter;
    }
  }
});


// Inside the createStore function, we pass the reducer function from the slice
// This reducer function will handle the actions defined in the slice
// const store = createStore(counterSlice.reducer);

const store = configureStore({
  reducer: counterSlice.reducer // Using the reducer from the slice
});

export const actions = counterSlice.actions; // Extracting the actions from the slice
// Exporting the actions to be used in components
// Each action has their reducer function defined as constants in the actions object
// This allows us to dispatch actions like actions.increment() or actions.decrement() in our components without needing to define them again like writing action creators manually e.g actions.type === 'increment' or actions.type === 'decrement' is not required here


export default store;
```

- A slice is created using the `createSlice()` function from Redux Toolkit.
It includes:
  - A name for the slice
  - The initial state
  - Reducer functions to handle actions
  - Auto-generated action creators and action types

- `createSlice()` automatically:
  - Creates action types like `counter/increment`, `counter/decrement`, etc.
  - Creates action creators (e.g. `increment()`, `decrement()`)
  - Handles immutable state updates safely using **Immer** under the hood. So usually we always return a new object in the reducer function, but here if we modify the existing object, **Immer** internally will give a new object with the updated value and thus gives an immutable code.
- Now to register our reducer with store we need to use `createStore(counterSlice.reducer)` but redux toolkit gives `configureStore`. `configureStore` is the Redux Toolkit’s modern replacement for `createStore`. It does more out of the box to simplify and enhance your Redux setup. It merges multiple reducers to single reducers function.
- The `configureStore` requires a configuration object.

```
const store = configureStore({
  reducer: counterSlice.reducer // Using the reducer from the slice
});
```

- However, with `configureStore`, the value for reducer can be a single reducer so we can for example use `counterSlice.reducer` to use the reducer from that `counterSlice` which combines all those reducer methods to find in that slice.
- We can use that as a global main reducer but if we had multiple state slices in a bigger application then alternatively as a value for this reducer key, we could also set an object that would have keys of our choice, and the values of those properties would then be different reducer functions.

```
const store = configureStore({
  reducer: {counter: counterSlice.reducer, auth: authSlice.reducer}  // Merging multiple reducers
});
```

- So we would create a map of reducers you could say, and this map is then set as a value for the main reducer and behind the scenes `configureStore` will emerge all those reducers into one big reducer.
- Now let's dispatch actions. Now `counterSlice.actions` gives bunch of actions types which are reducer function names.

![alt text](image-10.png)

- These method when called it automatically creates object for which thus they are called actions creators where these object have their respective action type property as their unique identifiers. So we don't have to worry about action identifiers. We don't have to create those action objects on our own. We can tap into this actions key into this actions object on our `createSlice` and execute these action creator methods
- Now to dispatch the action, in `Counter.jsx`

```
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/store';
import classes from './Counter.module.css';

export default function Counter(){

  // useSelector is a hook that allows you to extract data from the Redux store state.
  // It takes a selector function as an argument, which receives the entire state and returns the part of the state you want.
  const counter = useSelector((state) => state.counter);

  // Extracting showCounter from the Redux store state which will determine if the counter should be displayed or not.
  const showCounter = useSelector((state) => state.showCounter);

  // useDispatch is a hook that returns a reference to the dispatch function from the Redux store.
  const dispatch = useDispatch();
  // Dispatching actions to the Redux store
  const incrementHandler = () => {
    dispatch(actions.increment()); // Incrementing the counter by 1
  }
  const decrementHandler = () => {
    dispatch(actions.decrement()); // Decrementing the counter by 1
  }

  const incrementHandlerby5 = () => {
    dispatch(actions.increment(5)); // Incrementing the counter by 5: {payload: 5}
    // The payload is optional, if not provided, it will increment by 1
  }

  const toggleCounterHandler = () => {
    dispatch(actions.toggle()); // Toggling the visibility of the counter
  }
    return (
     <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={incrementHandlerby5}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </div>
    </main>
    )
}
```

- On browser

<video controls src="2025-3.mov" title="title"></video>

>[!NOTE]
> - When we are dispatching action `increment(5)`, redux toolkit will automatically pass the payload as an object with a type and `payload` property, so we can access it in the reducer function as `action.payload`. This is the default property name `payload` that Redux Toolkit uses for the payload of an action.
> - In the reducer function we cannot use any our of custom property name like we did when we use redux.
>
>```
>// In React ToolKit we need to always use action.payload as payload is the attribute used for any additional object to be passed
>    increment(state, action) {
>     // Incrementing the counter by the payload value if provided, otherwise by 1
>     state.counter += action.payload || 1;
>   },
> ```