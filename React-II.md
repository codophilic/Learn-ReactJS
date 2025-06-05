# React Concepts

## Prop Drilling

- Prop drilling in React refers to the process of passing data down through multiple levels of nested components via props, even when intermediate components do not need the data themselves. It arises when a deeply nested child component requires access to data held by a distant ancestor component.

![alt text](image.png)


- For example, the app component might render a Shop and Header component and these components has child Components and other nested Components. You'll also need to manage some state and if the value is being used by your child component you then need to share it through props and also update it with help of props. This often means that you need to pass that shared data through multiple layers of Components. And that is something that's called prop drilling.
- You are passing props through multiple Components, even though most Components don't directly need that data. They just pass it on to some child component. And that can be a problem because this it makes your Components a bit less reusable because they always must be used in a place where they can get that shared data. And it also means that you have to write a lot of extra boilerplate code because you need to accept and destructure a prop in a component and then forward it to a component just to then maybe repeat that entire process.


### Component Composition

- So consider below nester component code.

```
//App.jsx

import React from 'react';
import MyComponent from './components/MyComponent';
function App() {

  function onClickHandler() {
    console.log('Function handler called!');
  }
  return (
<MyComponent onClickHandler={onClickHandler} >

</MyComponent> 
  );
}

export default App;

//MyComponent.jsx

import ChildComponentOfMyComponent from './ChildComponentOfMyComponent.jsx';
export default function MyComponent({ onClickHandler }) {
  return (
    <div>
      <h1>My Component</h1>
      <p>This is a simple component that uses a function handler.</p>
      <ChildComponentOfMyComponent onClickHandler={onClickHandler}></ChildComponentOfMyComponent>
    </div>
  );
}

// ChildComponentOfMyComponent.jsx

export default function MyComponent({ onClickHandler }) {
    return (
        <div>
        <button onClick={()=>onClickHandler()}>Click me!</button>
        </div>
    );
}
```

- On browser

<video controls src="2025-1.mov" title="title"></video>


- Here, we are passing the `onClickHandler` to `MyComponent` which does not uses it. This is a scenario of prop drilling. To solve it let's use component composition.

```
//App.js

import React from 'react';
import ChildComponentOfMyComponent from './components/ChildComponentOfMyComponent.jsx';
import MyComponent from './components/MyComponent';
function App() {

  function onClickHandler() {
    console.log('Function handler called!');
  }
  return (
<MyComponent>
{
  <ChildComponentOfMyComponent onClickHandler={onClickHandler}></ChildComponentOfMyComponent>
}
</MyComponent> 
  );
}

export default App;

// MyComponent.jsx

import ChildComponentOfMyComponent from './ChildComponentOfMyComponent.jsx';
export default function MyComponent({ children }) {
  return (
    <div>
      <h1>My Component</h1>
      <p>This is a simple component that uses a function handler.</p>
      {children}
    </div>
  );
}

// ChildComponentOfMyComponent.jsx

export default function MyComponent({ onClickHandler }) {
    return (
        <div>
        <button onClick={()=>onClickHandler()}>Click me!</button>
        </div>
    );
}
```


- On browser

<video controls src="2025-1.mov" title="title"></video>

- Composition means you build components by combining other components — passing elements or components as `children` or as props.
- Instead of deeply nested props, you can use composition components to avoid prop drilling by injecting components or behavior into a container component.
- Instead of passing data through every level, you can compose components in such a way that the needed logic or UI is provided directly where it's used.
- You typically don't want to use this composition for all your component layers. Because it would mean that in the end, all your components just end up in the app component and all the other components are just wrapper components.


### Context API

- The Context API is a feature in React that allows you to share data (like a global variable) across your entire app — without passing `props` manually at every level.
- It’s like saying *Hey React, here’s some data (like a theme mode or user). Any component that wants it can just grab it — no need to drill it down*.
- Simple analogy could be thinking context api as Wi-fi. Instead of giving internet access (props) through a long wire (prop drilling) to each device (component), you just turn on the Wi-Fi (Context) and now any device (component) in the range can connect directly.

![alt text](image-1.png)


- Let's create a folder `/store`. In React's Context API, a `store` is used to hold the data that you want to share across multiple components. It is essentially a container for your application's state.

>[!NOTE]
> - `/store` is just a convention followed in most react applications. You can give any name whatever you like.

- `MyContext.jsx`

```
import { createContext } from "react";

export const MyContext = createContext()
```

- Now inside `createContext` the value of it can be anything, string, boolean, arrays, object or function etc... Let's create an object.

```
import { createContext } from "react";

export const MyContext = createContext({
    items:[]
});
```

- The next step now is to provide it to this application and to our components. We need to provide this context to our application and we need to wrap it around parts of that application, parts of our component tree, so that those wrapped components can access this value which we're providing here.
-  And then as a next step, you should go to a component that contains all the other components that will need to use this context. So therefore the `App.jsx` component is a great place to wrap header and shop with our context so that those components or their child components can use that context.

```
//App.js

import React from 'react';
import ChildComponentOfMyComponent from './components/ChildComponentOfMyComponent.jsx';
import MyComponent from './components/MyComponent';
import { MyContext } from './components/store/MyContext.jsx';
function App() {

  function onClickHandler() {
    console.log('Function handler called!');
  }
  return (
    <MyContext>
      <MyComponent>
      {
        <ChildComponentOfMyComponent onClickHandler={onClickHandler}></ChildComponentOfMyComponent>
      }
      </MyComponent> 
    </MyContext>
  );
}

export default App;
```

- So we have wrapped `MyContext` component on the `App`.

>[!NOTE]
> - For older react version (<19). We need to wrap the component using `Provider` to access a nested property. Below is an example of if
>
>```
>    <MyContext.Provider>
>      <MyComponent>
>      {
>        <ChildComponentOfMyComponent onClickHandler={onClickHandler}></ChildComponentOfMyComponent>
>      }
>      </MyComponent> 
>    </MyContext.Provider>
>  );
> ```
>
> - The `Provider` property also works for the latest react version

- Now we have created conrext, let's start to consume it.

```
//ChildComponentOfMyComponent.jsx

import { useContext } from "react";
import { MyContext } from "./store/MyContext";

export default function ChildComponentOfMyComponent({ onClickHandler }) {
    const { items } = useContext(MyContext); //Destructure items from context
    return (
        <div>
            {items.length > 0 ? (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>No items available</p>
            )}
        <button onClick={()=>onClickHandler()}>Click me!</button>
        </div>
    );
}
```

- Now to use context, we need to use `useContext` hook. `useContext` is a React Hook that enables functional components to access `context` values. It consumes the context object returned by `React.createContext` and subscribes the component to context changes. When the context value updates, React re-renders the component, ensuring it always has the latest data.
- Alternatively, you can also use `use` hook.

```
//ChildComponentOfMyComponent.jsx
import { use } from "react";
import { MyContext } from "./store/MyContext";

export default function ChildComponentOfMyComponent() {
    const { items } = use(MyContext); //Destructure items from context
    return (
        <div>
            {items.length > 0 ? (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>No items available</p>
            )}
        </div>
    );
}
```

