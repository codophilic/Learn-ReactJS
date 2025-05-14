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