- The difference between `use` and `useContext` is that, `useContext` hook cannot be used under conditional statements whereas `use` can.

```
// Cannot do this using useContext ❌
    if(true){
        const { items } = useContext(MyContext); //Destructure items from context
    }
```

>[!NOTE]
> - `use` hook is available on react 19+ version.

- Now below is `App.jsx` and `MyComponent.jsx`.

```
//App.jsx

import React from 'react';
import MyComponent from './components/MyComponent';
import { MyContext } from './components/store/MyContext.jsx';
function App() {

  return (
    <MyContext.Provider>
      <MyComponent>
      </MyComponent>
    </MyContext.Provider>
  );
}

export default App;

//MyComponent.jsx
import ChildComponentOfMyComponent from './ChildComponentOfMyComponent.jsx';
export default function MyComponent() {
  return (
    <div>
      <h1>My Component</h1>
      <p>This is a simple component that uses a function handler.</p>
      <ChildComponentOfMyComponent />
    </div>
  );
}

//
```

- On browser

![alt text](image-2.png)

- Why do we need to add `value` inside the provider? Why Not Just `createContext()` and Expect Auto-Data? when we create context

```
export const MyContext = createContext({});
```

- We just define the context, react doesn't know:
  - What state you're managing?
  - What functions you want to share?

- The `value` prop in a context provider is what will be available to components that call `useContext(MyContext)`. So you must include:
  - Any state (like `items`) you want to share
  - Any function you want others to use
- This tells React *These are the things I want to share globally.*
- When you create a Context object with a default shape (i.e., you provide key attributes like items, etc.), you enable autocompletion and type hints in most modern code editors (like VS Code).

```
export const MyContext = createContext({
    items:[]
});
```

- It does not defined value of state or function.
- Now since we have added `items: ['Item 1', 'Item 2', 'Item 3']` , we can only read it's value. Let's create a state of if, so whenever button is clicked, items will be added into the `items` array.

```
//App.js

import React from 'react';
import MyComponent from './components/MyComponent';
import { MyContext } from './components/store/MyContext.jsx';
function App() {

  // Create state to hold the items
  const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);

  // Create a function to handle on click event and add a new item
  function onClickHandler() {
    setItems((prevItems) => {
      return [...prevItems, `Item ${prevItems.length + 1}`];
    });
  }
  return (
    <MyContext.Provider value={{ items: ['Item 1', 'Item 2', 'Item 3'] }}> 
      <MyComponent>
      </MyComponent> 
    </MyContext.Provider>
  );
}

export default App;
```

- Now, let's add the new state `items` which has `useState` and `onClickHandler` function into context value. Now in the `ChildComponentOfMyComponent` we are displaying list of items, so now add a button there.

```
import { use, useContext } from "react";
import { MyContext } from "./store/MyContext";

export default function ChildComponentOfMyComponent() {
    const { items } = useContext(MyContext); //Destructure items from context
    return (
        <div>
            <button onClick={onClickHandler}>Add Item</button>
            {items.length > 0 ? (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>No items available</p>
            )}
        </div>
    );
}
```

- Now we need to use context value and call the function `onClickHandler`. But when we see the auto suggestion while typing in `ChildComponentOfMyComponent`, we cannot see the `onClickHandler`

![alt text](image-3.png)

- Now let's update context

```
//MyContext.jsx

import { createContext } from "react";

export const MyContext = createContext({
    items:[],
    onClickHandler: () => {},
});
```

- Now we can see the function name in the suggestion

![alt text](image-4.png)

- Updating the `onClickHandler` into the provider value.

```
//App.jsx

import React from 'react';
import MyComponent from './components/MyComponent';
import { MyContext } from './components/store/MyContext.jsx';
function App() {

  // Create state to hold the items
  const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);

  // Create a function to handle on click event and add a new item
  function onClickHandler() {
    setItems((prevItems) => {
      return [...prevItems, `Item ${prevItems.length + 1}`];
    });
  }
  return (
    <MyContext.Provider value={{ items, onClickHandler }}>
      <MyComponent>
      </MyComponent> 
    </MyContext.Provider>
  );
}

export default App;

//MyComponent.jsx

import ChildComponentOfMyComponent from './ChildComponentOfMyComponent.jsx';
export default function MyComponent() {
  return (
    <div>
      <h1>My Component</h1>
      <p>This is a simple component that uses a function handler.</p>
      <ChildComponentOfMyComponent />
    </div>
  );
}

//ChildComponentOfMyComponent.jsx

import { useContext } from "react";
import { MyContext } from "./store/MyContext";

export default function ChildComponentOfMyComponent() {
    const { items } = useContext(MyContext); //Destructure items from context
    const { onClickHandler } = useContext(MyContext); //Destructure onClickHandler from context
    return (
        <div>
            <button onClick={()=>onClickHandler()}>Add Item</button>
            {items.length > 0 ? (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>No items available</p>
            )}
        </div>
    );
}
```


- On browser

<video controls src="2025-2.mov" title="title"></video>

- This is how we link our state with context and use state via context. There is an alternative way to use context that is using `Context_Name.Consumer`.
- The React Context Consumer is a component that allows you to subscribe to context changes within a React application. It is used in conjunction with the Context Provider to access data that has been shared across the component tree.

```
import { MyContext } from "./store/MyContext";

export default function ChildComponentOfMyComponent() {
    return (
        <MyContext.Consumer>
            {(context) => {
                const { items, onClickHandler } = context;
                return (
                    <div>
                        <button onClick={() => onClickHandler()}>Add Item</button>
                        {items.length > 0 ? (
                            <ul>
                                {items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No items available</p>
                        )}
                    </div>
                );
            }}
        </MyContext.Consumer>
    );
}
// This component uses the MyContext.Consumer to access the context values.
```

- On browser

<video controls src="2025-2.mov" title="title"></video>

- The Context Consumer expects a function as its child. This function receives the current context value  (`context`) as its argument and returns the JSX that should be rendered.

>[!TIP]
> - Using `Consumer` approach may be cumbersome so many react applications uses the standard approach i.e using `useContext`.

- **React context re-renders the component which consumes the context**. When the value passed to `<MyContext.Provider value={...}>` changes (by identity).
- All components using u`seContext(MyContext)` or `<MyContext.Consumer>` will re-render if the value they receive from the context is different.
- Also every time the parent re-renders, a new object is created, so context consumers re-render too — even if `items` and `onClickHandler` are the same.
- In your `App` component, there could be a possibilities that you might have different state values that should be shared through those different contexts. And you would therefore end up with a lot of logic in your app component since that is typically your root component and has access to all the components. 
- There could be multiple context as well also each context will have its own different state. So managing all these in one single `App` component can be cumbersome.
- And therefore there is an alternative approach an alternative pattern, which you'll see in many React projects, which allows you to get all this context related data management out of the app component into a separate context component.
- So insider our context, we can share component function as well like below

```
//MyContext.jsx

import React, { createContext } from "react";

export const MyContext = createContext({
    items:[],
    onClickHandler: () => {},
});


export const MyProviderValue = ({ children }) => {
    // Create state to hold the items
    const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);

    // Create a function to handle on click event and add a new item
    function onClickHandler() {
        setItems((prevItems) => {
            return [...prevItems, `Item ${prevItems.length + 1}`];
        });
    }
    return (
        <MyContext.Provider value={{ items, onClickHandler }}>
            {children}
        </MyContext.Provider>
    );
}

//App.jsx
import React from 'react';
import MyComponent from './components/MyComponent';
import { MyProviderValue } from './components/store/MyContext.jsx';
function App() {

  return (
    <MyProviderValue>
      <MyComponent>
      </MyComponent>
      </MyProviderValue>
    );
}

export default App;
```

- On browser works the same way

<video controls src="2025-2.mov" title="title"></video>



## Reducer Hook (`useReducer`)

- Imagine you're building a counter app:
  - `+` button increases the count.
  - `-` button decreases the count.
  - `Reset` button resets the count.
- You could use multiple `useState` like below.

```
import React, { useState } from 'react';
import './App.css';

const buttonStyle = {
  backgroundColor: '#4CAF50', /* Green */
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 10px',
  cursor: 'pointer',
};

const h2Style = {
  color: '#4CAF50',
  fontSize: '24px',
  margin: '20px 0',
};
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2 style={h2Style}>Count: {count}</h2>
      <button style={buttonStyle} onClick={() => setCount(count + 1)}>+</button>
      <button style={buttonStyle} onClick={() => setCount(count - 1)}>-</button>
      <button style={buttonStyle} onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default App;
```

- On browser

<video controls src="2025-3.mov" title="title"></video>



- Now let's say during the increment button (`+`) if the count exceeds greater than than 10, we need to reset the value to 0, such logic needs to be implemented.

```
      <button style={buttonStyle} onClick={() => (count<10?setCount(count + 1): setCount(0))}>+</button>
```

- Here, if the value is greater than 10 we are setting it to 0. So our **next state of `count` depends on previous state of `count`**.
- Now let's say if there is more complex logic for increment, like doubling the value or adding more complex logic. Such things were need to embedded within a function handler. Now if multiple states are there and each state as complex logic, we need to create different functions and composed those logic into it.
- `useReducer` is a React hook that helps manage complex state logic in your component. It's like an upgraded version of `useState`, especially useful when:
  - The next state depends on the previous state.
  - You have multiple related pieces of state.
  - You want to make state updates more structured and predictable.
- `useReducer` gives you one place to manage all those state with their corresponding logic. It is an alternative to `useState` and is particularly useful when the next state depends on the previous state or when dealing with multiple sub-values.
- `useReducer` accepts a reducer function and an initial state as arguments and returns the current state and a dispatch function. The dispatch function is used to send actions to the reducer, which then calculates the new state based on the current state and the action type.

```
const [state, dispatch] = useReducer(reducer, initialState);
```

- The reducer function takes the current state and an action as arguments and returns the new state based on logic. Let's see example

```
//App.jsx
import React, { useReducer } from 'react';
import './App.css';

const buttonStyle = {
  backgroundColor: '#4CAF50', /* Green */
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 10px',
  cursor: 'pointer',
};

const h2Style = {
  color: '#4CAF50',
  fontSize: '24px',
  margin: '20px 0',
};

// All Logic for each state is in the reducer function
function countReducer(state, action) {
  if (state.count >= 10 && action.type === 'increment') {
    return { count: 0 };
  }
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function App() {
  const [state, countDispatch] = useReducer(countReducer, {count: 0});

  return (
    <div>
      <h2 style={h2Style}>Count: {state.count}</h2>
      <button style={buttonStyle} onClick={()=>countDispatch({type: 'increment'})}>+</button>
      <button style={buttonStyle} onClick={() => countDispatch({type: 'decrement'})}>-</button>
      <button style={buttonStyle} onClick={() => countDispatch({type:'reset'})}>Reset</button>
    </div>
  );
}

export default App;
```

- On browser

<video controls src="2025-4.mov" title="title"></video>


- `countReducer` is a reducer and it is a pure function (no side effects) that takes the current state and an action, and returns a new state.
- `useReducer`:
  - Takes the reducer function and initial state (`{ count: 0 }`).
  - Returns:
    - `state`: current state value.
    - `countDispatch`: function used to send actions like `increment`, `decrement`, etc.
- You call `dispatch({ type: 'increment' })` to tell the reducer what to do. dispatch() to send an action to the reducer.
The action is usually an object with a `type` field, and sometimes a `payload` or any attribute you want.

```
dispatch({ type: 'increment' });
dispatch({ type: 'set-name', payload: 'Alice' });
dispatch({ anything: 'increment'});
```
- The reducer sees this action and decides how to update the state.
- `useReducer` keeps your state logic in one place and makes the code more maintainable as the app grows.

### How does dispatch know that render should be called? How is the state passed and it gets updated?

- Under the hood when we write

```
const [state, dispatch] = useReducer(reducer, initialState);
```

- React remembers:
  - The current state
  - The reducer function bind to that state
- When you call `dispatch(action)` react calls your reducer function with the current state and the action:

```
const newState = reducer(currentState, action);
```
- React compares the old state vs the new state. If the state has changed, React re-renders the component with the new state. Your component function runs again.
- It gets the latest state from React's internal system.
- `dispatch` doesn't know about rendering directly. It just triggers the reducer function, and React takes care of the rest. If the state changes, React re-renders that component.

## Side Effect & `useEffect`

- Side effects in React refer to actions or operations performed within a component that interact with the outside world or affect other parts of the application beyond the component's own scope.
- Examples of Side Effects are

| Side Effect                               | Uses Browser API? | Example APIs Used                                   |
| ----------------------------------------- | ----------------- | --------------------------------------------------- |
| **Fetching data from an API**             | ✅ Yes             | `fetch()`, `XMLHttpRequest`, etc.                   |
| **Changing the DOM manually**             | ✅ Yes             | `document.querySelector()`, `innerHTML`             |
| **Setting a timer**                       | ✅ Yes             | `setTimeout()`, `setInterval()`                     |
| **Working with local storage or cookies** | ✅ Yes             | `localStorage`, `sessionStorage`, `document.cookie` |
| **Subscribing to events or sockets**      | ✅ Yes             | `WebSocket`, `EventSource`, `addEventListener()`    |

- React wants to keep rendering pure — which means
  - Rendering should only depend on `props` and `state`.
  - It should not directly talk to the outside world.

### Infinite Rendering Loop

- An infinite rendering loop in React occurs when a component continuously re-renders itself without stopping, eventually leading to a crash. This usually happens when a state update triggers a re-render, and the re-render, in turn, causes another state update, creating a cycle.
- Example

```
import React, { useState } from 'react';

function InfiniteLoopComponent() {
  const [count, setCount] = useState(0);

  // Problem: Updating state directly in the component body
  setCount(count + 1); 

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
}

export default InfiniteLoopComponent;
```

- In this example, the `setCount(count + 1)` line is executed every time the component renders. This updates the `count` state, which then triggers a re-render. This creates an infinite loop of renders and state updates.
- To handle scenarios like the one described above, React provides a powerful hook called `useEffect`

### `useEffect`

- `useEffect` is a hook in React that allows you to perform side effects in function components. `useEffect` function takes two arguments:, a function containing the code for the side effect, and an optional array of dependencies. Let's see an example

```
import React from 'react'
import {useState, useEffect} from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Then UseEffect gets Executed')
    setCount(count + 1)
  }, [])

  console.log('First Component Renders')
  return (
    <div>
      <p>Count: {count}</p>
    </div>
  )
}
```

- On browser

![alt text](image-5.png)

- The `useEffect()` runs after the first render. You can safely do side effects here without breaking React’s rendering.
- `useEffect` function takes two arguments:

1. Effect function
    -  The first argument of `useEffect` is a function containing the code for the side effect. This function, commonly referred to as the "effect function," is executed after the component renders for the first time and after every subsequent render.
    - The `useEffect` hook ensures that the data fetching operation only occurs once, when the component mounts, preventing the infinite rendering loop (due to the empty dependency array `[]`)

```
useEffect(() => {
  // Only runs once on first render
  fetchData();
}, []); // Empty array = run once
```

2. Dependency array
    - The second argument of `useEffect` is an optional array of dependencies. It specifies the values (variables or state) that the effect function depends on. When any of the dependencies change between renders, the effect function will be re-executed.

```
useEffect(() => {
    setCount(count + 1); // This changes state
  }, [count]); // ...which triggers the effect again! And this repeats forever 🔁 = Infinite Loop, so add condition on it


useEffect(() => {
  if (count < 5) {
    setCount(count + 1);
  }
}, [count]);
```

- Another example of dependency array is let’s say you have a component that receives a `userId` and you want to fetch that user’s details only when the userId changes.

```
import React, { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // ✅ Run this effect only when `userId` changes
    if (!userId) return;

    // Side effect: Fetch user data
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user:", error));
  }, [userId]); // 🔁 Dependency array

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
```

- It runs the first time when the component mounts (if `userId` exists). It runs again only when the `userId` value changes.


| Line                                  | What it's doing                                     |
| ------------------------------------- | --------------------------------------------------- |
| `useEffect(() => { ... }, [userId]);` | This runs the effect **only when `userId` changes** |
| `if (!userId) return;`                | Avoid fetching if userId is `null` or `undefined`   |
| `fetch(...)`                          | This is the side effect — using a browser API       |
| `setUserData(data)`                   | Updates state → triggers re-render                  |



>[!IMPORTANT]
> ### Not all side effects need `useEffect`.
> - Some code can (and should) run inside event handlers or functions, not as effects. Let's take an example
> - The side effect (saving to `localStorage`) only happens when the button is clicked. No need to use `useEffect`.
>
> ```
> function SaveName() {
>   const [name, setName] = useState("");
> 
>   const handleSave = () => {
>     localStorage.setItem("username", name); // SIDE EFFECT!
>   };
> 
>   return (
>     <>
>       <input value={name} onChange={(e) => setName(e.target.value)} />
>       <button onClick={handleSave}>Save</button>
>     </>
>   );
> }
> ```
>
> - If side effects can be resolve using event handler or functions, then **avoid `useEffect`**.


### `useEffect` clean up function

#### Analogy

- You're throwing a party at your house (your React component). At the start of the party, you hire a DJ (your side effect).
- If you forget to tell the DJ to stop when the party ends (component unmounts), the DJ will keep playing music forever, bothering your neighbors (causing memory leaks or unexpected behavior).
- But if you tell the DJ, “Thanks, we’re done!” (cleanup function), everything ends smoothly.
- When you use `useEffect`, sometimes you start something (like a timer, event listener, or subscription). A cleanup function is used to stop that thing when your component is no longer active.
- 🤯 What Happens Without a Cleanup Function? Let’s say you add a `setInterval` to print something every second.

```
useEffect(() => {
  setInterval(() => {
    console.log("Tick");
  }, 1000);
}, []);
```

- It keeps ticking every second. Even if your component is removed, the interval is still running! This uses memory and may cause multiple intervals stacking up (memory leak).
- So using cleanup function we can remove the interval

```
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("Tick");
  }, 1000);

  // ✅ Cleanup function to stop the interval
  return () => {
    clearInterval(intervalId);
  };
}, []);
```

- When the component is removed or effect re-runs, the interval is cleared. No memory leaks or weird logs happening after the component is gone.
- Another example that can cause memory leaks is adding an event listener

```
❌ Without Clean up Function

useEffect(() => {
  window.addEventListener('resize', () => {
    console.log('Window resized!');
  });
}, []);
```

- You add a new listener every time the component mounts. If the component is mounted/unmounted multiple times (e.g., in a tabbed app), you’ll get many listeners attached = memory leak.

```
✅ With Clean up Function
useEffect(() => {
  const handleResize = () => {
    console.log('Window resized!');
  };
  
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

- Now every time the component unmounts, it removes the listener. No leak, no multiple console logs.

1. Component loads for the first time
    - The `useEffect` runs after render.
    - You set up an interval, event listener, or something similar.

2. Component is removed from the screen (unmounts)
    - If you don’t use a cleanup function, the interval or listener keeps running → 💥 memory leak or buggy behavior.
    - If you do use a cleanup function (inside `return () => {...}`), React automatically runs it to stop those side effects → ✅ safe and clean.

3. Component is shown again (re-mount) 
    - `useEffect` runs again.
    - If you didn’t clean up before, now you’ve added a second interval or listener (and it stacks).
    - If you did clean up, everything starts fresh.


- **So when our React component loads, `useEffect` runs. Since it won't re-run without any dependencies, it may cause memory leaks when the component unmounts, as the interval or listener remains active. So the cleanup function helps clean those up when the component unmounts.**

>[!IMPORTANT]
> - Even if the component doesn’t unmount, but the dependencies change (in the `useEffect` dependency array), React will:
>   - Run the cleanup function first.
>   - Then run the `useEffect` again with new values.
> - So cleanup also runs when the effect re-runs, not just on unmount.



#### Problem with Objects and Functions in `useEffect` dependencies

- When you use an object or function in the dependency array of useEffect, it may cause the effect to run more often than expected or ended up in infinite loop
- Now consider below code

```
//App.jsx
import { useEffect, useState } from 'react';
function MyComponent({objName}){

useEffect(()=>{
  console.log("Always we get a new reference of the object in useEffect if object is passed as a dependency");
  // JavaScript does not provide a way to get the memory address or unique id of an object.
  // You can use a workaround to show that the reference changes:
  console.log('Object reference:', objName);
  console.log('Reference identity (===):', objName === window._lastObjName);
  window._lastObjName = objName;
},[objName])

return (
  <div>
  <h1>Hello my name is {objName.name}</h1>
  </div>
)
}

function App(){
  const objectName = {name: "Harsh"}
  const [changingState,setChangingState]=useState(true)  

  return (
    <div>
      <MyComponent objName={objectName}/>
      <div>
      <button onClick={()=>{
        if(changingState){
          console.log("App Component Rendered by useState "+changingState)
          setChangingState(false)
        }
        else{
          console.log("App Component Rendered by useState "+changingState)
          setChangingState(true)
        }
      }
      }> Click Me</button>
      </div>
    </div>
  )
}

export default App;
```

- Here whenever the `App` component is rendered, a new object is created and that new object is passed to the `MyComponent` and since this new object as new memory address , the `useEffect` executed again.


![alt text](image-6.png)

- Even though `{ name: "Harsh" }` looks the same on every render, it's a new object in memory, so React thinks the dependency changed, and re-runs the effect.
- Similarly functions are also at the end object, because objects and functions are reference types in JavaScript. Even if their content is the same, their reference is new every time the component renders.

```
useEffect(() => {
  console.log("Effect ran");
}, [() => console.log("hello")]); // 👈 New function reference every time
```

- Whenever component is rendered, new function with same structure is created thus giving a new reference object.
- JavaScript does not treat functions as equal even though they have the same code and that's the case for objects as well.

### `useCallback`

- If you pass these functions to child components or include them in `useEffect` dependencies, it can cause unnecessary re-renders or side effects.
- `useCallback` is a React Hook that returns a memoized (cached) version of a function — one that only changes if its dependencies change.
- `useCallback` tells React *Only recreate this function if something inside it changes.*

```

//App.jsx
import { useCallback, useEffect, useState } from 'react';
function MyComponent({objName}){

  

useEffect(()=>{
  console.log("Always we get a new reference of the object in useEffect if object is passed as a dependency");
  // JavaScript does not provide a way to get the memory address or unique id of an object.
  // You can use a workaround to show that the reference changes:
  console.log('Object reference:', objName);
  console.log('Reference identity (===):', objName === window._lastObjName);
  window._lastObjName = objName;
},[objName])

return (
  <div>
  <h1>Hello my name is {objName.name}</h1>
  </div>
)
}

function App(){
  const objectName = useCallback({name: "Harsh"},[])
  const [changingState,setChangingState]=useState(true)  

  return (
    <div>
      <MyComponent objName={objectName}/>
      <div>
      <button onClick={()=>{
        if(changingState){
          console.log("App Component Rendered by useState "+changingState)
          setChangingState(false)
        }
        else{
          console.log("App Component Rendered by useState "+changingState)
          setChangingState(true)
        }
      }
      }> Click Me</button>
      </div>
    </div>
  )
}

export default App;
```


- On browser

![alt text](image-7.png)

- Here, the `useEffect` does not gets executed when the `App` component gets re-rendered.
- Similarly we can use `useCallback` on function as well

```
function MyComponent() {
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // 👈 no dependencies, so function stays the same

  useEffect(() => {
    console.log("Effect runs");
  }, [handleClick]); // ✅ Runs only once now
  
  return <button onClick={handleClick}>Click</button>;
}
```

- `useCallback` also takes dependencies array just like `useEffect`.


## `memo`

- Consider below `App` component example

```
import { useState } from 'react';
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child name="John" />
    </>
  );
}

function Child({ name }) {
  console.log('Child rendered');
  return <div>{name}</div>;
}

function App() {

  return (
    <Parent />
    );
}

export default App;
```

- On browser

![alt text](image-8.png)

- `Parent` re-renders because count changes. Since `Child` is a normal component, it also re-renders — even though its props (`name="John"`) didn’t change.
- If there are multiple child components, those component will also get re-rendered even though the value of props are same. We can avoid this using `memo`.

```
import { memo, useState } from 'react';
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child name="John" />
    </>
  );
}

const Child = memo(function Child({ name }) {
  console.log('Child rendered');
  return <div>{name}</div>;
});


function App() {

  return (
    <Parent />
    );
}

export default App;
```

- On browser

![alt text](image-9.png)

- Even, if we clicked the `increment` button, the `Child` component won't get executed because it is wrapped in `memo`.
- `memo()` is a higher-order component provided by React that memoizes a functional component. It prevents unnecessary re-renders by reusing the last rendered result if the `props` haven't changed. So it compares the previous prop value and current one and then if the value is not changed then it does not re-rendered that component.
- Internally, `memo()` does a **shallow comparison** of props. If the previous and next props are shallowly equal, React skips the re-render.
- So if you pass a object or array, the changes inside them won't be detected.

```
<MyComponent data={{name: 'John'}} />
```

### Disadvantage of `memo`

![alt text](image-10.png)


>[!NOTE]
> - `memo` only works with component function and not with normal functions.

## `useMemo`

- `useMemo` is a React Hook that memoizes a calculated value. It only recalculates the value when its dependencies change.
- Let's see an example

```
import { memo, useState, useMemo } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // useMemo to memoize a function or object
  const greeting = useMemo(() => {
    console.log('greeting function created');
    return () => `Hello, John`;
  }, []); // only re-created if dependencies change (none here)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* Pass memoized function as prop */}
      <Child name="John" greet={greeting} />
    </>
  );
}

const Child = memo(function Child({ name, greet }) {
  console.log('Child rendered');
  return (
    <div>
      {name} - {greet()}
    </div>
  );
});

function App() {
  return <Parent />;
}

export default App;
```

- On browser

![alt text](image-11.png)

- `Parent` re-renders on `count` change. `greeting` is memoized using `useMemo`. `Child` is wrapped with `memo()`, so it only re-renders if props change.
- Because `greet` (a function) is memoized, its reference stays the same — so `Child` doesn't re-render. If you remove `useMemo`, the greet function is recreated on every render, and `Child` re-renders even though the behavior is the same.
- `useMemo` function also take dependency, based on dependency it gets executed.

```
import React, { useState, useMemo } from 'react';

function ExpensiveComponent({ number }) {
  const expensiveResult = useMemo(() => {
    console.log('Calculating...');
    let total = 0;
    for (let i = 0; i < 100000000; i++) {
      total += i;
    }
    return total + number;
  }, [number]);  // only recalculates if number changes

  return <div>Result: {expensiveResult}</div>;
}
```

- Without `useMemo`, the loop runs on every render. With `useMemo`, it only runs when number changes.


| Feature    | `React.memo()`                                    | `useMemo()`                                           |
| ---------- | ------------------------------------------------- | ----------------------------------------------------- |
| Type       | Higher-order component (HOC)                      | React Hook                                            |
| Used for   | Prevent **re-rendering of functional components** | Prevent **re-calculating expensive values**           |
| Works with | Components (function only)                        | Any **value**: object, array, number, function result |
| Focus      | Controls **component rendering**                  | Controls **value recomputation**                      |


- When NOT to use `useMemo`
  - The computation is expensive
  - The value or object is reused across renders
  - Using it everywhere adds unnecessary complexity

>[!NOTE]
> - We can use `useMemo` for Context API for unnecessary Re-rendering also for `useEffect` dependency when object or function is passed as dependencies

### `useMemo` vs `useCallback`


| Feature                 | `useMemo()`                                                           | `useCallback()`                                               |
| ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Purpose**             | Memoizes a **value** (e.g., array, object, number, function result)   | Memoizes a **function reference**                             |
| **Returns**             | The **result** of a function                                          | The **function itself**                                       |
| **Used for**            | Avoid recalculating **expensive values**                              | Avoid recreating **inline functions** on every render         |
| **Return type**         | Any **computed value**                                                | A **function**                                                |
| **Common usage**        | When passing **memoized data** to children/components                 | When passing **functions** to `memo()`-ized child components  |
| **Syntax**              | `useMemo(() => computeValue(), [deps])`                               | `useCallback(() => { ... }, [deps])`                          |
| **Optimization target** | Value recomputation                                                   | Function recreation                                           |
| **Equivalent to**       | `const value = useMemo(...)`                                          | `const func = useCallback(...)`                               |
| **Main use case**       | Avoid re-running **heavy computation** or **object/array recreation** | Avoid re-creating **callback props** causing child re-renders |


- Example of `useMemo`

```
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
```

- Avoids re-calculating the value unless `a` or `b` change.

- Example of `useCallback`

```
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

- Function reference stays the same unless dependencies change — great for passing to child components


| Use Case                             | Hook              |
| ------------------------------------ | ------------------- |
| Need a **value**, like array/object? | Use `useMemo()`     |
| Need a **function reference**?       | Use `useCallback()` |


## State Management based on Position and Component

- React manages component state based on component type and position. Let's understand this via example, consider below code

```
import "./App.css";

function Item({ value, isSelected }) {
  return (
    <div
      style={{
        border: "2px solid",
        borderColor: isSelected ? "blue" : "gray",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
        backgroundColor: isSelected ? "#e0f0ff" : "white"
      }}
    >
      <input
        value={value}
        style={{ width: "200px" }}
      />
    </div>
  );
}

export default function App() {

  return (
    <div className="App">
      <h2>List</h2>
      <div style={{ marginTop: "20px" }}>
      <Item value="Item1" isSelected={true}/>
      <Item value="Item2" isSelected={false}/>
      </div>
    </div>
  );
}
```

- On browser

![alt text](image-12.png)

- Here, when we say Component Type, we mean, the function or class that defines what the component looks like and how it behaves. This is the `Item` component

```
function Item({ value, isSelected}) {
  return (...);
}
```

- The use case is like

```
      <Item value="Item1" isSelected={true}/>
      <Item value="Item2" isSelected={false}/>
```

- React says *I’m rendering two components of the same type: `Item` and `Item`.* So both `<Item />` components are the same type.
- Render position means the order in which components appear in the tree (or list).

```
<Item value="Item1" isSelected={true}/>  // position 0
<Item value="Item2" isSelected={false}/>  // position 1
```

- Even though they’re the same type (`Item`), they are in different positions.
- React tracks state using:
  - Component Type ✅
  - Component Position in the render tree ✅
- If two components have the same type and same position, React reuses the same internal state. But if position changes (e.g., you insert a new item at the top), React reuses the component in that position, which may cause state mismatch.
- Now consider below code

```
import { useState } from "react";
import "./App.css";

function Item({ value, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "2px solid",
        borderColor: isSelected ? "blue" : "gray",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
        backgroundColor: isSelected ? "#e0f0ff" : "white"
      }}
    >
      <input
        value={value}
        style={{ width: "200px" }}
      />
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2"
  ]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const addItem = () => {
    setItems(["Item "+(items.length+1), ...items]);
  };

  return (
    <div className="App">
      <h2>Editable List</h2>
      <button onClick={addItem}>Add Item at Top</button>
      <div style={{ marginTop: "20px" }}>
        {items.map((item, index) => (
          <Item
            value={item}
            isSelected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
```

- On browser

<video controls src="2025-5.mov" title="title"></video>

- Here, the render position of component type `Item` is (consider from `Item 3`)

| Render Position (index) | Component Type | Props Given        |
| ----------------------- | -------------- | ------------------ |
| 0                       | `<Item />`     | value = `"Item 3"`  |
| 1                       | `<Item />`     | value = `"Item 1"` |
| 2                       | `<Item />`     | value = `"Item 2"` |

- Now if we select a item, and add a new item , the highlighted position of the item does not gets change, instead the item value gets changed. If render positions change (e.g., by adding/removing/reordering items), then React assumes the same component at the same position is still the same one — which can cause bugs if the actual item data has changed.
- Render Position is the order a component appears during render. React reuses components based on their type and position. If you change the order, React may reuse a component at the wrong position, unless you give it a `key`.
- React only uses a `key` (a default component attribute) when you explicitly pass it in a list context — like when rendering multiple components using `.map()`.
- If you forget to provide a `key`, React will show a warning in the console.

![alt text](image-13.png)

- Let's use `index` of `.map()`.

```
import { useState } from "react";
import "./App.css";

function Item({ value, isSelected, onClick}) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "2px solid",
        borderColor: isSelected ? "blue" : "gray",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
        backgroundColor: isSelected ? "#e0f0ff" : "white"
      }}
    >
      <input readOnly={true}
        value={value}
        style={{ width: "200px" }}
      />
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2"
  ]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const addItem = () => {
    setItems(["Item "+(items.length+1), ...items]);
  };

  return (
    <div className="App">
      <h2>Editable List</h2>
      <button onClick={addItem}>Add Item at Top</button>
      <div style={{ marginTop: "20px" }}>
        {items.map((item, index) => (
          <Item
            value={item}
            key={index}
            isSelected={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
```

- On browser (issue still persist)

<video controls src="2025-5.mov" title="title"></video>

- Why so, because `.map()` index gives position of the component and not the **position of the data**. So we are selecting **position of component** and not the data that's why the data gets dynamically change into the same position. Now to give unique id to the data and `key` prop. Let's modify our value to object like below.

```
import { useState } from "react";
import "./App.css";

function Item({ value, isSelected, onClick}) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "2px solid",
        borderColor: isSelected ? "blue" : "gray",
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
        backgroundColor: isSelected ? "#e0f0ff" : "white"
      }}
    >
      <input readOnly={true}
        value={value}
        style={{ width: "200px" }}
      />
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState([
    {id: 0, text: "Item 1"},
    {id: 1, text: "Item 2"},
  ]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const addItem = () => {
    setItems([{id: (items.length+1), text: "Item "+(items.length+1)}, ...items]);
  };

  return (
    <div className="App">
      <h2>Editable List</h2>
      <button onClick={addItem}>Add Item at Top</button>
      <div style={{ marginTop: "20px" }}>
        {items.map((item, index) => (
          <Item
            value={item.text}
            key={item.id}
            isSelected={selectedIndex === item.id}
            onClick={() => setSelectedIndex(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

- On browser

<video controls src="2025-6.mov" title="title"></video>

## Build Custom Hooks

- Now to build our custom hooks, we need to follow the below rules.

![alt text](image-14.png)


-  Custom hooks follow the same rules as built-in hooks:

1. Must start with `use`. Example, `useFetchData`, `useForm`, `useAuth`. It is basically a rule in React projects that functions that start with `use` are treated as hooks and React projects typically look for functions that start with `use` and enforce certain rules on such functions.

2. Must be called only at the top level of a functional component or another custom hook. ❌ Don’t call them inside loops, conditions, or nested functions.

3. Must only be called from React functions. ✅ Call inside a functional component or another custom hook.


### Why do we require custom hooks?

- A Custom Hook in React is a reusable function that allows you to extract and share logic that would otherwise be repetitive across multiple components.
- Custom hooks are required to promote code reusability, maintainability, and cleaner code organization.
- Let's take an example, suppose an `useEffect` function is being used to call external API in multiple components, you can create a custom hook with `useEffect` promoting reusability.
- Instead of duplicating logic (like `useState`, `useEffect`, etc.) in multiple components, you can extract it into a custom hook.

<br></br>

- Let's create our custom hook which gives width of the window. All your custom hooks should be present under the folder `/hooks`

```
// useWindowWidth.js
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export default useWindowWidth;

//App.jsx
import useWindowWidth from './hooks/useWindowWidth';
function App() {
  const width = useWindowWidth();

  return (
   <div>Window width: {width}px</div>
    );
}

export default App;
```

- On browser

<video controls src="2025-7.mov" title="title"></video>


- Custom hook function can return anything, it can be number, string , array or object as well. It can take input and give output.
- We can also expose the in-build hooks used inside our custom hooks.


>[!NOTE]
> - Changing the state in one component will not affect the state of other components even if they use the same custom hook.

- Another example of custom hooks for form validation

```
import { useState } from 'react';

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (validate) {
      const validationErrors = validate({ ...values, [name]: value });
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
  };
}

export default useForm;
```

- We can use this hook into our own components

```
import React from 'react';
import useForm from './useForm';

function validate(values) {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) errors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email is invalid';
  return errors;
}

function MyFormComponent() {
  const {
    values,
    errors,
    handleChange,
    resetForm,
  } = useForm({ name: '', email: '' }, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      alert(`Submitting: ${JSON.stringify(values)}`);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input name="name" value={values.name} onChange={handleChange} />
        <p style={{ color: 'red' }}>{errors.name}</p>
      </div>
      <div>
        <label>Email: </label>
        <input name="email" value={values.email} onChange={handleChange} />
        <p style={{ color: 'red' }}>{errors.email}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyFormComponent;
```

## Form

- Consider below form application page under `forms` folder.

```
//App.jsx

import Header from './components/Header.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Login />
      </main>
    </>
  );
}

export default App;

//Header.jsx
import logoImg from '../assets/logo.jpg';

export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="A form and a pencil" />
      <h1>React Forms</h1>
    </header>
  );
}


//Login.jsx
export default function Login() {

  return (
    <form>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
```

- On browser

![alt text](image-15.png)

- This is a simple form page. Here, we have use `htmlFor` this label element. This is the react equivalent to the `for` attribute, which you would set in native HTML. Sames goes for `class` which helps to add CSS classes. So react equivalent is `className`.
- Now let's create a `onClick` handleron login button and log something into it.

```
export default function Login() {

  function onClickHandler(){
    console.log('Login button clicked');
  }

  return (
    <form>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" onClick={onClickHandler}>
          Login
        </button>
      </p>
    </form>
  );
}
```

- On browser

<video controls src="2025-8.mov" title="title"></video>


- If we notice, the `onClickHandler` gets executed but the page is also refreshed and we could see query parameters added into our url which is `/?email=&password=`. This is the default behavior of the browser for form submission. Technically that means that an HTTP request is created and is sent to the backend server that's serving the website.

![alt text](image-16.png)


![alt text](image-17.png)


- This automatic behavior can be a problem. In many React applications this automatic behavior might be a problem. Because here, the server that's serving this React website on this address is actually a pure development server. Here, we are not validating the input data as well. So how can we prevent the default behavior? using  a prop called `type='button'` on button element. This type won't submit the the form. The default type is `type='submit'`.

![alt text](image-18.png)

- When we set `type='button'`, we can see on click the page does not gets reloaded. We make sure that this button is no longer submitting the form.

![alt text](image-19.png)

- Another way to do so, which is more is by using `onSubmit` handler and `event.preventDefault()`.

```
export default function Login() {

  function onClickHandler(event){
    event.preventDefault();
    console.log('Login button clicked');
  }

  return (
    <form onSubmit={onClickHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
```

- On browser

![alt text](image-19.png)

- The form here will actually trigger a submit event. We get such an `event` object for every event that's being triggered for click events, just like for change events or the submit event. But this event object now has a special method which we can call, the `preventDefault` method. And this method does what the name implies, it prevents the default browser behavior, which would be to generate and send this HTTP request. And that is indeed therefore a pattern which you will see in many React applications.
- In React, we can get and set these input form values with help of state or refs hooks. But there is a more better approach which is `FormData`.

### `FormData`

- In HTML, `FormData` is a browser API object that allows you to construct a set of key/value pairs representing form data. It's essentially a way to gather and organize data from HTML form elements before sending it to a server via HTTP requests.
- `FormData` objects provide a way to collect the values of form fields (like text inputs, select boxes, etc.) and associate them with their corresponding names.
- Let's see an example

```
export default function Login() {

  function onClickHandler(event){
    event.preventDefault();
    console.log('Login button clicked');

    const formDataValues = new FormData(event.target);
    console.log('Email:', formDataValues.get('email'));
    console.log('Password:', formDataValues.get('password'));

    // If you want to log all form data as an object
    console.log('Form data:', Object.fromEntries(formDataValues.entries()));
  }

  return (
    <form onSubmit={onClickHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
```


- On browser

![alt text](image-20.png)

- Every form input element is associated with the prop `name` (like `<input id="email" type="email" name="email" />`) which gives keys and their input as value for the Object. It converts the form data into a plain JavaScript object. To access particular value we can use the `get()` method.
- `.entries()` returns an iterator of all key-value pairs in the `FormData` object. `.entries()` does not shows multi-select input values. Let's see an example.

```
export default function Login() {

  function onClickHandler(event){
    event.preventDefault();
    console.log('Login button clicked');

    const formDataValues = new FormData(event.target);
    console.log('Email:', formDataValues.get('email'));
    console.log('Password:', formDataValues.get('password'));

    // If you want to log all form data as an object
    console.log('Form data:', Object.fromEntries(formDataValues.entries()));
  }

  return (
    <form onSubmit={onClickHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>
    <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
```

- On browser

![alt text](image-21.png)

- In such case we can retrieve all selected option by prop `name` and using `getAll()`.

```
export default function Login() {

  function onClickHandler(event){
    event.preventDefault();
    console.log('Login button clicked');

    const formDataValues = new FormData(event.target);
    console.log('Email:', formDataValues.get('email'));
    console.log('Password:', formDataValues.get('password'));

    // If you want to log all form data as an object
    const AllFormData=Object.fromEntries(formDataValues.entries());

    const CheckBoxes = formDataValues.getAll('acquisition');
    AllFormData.acquisition = CheckBoxes;
    console.log('All Form Data:', AllFormData);
    // You can now use AllFormData to send to your server or process further
  }

  return (
    <form onSubmit={onClickHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>
    <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
```

- On browser

![alt text](image-22.png)

- We can add validation with helps of state but HTML provided by built-in validation props like `required`, `type`, `min`, `max` etc.. These are [built-in validation props](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation#using_built-in_form_validation) provided by HTML.

```
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"  required/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" minLength={5} required/>
        </div>
      </div>
```

- On browser when we enter a invalid data

![alt text](image-23.png)

![alt text](image-24.png)

## Form Action (React 19+)

>[!NOTE]
> - Form Actions feature is available in React version 19 or higher. So if you're working in a React project that uses an older version of React, you can't use this feature.

- We can handle form submissions by adding this `onSubmit` prop to the `form` element. And then you can point at a function that should be executed when that form is submitted. This approach being used in many React projects.
- You can also set this pointing function as a value for the `action` prop on the `form` element. Form elements support the `action` prop or the `action` attribute no matter if you are using React or not.
- Similarly like `submit` button, this action attribute here would be used to define the path or the URL to which the browser sends the form data when the form is submitted. So that would be the default behavior for **non-react based projects**.
- Now, in React, when adding the `action` prop to a form element, this is not what will happen. Instead, React kind of overrides this attribute, this prop, and React will make sure that any function pass to the `action` prop which receive a `formData` object by default and it also call `preventDefault`. You won't get an `event` object.
- Let's see an example

```
export default function Login() {

  function onClickHandler(formDataObject){
    const email= formDataObject.get('email');
    const password = formDataObject.get('password');
    const acquisition = formDataObject.getAll('acquisition');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Acquisition:', acquisition); // Array of checked values
  }

  return (
    <form action={onClickHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" minLength={5} required/>
        </div>
      </div>
    <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
```

- On browser

<video controls src="2025-9.mov" title="title"></video>


- Now, when using this form actions feature, this `formData` object (`formDataObject`) is created automatically for you by React. And this `formData` object then will contain all the submitted data, so all the submitted input values in that form.
- You also might notice that the form was reset, the email field was cleared because that's also something React does automatically for you.
- Now suppose, you wanted to display an error message, whether the input email id is invalid or password length is too short etc.. you can return any object or any data type value (returning is optional in form action) from your function `onClickHandler`. Like below

```
  function onClickHandler(formDataObject){
    const email= formDataObject.get('email');
    const password = formDataObject.get('password');
    const acquisition = formDataObject.getAll('acquisition');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Acquisition:', acquisition); // Array of checked values

    const errorObject = {errors: []};
    if (!email) {
      errorObject.errors.push('Email is required');
    }
    if (!password || password.length < 5) {
      errorObject.errors.push("Password must be at least 5 characters long");
    }
    if(errorObject.errors.length > 0) {
      return errorObject;
    }else{
      return {errors: null};
    }
  }
```

### `useActionState`

- Now we will receive an object from the function `onClickHandler` now to display this error on UI, we need to use `useActionState`. So `useActionState` hook helps in handling form submissions and updating UI state based on function returned response or server returned response — all in one place. This hook helps you to manage forms related state or actions related states.
- Let's see its example.

```
import { useActionState } from "react";

export default function Login() {

  function onClickHandler(prevStateObj,formDataObject){
    const email= formDataObject.get('email');
    const password = formDataObject.get('password');
    const acquisition = formDataObject.getAll('acquisition');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Acquisition:', acquisition); // Array of checked values

    const errorObject = {errors: []};
    if (!email) {
      errorObject.errors.push('Email is required');
    }
    if (!password || password.length < 5) {
      errorObject.errors.push("Password must be at least 5 characters long");
    }
    if(errorObject.errors.length > 0) {
      return errorObject;
    }else{
      return {errors: null};
    }
  }

  const [formActionHandler, onClickHandlerUpdatedFunction] = useActionState(onClickHandler,{errors: null});

  return (
    <form action={onClickHandlerUpdatedFunction}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"/>
        </div>
      </div>
    <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>
      {formActionHandler.errors && formActionHandler.errors.length > 0 && (
        <div className="error">
          <ul>
            {formActionHandler.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
```

- On browser

![alt text](image-25.png)


- `useActionState` takes two parameters.

```
const [formActionHandler, onClickHandlerUpdatedFunction] = useActionState(onClickHandler, { errors: null });
```

- `onClickHandler` — your action function, this is called whenever the form is submitted.
- `{ errors: null }` — your initial state of the returned value (the `formActionHandler` starts from this value).
- It returns:
  - `formActionHandler`: the current state after the action runs and it consist of the returned value
  - `onClickHandlerUpdatedFunction`: a wrapped version of your `onClickHandler` that React can use in the form `<form action={...}>`. It triggers your `onClickHandler` on form submit, sends the `FormData`, and automatically updates the `formActionHandler` state with the return value. You can’t just pass `onClickHandler` directly — React wraps it to `onClickHandlerUpdatedFunction` to track results and re-render when needed.
- The function `function onClickHandler(prevStateObj,formDataObject)` uses `prevStateObj` because React calls your handler with:
  - `prevStateObj`: the previous state returned (initially `{ errors: null }`)
  - `formDataObject`: the form data
- So this lets you:
  - Access and validate form input values
  - Use or mutate past state if needed (e.g., count attempts). Based on past state you can validate and return your new state.
  - Return updated state (usually an object like `{ errors: [...] }`)
- `formActionHandler` has the latest state returned by your action function (`onClickHandler`)




## `React.StrictMode`

- `React.StrictMode` is a useful component for highlighting potential problems in an application.
- Strict mode is a set of development tools that help you catch potential problems in your code before they become actual bugs. When you enable strict mode in your React application, you’re essentially telling React to turn on a bunch of extra checks and warnings that are designed to help you write better code.
- These checks and warnings can catch things like:
  - Components with side effects
  - Deprecated or unsafe lifecycle methods
  - Unsafe use of certain built in functions
  - Duplicate keys in lists

![alt text](2025-strictmode.gif)


https://chatgpt.com/c/6816fdbf-82a4-8009-8e6a-37ed3c5cfef1
https://medium.com/@codeofrelevancy/what-is-strict-mode-in-react-cc8b51fb6096

TO be continue later