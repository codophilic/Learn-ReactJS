# About React JS

- React.js is a JavaScript library and not a framework for building user interfaces, primarily for single-page applications where the data dynamically updates without requiring a full page reload. 
- It’s component-based, which means it lets developers create reusable UI components that manage their own state. React was originally developed by Facebook (now Meta), which introduced it in 2013 to solve the challenges of managing complex and interactive user interfaces.

## Component Based 

- What does **component-based** means??
- Lets say you wanna build below page

![alt text](Images/image.png)

- Traditionally , you would write several HTML, CSS and JS files. These files will be separately maintained. Any change in design or function , the corresponding CSS or JS file would be modified. This is an overhead task where developer needs to switch between these files.
- The idea behind React is to break the page into several components. Referring above image, you will have component for menu bar, you will have component for *Read* , Similarly you will have component for *Practice* and so on.
- Each component will have its own CSS and JS. So whenever you wanna change any part of your page, you just require to edit that particular component CSS or JS.
- These component can be reuse as well. Lets say in the above image, there are 3 widgets (**Read, Practice and Learn**). If you observer the styling and layout are same. Only the content and images are being varying, so you can make a generalize component of that widget and reuse it by passing the content and images. Any change require will be affected to 3 of them.
- That's why React is a component based library. Each component is a small, reusable piece of UI that manages its own state and renders as needed.
- Lets start create a project using React JS.

```
npx create-react-app textutilities              OR          npm create-react-app textutilities 
```

- Whats the difference between **npx** and **npm**?

### `npx (Node Package eXecute)`

- `npx create-react-app my-app`
    - One-time use: `npx` lets you use `create-react-app` without installing it on your computer.
    - Always up-to-date: It will always get the latest version automatically.
    - Recommended for most people: Since it doesn’t leave extra files on your computer, it’s a cleaner and easier option if you don’t make React apps every day.

### `npm (Node Package Manager)`
- `npm install -g create-react-app` and then `create-react-app my-app`
    - Permanent install: You’re adding create-react-app to your computer, so it’s ready whenever you want to make a new React app.
    - You’re responsible for updates: It stays at that version until you update it yourself.
    - Useful if you create React apps often: This makes the setup a bit faster if you’re working on multiple projects.


>[!NOTE]
> - For most people, `npx create-react-app my-app` is easier and recommended. It keeps things simple by always using the latest version without installing extra stuff on your computer. 
> - For most developers, using npx create-react-app my-app is recommended because:
>   - It saves space by not permanently installing the tool.
>   - It ensures you’re always using the latest version.

### Create React Project

- Post running the `npx` command we can see below folder structure gets created.

![alt text](Images/image-1.png)

- Here’s a simple breakdown of each part:
    - **node_modules**: This is a folder that contains all the code libraries (called `packages`) your app needs to run. When you install libraries with npm, they go here. You usually don’t touch this folder directly. Basically the dependencies.
    - **package.json**: This file keeps track of the libraries and versions your app uses. It also contains some basic information about your app, like its name and version. It’s like the app’s “table of contents” for dependencies.
    - **package-lock.json**: This file “locks” the specific versions of each library so that if someone else installs your app, they get the exact same versions. It helps make sure everything works the same on different computers.
    - **src** (Source): This folder is where you write most of your code! It contains the app’s main logic and components. You’ll find files like **`App.js`** here, which is the main file for your app’s code.
    - **public**: This folder holds files that won’t change, like images or the main HTML file (`index.html`). React injects your code into this HTML file so it can show up on the web page.
    - **README.md**: This file usually has information about your app, like what it does and how to run it. It’s helpful for others who might work on your app later.

- Lets open **index.html** file

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

- Under the `public/` folder this **index.html** file is present, all other files are static which are redundant.
- Under the `src/` folder if you see there is an **index.js** file

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
```

- There is one more file called **App.js**.

```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

- **`App.js`**
    - **Main Component**: `App.js` is the main component of your React app. Think of it as the “home” for your app’s code, where you can organize what’s displayed on the page.
    - **What It Does**: This file has the main structure and styling for your app. Inside `App.js`, you can add other smaller HTML components or write the main content you want users to see.
- **`index.html`** (in the Public Folder)
    - **Static HTML Page**: This is a simple HTML file with a `<div>` element with an `id="root"`.
    - **React Injection Point**: React uses JavaScript to inject everything from `App.js` and other components into this root `div`. So, instead of having lots of HTML files, React puts everything inside this single `index.html` through JavaScript.
- **`index.js`** (in the src Folder)
    - **Starting Point**: `index.js` is where React’s code starts running. It’s like the “control center” that tells React what to display.
    - **Connecting `App.js` to `index.html`**: `index.js` imports `App.js` and then uses a React function (`ReactDOM.render`) to load everything from `App.js` into the root div in `index.html`. If you see in `index.js` there is an `<App/>` tag , this is a component 


- Lets run our simple app

```
  cd texutilities
  npm start
```

>[!NOTE]
> - `node_modules` folder is required to start your application and **it is not usually committed in github repositories because it can be regenerated again by using `npm install`**. So first generate the `node_modules` by running command `npm install` then start your application.

- In Terminal

```
You can now view texutilities in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.6:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

- On browser we can see 

![alt text](Images/image-2.png)

- In the **App.js** file, if we change the content, its get reflected automatically

```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

- On browser

![alt text](Images/image-3.png)

- Lets edit the **App.js** file and lets some implement basic elements

```
import './App.css';


let h1Content="ABC"
function App() {
  return (
    <div className="App">
      <h1>Hello!, My name is {h1Content}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aspernatur a recusandae omnis consequuntur, impedit officiis at quae aut dignissimos nisi corporis fuga! Deserunt eum omnis voluptatum minus in adipisci.</p>
    </div>
  );
}

export default App;
```

- On browser 

![alt text](Images/image-4.png)

- If you observer , we have defined Javascript variable `let h1Content="ABC"` and used it inside the HTML `<h1>Hello!, My name is {h1Content}</h1>`. The `return` function thus gives us HTML,CSS and JS code, the component that is returned by `App` function is called **JSX (JavaScript XML)**.
- JSX stands for JavaScript XML. It’s a syntax that lets you write HTML-like code directly in JavaScript files. Even though it looks like HTML, it’s actually JavaScript under the hood. JSX makes it easy to combine JavaScript logic and HTML structure within your components, so your code stays readable and organized.
- JSX makes it easy to see both the structure (HTML-like) and logic (JavaScript) of your components in one place. Instead of splitting code between HTML files and JavaScript files, JSX lets you:
    - Build UI components directly in JavaScript.
    - Embed logic (like `{h1Content}`) alongside your HTML structure.
    - Style elements directly with className or inline CSS.
- JSX is very similar to HTML, but it has a few key differences in how attributes are named.
-  In JavaScript, `class` is a reserved keyword used to define classes (for example, `class MyComponent {}`). So, React uses `className` instead to avoid conflicts. Similarly, `for` is a reserved word in JavaScript (used in `for` loops). So, React uses `htmlFor` instead when setting labels for inputs in JSX. In HTML, `tabindex` is all lowercase, but in JSX, it’s `tabIndex` with camelCase, which matches JavaScript naming conventions.
- Most other HTML attributes remain the same (like `src`, `alt`, `title`, etc.), as they don’t conflict with JavaScript syntax. However, custom attributes or event handlers are camelCased, like `onClick` and `onChange`.
- Behind the scenes, JSX is **transformed by tools like Babel** into JavaScript `React.createElement() `calls. When you use JSX, the compiler transforms it into React function calls that the browser can understand.

```
import './App.css';

let h1Content = "ABC";
function App() {
  return React.createElement(
    'div',
    { className: 'App' },
    React.createElement('h1', null, `Hello!, My name is ${h1Content}`),
    React.createElement(
      'p',
      null,
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aspernatur a recusandae omnis consequuntur, impedit officiis at quae aut dignissimos nisi corporis fuga! Deserunt eum omnis voluptatum minus in adipisci.'
    )
  );
}

export default App;
```

- Using JSX isn’t mandatory, but it’s popular because it makes React code more readable and expressive. If you don’t use JSX, you’ll need to use pure JavaScript to define elements. To make this work, React elements must be created using `React.createElement()`. Additionally, you need to defined a compiler like Babel (a JavaScript compiler) which is required to convert your code into JavaScript that the browser understands.
- Lets create another `h1` tag

```
import './App.css';

let h1Content="ABC"
function App() {
  return (
    <div className="App">
      <h1>Hello!, My name is {h1Content}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aspernatur a recusandae omnis consequuntur, impedit officiis at quae aut dignissimos nisi corporis fuga! Deserunt eum omnis voluptatum minus in adipisci.</p>
    </div>
    <h1> Hello </h1>
  );
}

export default App;
```

- The above code will give error

![alt text](Images/image-5.png)

- Why so? In React, every component can return only one single parent element. This is a design decision because React needs a single “container” element to manage each component **effectively within the Virtual DOM**, which keeps rendering updates efficient. Fewer DOM elements mean lighter page structure, which can improve page load times and rendering.

*We will learn about Virtual DOM later*.

- To return multiple elements without an extra wrapper like a `<div>` like below 

```
import './App.css';


let h1Content="ABC"
function App() {
  return (
    <div className="App">
      <h1>Hello!, My name is {h1Content}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aspernatur a recusandae omnis consequuntur, impedit officiis at quae aut dignissimos nisi corporis fuga! Deserunt eum omnis voluptatum minus in adipisci.</p>
      <h1> Hello </h1>
    </div>
  );
}

export default App;
```

- when you don’t want extra `div` wrappers that might mess up your styling or create unnecessary DOM nodes. You can use **React Fragments**. A fragment lets you group multiple elements.

```
import './App.css';
import { Fragment } from 'react';

let h1Content="ABC"
function App() {
  return (
    <Fragment>
    <div className="App">
      <h1>Hello!, My name is {h1Content}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aspernatur a recusandae omnis consequuntur, impedit officiis at quae aut dignissimos nisi corporis fuga! Deserunt eum omnis voluptatum minus in adipisci.</p>
    </div>
    <h1> Hello </h1>
    </Fragment>

  );
}

export default App;
```

- On browser 

![alt text](Images/image-6.png)

- Alternatively you can use `<>..</>` short syntax for fragments.

```
import './App.css';

let h1Content="ABC"
function App() {
  return (
    <>
    <div className="App">
      <h1>Hello!, My name is {h1Content}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur aspernatur a recusandae omnis consequuntur, impedit officiis at quae aut dignissimos nisi corporis fuga! Deserunt eum omnis voluptatum minus in adipisci.</p>
    </div>
    <h1> Hello </h1>
    </>

  );
}

export default App;
```

## Import Export

- In JS, `import` and `export` are used to share code between files. They allow you to organize your code into smaller, reusable pieces and then bring those pieces into other files as needed.
- **export**: When you want to make a variable, function, or component available for use in another file, you export it.
- **import**: When you need something that was defined in another file, you import it.
- There are two main types of exports:
    - Named Export: You can export multiple things from a file, and you have to import them by the exact name they were exported with.
    - Default Export: Each file can have one default export, and you can import it with any name you like.

- Example

```
// utils.js
export const add = (a, b) => a + b; // Named export
export const subtract = (a, b) => a - b; // Named export
export default multiply = (a, b) => a * b; // Default export


// main.js
import multiplyDefaultExport from './utils'; // Default import, can be named anything
import { add, subtract } from './utils'; // Named import, must use exact names
```

- We have given our project name as **textutilities**, so basically it will accept a string from user, perform some operations like making the entered string to upper case or lower case or count characters or words etc.. Now first lets add some bootstrap into our **index.html** file.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Text Utilities</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>
  <body>
    <div id="root"></div>

  </body>
</html>
```

## `props`

- Now we wanted to build first this below Navigation bar.

![alt text](Images/image-7.png)

- So lets consider that we will be having navigation bar as one of the component. First create a component folder (`/src/components`) which will consist all your components of your web page.
- Lets create `Navbar.js` file and export the function `Navbar` as default export. Since navigation requires list of items, the below code snip of HTML elements you gonna get it from [bootstrap](https://getbootstrap.com/docs/4.4/components/navbar/#supported-content). Using the template , tweaking it little bit we modify as per the require page above.

```
import React from 'react';


export default function Navbar(){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">TextUtilities</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">About</a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
        </>
    );
}
```

- Import this `Navbar` into **App.js**.

```
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Navbar/>
  );
}

export default App;
```

- The values like `TextUtilities`, `Home` and `About` are hardcoded, can you make it dynamic ? yes using properties (`props`). In React, props (short for properties) are a way to pass data from a parent component to a child component. Think of them as the arguments you pass to a function. Props are arguments passed into React components. Props are passed to components via HTML attributes.
- Modifying the **App.js** and **Navbar.js**.

```
//App.js

import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Navbar navTitle="Text Utilities" tab1="Home" tab2="About"/>
  );
}

export default App;

//Navbar.js

import React from 'react';


export default function Navbar(props){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">{props.navTitle}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/"> {props.tab1} <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/"> {props.tab2} </a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
        </>
    );
}
```

- The `navTitle`, `tab1` and `tab2` are custom attributes we defined in the tag `Navbar`. The `props` is an object. `props` are passed as a single object to the child component. **Child components cannot modify the props they receive. They are immutable.**
- `props` facilitate a top-down data flow in React applications, meaning data flows from parent components to child components. `props` allow you to create reusable components that can be customized with different data.

### `propTypes`

- In React, `propTypes` is a library that allows you to define the types of props that a component should receive. This is helpful for validating the props that are passed to your components, ensuring that they receive the correct data types and preventing bugs. PropTypes are especially useful for larger applications where components can have many props.
- Adding `propTypes` in the `Navbar.js`

```
import React from 'react';
import PropTypes from 'prop-types';


export default function Navbar(props){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">{props.navTitle}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/"> {props.tab1} <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/"> {props.tab2} </a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
        </>
    );
}

Navbar.propTypes={
    navTitle: PropTypes.string.isRequired,
    tab1: PropTypes.string.isRequired,
    tab2: PropTypes.string.isRequired
}
```

- Now if we try to enter number or any other type of attribute value in **App.js** , it will give error in browser console.

```
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Navbar navTitle={2} tab1="Home" tab2="About"/>
  );
}

export default App;
```

- On browser console

![alt text](Images/image-8.png)


- You can also add some default values. To specify a default value for a prop if it’s not provided, you can use the `defaultProps` property. This is helpful for props that can have a fallback value.

```
// Snip of Navbar.js
Navbar.defaultProps={
    navTitle: "Some Default Value",
    tab1: "Some Tab1",
    tab2: "Some Tab2"
}
```

- When we not pass any attributes into the **App.js**

```
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <Navbar/>
  );
}

export default App;
```

- On browser

![alt text](Images/image-9.png)


>[!WARNING]
> - In future version the `functionName.defaultProps` will be deprecated. Instead you can assign default value in the argument for those properties.
> - Example
> ```
> import React from 'react';
> 
> function Navbar({ title = 'Default Title' }) {
>  return <h1>{title}</h1>;
> }
> 
> export default Navbar;
> ```


- Instead of writing `prop.attributeName` we can also write `attributeName` providing the function accepts object of attributes like below.

```
export default function Navbar({navTitle,tab1,tab2}){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">{navTitle}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <a className="nav-link" href="/"> {tab1} <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/"> {tab2} </a>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
        </>
    );
}
```

- Here are some of the most commonly used Basic PropTypes:
    - `PropTypes.string`: A string
    - `PropTypes.number`: A number
    - `PropTypes.bool`: A boolean
    - `PropTypes.func`: A function
    - `PropTypes.object`: An object
    - `PropTypes.array`: An array
    - `PropTypes.node`: Anything that can be rendered (numbers, strings, elements, etc.)
    - `PropTypes.element`: A single React element



## State

- State is like a component's memory. It’s a way to store information that can change over time as the user interacts with the app. Think of state as a variable that "remembers" values between renders of your component.
- For example, if you have a counter component that displays a number on the screen and you want it to increase every time the user clicks a button, that number needs to be stored somewhere. That’s where state comes in—it holds the current value of the counter and can be updated every time the button is clicked.
- Now our page will accept input text from the user, and based on it will perform operation on it like upper case etc.., So lets create a **TextInput.js**.

```
import React from 'react'

export default function TextInput(){
    return(
        <div>
        <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Enter your Text Here </label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="button" className="btn btn-primary">Convert to UPPERCASE</button>
        </div>
    );
}
```

- Lets add the component `TextInput` into the **App.js** file.

```
import './App.css';
import Navbar from './components/Navbar';
import TextInput from './components/TextInput';

function App() {
  return (
    <>
    <Navbar navTitle="Text Utilities" tab1="Home" tab2="About"/>
    <div className="container">
    <TextInput/>
    </div>
    </>
  );
}

export default App;
```

- Now whatever the input entered by the user becomes the state. So lets defined `useState` in our function `TextInput`. 

```
import React,{useState} from 'react'

export default function TextInput(){
    const [inputUser,SetInputUser]=useState(" ");
    const OnChangeEvent=(event)=>{
        SetInputUser(event.target.value);
    }
    const OnClickEvent=()=>{
        SetInputUser(inputUser.toUpperCase());
    }
    return(
        <div>
        <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Enter your Text Here </label>
        <textarea className="form-control" value={inputUser}  onChange={OnChangeEvent} id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="button" onClick={OnClickEvent} className="btn btn-primary">Convert to UPPERCASE</button>
        </div>
    );
}
```

- Here `useState` will be used to manage the state of the within the functional component `TextInput`. 

```
export default function TextInput() {
  const [inputUser, SetInputUser] = useState(" ");
  ..}
```

- `inputUser` is a piece of state that will store the current value of the text entered by the user. `SetInputUser` is the function we use to update `inputUser`. `useState(" ")` initializes `inputUser` with an empty string, `" "`. Each time `SetInputUser` is called with a new value, `inputUser` updates, and the component re-renders with the new value.

```
const OnChangeEvent = (event) => {
  SetInputUser(event.target.value);
};
```

- `OnChangeEvent` is a function that gets triggered whenever the text area’s content changes. The `event` parameter is automatically passed to the function when the event is triggered. `event.target.value` refers to the current text entered in the text area. By calling `SetInputUser(event.target.value)`, the `inputUser` state is updated with the latest text input.

```
const OnClickEvent = () => {
  SetInputUser(inputUser.toUpperCase());
};
```

- `OnClickEvent` is a function that gets triggered when the button is clicked. It uses `inputUser.toUpperCase()` to convert the current text to uppercase and then updates the state using `SetInputUser`. Once `SetInputUser` updates the state, the component re-renders, and the uppercase text appears in the text area.
- **`onChange` event listener is essential for capturing user input as it's typed in the text area. Every time the user types a character, `OnChangeEvent` updates `inputUser` with the current text, so `inputUser` always has the latest text value. `onClick` event listener is necessary to handle the button's functionality. When clicked, `OnClickEvent` is triggered to change the text to uppercase, providing the interactive "Convert to UPPERCASE" feature. `useState` initializes and updates state (`inputUser`) in the component. Event handlers (`onChange`, `onClick`) allow interaction with the text area and button.**


<video controls src="Images/2024-1.mp4" title="title"></video>

>[!NOTE]
> - We cannot directly change the state mode by re-assigning new value like `inputUser="New Text"`, we need to always use the set method (`SetInputUser`)

- Lets add more utilities like counting words and characters.

```
import React,{useState} from 'react'

export default function TextInput(){
    const [inputUser,SetInputUser]=useState(" ");
    const OnChangeEvent=(event)=>{
        SetInputUser(event.target.value);
    }
    const OnClickEvent=()=>{
        SetInputUser(inputUser.toUpperCase());
    }
    return(
        <div>
        <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Enter your Text Here </label>
        <textarea className="form-control" value={inputUser}  onChange={OnChangeEvent} id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="button" onClick={OnClickEvent} className="btn btn-primary">Convert to UPPERCASE</button>

        <div className="container my-3">
            <p> Number of Words - {inputUser.split(" ").length} , Number of Characters - {inputUser.length}</p>
        </div>

        </div>
    );
}
```

- On browser

![alt text](Images/image-10.png)

## React Router

- Lets consider Geeks for Geeks website.


<video controls src="Images/2024-3.mp4" title="title" ></video>


- If you see whenever we click on any menu title on the page, the whole page is rendered or loaded. This is not a single page application.

- Consider below youtube website


<video controls src="Images/2024-2.mp4" title="title" ></video>

- When you click on the any of the title, the page is not render or loaded, the content are only getting change. This is an example of single page application.
- React Router is a library for managing navigation in React applications, especially single-page applications (SPAs). In a typical SPA, there's only one HTML file, and React dynamically updates the content based on user interactions without reloading the page.
- Without a single-page application (SPA), each time you navigate to a new page, the browser sends a new request to the server. The server then responds with the full HTML, CSS, and JavaScript for that specific page. This traditional approach is known as multi-page application (MPA) architecture, where every page load is a separate HTTP request and response cycle, which can sometimes feel slower and less seamless.
- In a single-page application (SPA) with React Router, however, only the initial request loads the entire page and the essential assets (like HTML, CSS, and JavaScript). After that, navigation between "pages" is handled within the app itself. React Router manages the routes and decides which component to display based on the URL path, without sending a request back to the server. This means:
  - **No additional full-page loads**: Only the needed component updates, making the app feel faster.
  - **More fluid user experience**: There's no flash of white screen or reloading as users navigate, because the routing and component rendering happen entirely on the client side (in the browser).
- First lets install react router

```
npm install react-router-dom@latest
```

- Lets create an `About` page content using a new component.

```
import React from "react";

export default function About(){
    return (
        <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" labelled="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" labelled="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" labelled="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
    );
}
```

- Instead of `<a>` anchor tag we need to use `Link` and instead of `href` we need to use `to`.

```
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

export default function Navbar({navTitle,tab1,tab2}){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">{navTitle}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/"> {tab1} <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about"> {tab2} </Link>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
        </>
    );
}

Navbar.propTypes={
    navTitle: PropTypes.string.isRequired,
    tab1: PropTypes.string.isRequired,
    tab2: PropTypes.string.isRequired
}
// Navbar.defaultProps={
//     navTitle: "Some Default Value",
//     tab1: "Some Tab1",
//     tab2: "Some Tab2"
// }
```

- `BrowserRouter`: Wraps your application and enables routing functionality. 
- `Link`: Renders an anchor tag to navigate between routes without reloading the page.
- `Routes` and `Route`: Define the routes for your application. Each Route maps a URL path to a component.
- Before using `npm start` you need to use `set NODE_OPTIONS=--openssl-legacy-provider`.
- On browser

<video controls src="Images/2024-4.mp4" title="title"></video>


>[!NOTE]
> - In React Router v6 (`react-router-dom v6`), the `Switch` component has been replaced with the `Routes` component. 

## Types of Component

- In React, there are two primary ways to create components function and class components. Each has its own syntax and use cases.
- All the above implementation are functional based implementation. Lets understand class based components.

### Class Components

- Class-based components are JavaScript ES6 classes that extend from `React.Component`. They have access to state and lifecycle methods and are traditionally used when complex logic and state management are needed.
- A class-based component must extend `React.Component` (or `React.PureComponent` for optimized rendering).
- They include a `render()` method, which returns JSX elements.
- Lets create a new tab as `TextFilters` on our Navigation bar using class based component.

```
import React , {Component} from "react";

class TextFilters extends Component{
    render(){
        return (
            <div>This is a Filter Class</div>
        );
    }
}

export default TextFilters;
```

- In the `Navbar` function we need to add a new navigation list.

```
            <li className="nav-item">
                <Link className="nav-link" to="/filter"> {tab3} </Link>
            </li>
```

- An in **App.js** we need to add a new Route

```
          <Route path="/filter" element={<TextFilters />} />
```

- On browser

![alt text](Images/image-11.png)

- Lets add state into our class component.

```
import React, { Component } from "react";

class TextFilters extends Component {
    constructor(props) {
        super(props); // Call the superclass constructor
        // Initialize the state
        this.state = {
            inputUser: ""
        };
    }
    // Event handler for handling changes in the textarea
    onChangeEvent = (event) => {
        this.setState({ inputUser: event.target.value });
    };

    render() {
        return (
            <div>
                <h2>This is a Filter Class</h2>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Enter your Text Here</label>
                    <textarea
                        className="form-control"
                        value={this.state.inputUser}
                        onChange={this.onChangeEvent}
                        id="exampleFormControlTextarea1"
                        rows="3"
                    ></textarea>
                </div>
                <p>Your input: {this.state.inputUser}</p>
            </div>
        );
    }
}

export default TextFilters;
```

- **In class-based components, state is typically initialized in the constructor. You define `state` as an object where each property represents a piece of state the component will manage**. For example:

```
constructor(props) {
    super(props); // Call the parent class constructor
    this.state = {
        inputUser: "", // Initial state for the input
        anotherStateVariable: 0 // You can add more state variables as needed
    };
}
```

- **You define all the variables that will hold the component's state inside the `this.state` object in the constructor**. This is how you set up the component's internal state, which can be changed over time based on user interactions or lifecycle events.
You can also initialize state directly using class property .
- While it's common to pass `props` to a class component, you do not always need to use them. Props are used to pass data from a parent component to a child component. If your component needs to access `props`, you'll pass them into the constructor.
- `this.props` in your constructor, you must pass `props` to `super().` However, if you're not using `props`, you can still call `super()` without arguments, but it’s a good practice to include it to ensure proper initialization.

- On browser

![alt text](Images/image-12.png)

## Lifecycle of Component

- In React, a component lifecycle refers to the series of stages a component goes through from when it's created to when it’s removed from the DOM. These stages include initialization, updating, and unmounting. Understanding the lifecycle is important because it allows you to manage state and side effects at specific points in a component's existence.
- The lifecycle of a class component can be broken down into three main phases:

- **Mounting**: This phase occurs when the component is being created and inserted into the DOM.
  - **Constructor**: This is where you initialize state and bind methods.
  - `componentDidMount()`: This method is called immediately after the component is added to the DOM. It's often used for fetching data or setting up subscriptions.

- **Updating**: This phase happens when a component's state or props change. This can occur due to user actions, network responses, or parent component updates.
  - `componentDidUpdate(prevProps, prevState)`: This method is called immediately after updating occurs. It receives the previous props and state, allowing you to compare and respond accordingly.
  - `shouldComponentUpdate(nextProps, nextState)`: This method allows you to prevent unnecessary updates by returning `false` if the component doesn't need to re-render.
  - `getSnapshotBeforeUpdate(prevProps, prevState)`: This method allows you to capture some information (like scroll position) from the DOM right before the changes are applied.

- **Unmounting**: This phase occurs when a component is being removed from the DOM.
  - `componentWillUnmount()`: This method is called right before the component is removed from the DOM. It's often used for cleanup tasks, such as invalidating timers or canceling network requests.

- Lets see example in class component.

```
import React, { Component } from "react";

class TextFilters extends Component {
    constructor(props) {
        super(props); // Call the superclass constructor
        // Initialize the state
        this.state = {
            inputUser: ""
        };
    }

    // Lifecycle method that runs after the component mounts
    componentDidMount() {
        console.log("Component has mounted.");
    }

    // Lifecycle method that runs when the component updates
    componentDidUpdate(prevProps, prevState) {
        if (prevState.inputUser !== this.state.inputUser) {
            console.log("Component has updated. New input:", this.state.inputUser);
        }
    }

    // Lifecycle method that runs just before the component unmounts
    componentWillUnmount() {
        console.log("Component is about to unmount.");
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; // Allows the component to update
    }
    
    // Event handler for handling changes in the textarea
    onChangeEvent = (event) => {
        this.setState({ inputUser: event.target.value });
    };

    render() {
        return (
            <div>
                <h2>This is a Filter Class</h2>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Enter your Text Here</label>
                    <textarea
                        className="form-control"
                        value={this.state.inputUser}
                        onChange={this.onChangeEvent}
                        id="exampleFormControlTextarea1"
                        rows="3"
                    ></textarea>
                </div>
                <p>Your input: {this.state.inputUser}</p>
            </div>
        );
    }
}

export default TextFilters;
```

- On browser

![alt text](Images/image-13.png)

- Now when you switch to another menu, the component gets **unmounted**.

![alt text](Images/image-14.png)

- **Every React component has a lifecycle, and may manage state and/or have side effects depending on its functionality. Not every component needs to manage state. Some components are purely presentational and receive data through `props`, without maintaining their own internal state. Similarly, not all components have side effects. Side effects are actions that interact with the outside world, like fetching data, updating the DOM directly, or subscribing to events. Components that only render UI based on props might not need side effects.**
- State is a JavaScript object that holds data relevant to a component. In class components, you typically manage state using the component's constructor and `this.setState()` whereas in functional component we use `useState` hook set method. The state can hold various values, and when the state changes, the component re-renders.
- Side effects refer to operations that affect other parts of the application or have an effect outside the function being executed. Examples include data fetching, subscriptions, manually changing the DOM, logging, etc. In class components, side effects are managed through lifecycle methods (as discussed), while in functional components, the `useEffect` hook is used.

## Hooks

- Functional components in React also have lifecycle capabilities, but they use hooks instead of lifecycle methods found in class components. Additionally, state management in functional components is handled with the `useState` hook, and side effects can be managed using the `useEffect` hook.
- Lifecycle in Functional Components
  - **Mounting**: Similar to the `componentDidMount` lifecycle method in class components, the `useEffect` hook can be used to perform actions when the component mounts.
  - **Updating**: The `useEffect` hook can also act like `componentDidUpdate` when dependencies change. You can specify which state or props changes should trigger the effect.
  - **Unmounting**: You can return a cleanup function from the `useEffect` hook, which acts like `componentWillUnmount` in class components.
- Functional components use hooks to manage state and lifecycle events. `useState` is used to manage state, and `useEffect` is used for handling lifecycle events, including mounting, updating, and unmounting. This modern approach allows for a more concise and readable way to manage component behavior compared to class components.
- Hooks in React allow the functional components to use states and manage side effects. They were first introduced in React 16.8, and let developers to hook into the state and other React features without having to write a class. They provide a cleaner and more concise way to handle state and side effects in React applications.
- Lets see example of `useEffect` used hooks.

```
import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);

    // This effect runs every second, simulating a timer
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
        </div>
    );
};

export default Timer;
```

- This component sets up a timer that increments every second. When the component unmounts, the timer is cleared to prevent memory leaks.


<video controls src="Images/2024-5.mp4" title="title" ></video>



- There are other hooks as well which can be found on internet.



## React Internal Working

- The DOM, or Document Object Model, is a representation of the HTML structure that allows JavaScript to interact with and manipulate the elements on a webpage. Each HTML element is a node in the DOM tree, with parent-child relationships based on their nesting in the HTML code.

![alt text](Images/image-15.png)

- Web browsers utilize the DOM tree to represent and manipulate HTML documents, which enables easy identification and positioning of elements within the browser’s display.
- However, modifying or making changes to DOM elements is a resource intensive and time-consuming process. When a DOM element is altered, the browser has to recalculate the element’s size and position, as well as repaint the screen. This process can be slow, especially for larger applications, because even minor updates might cause extensive re-rendering and repainting of the entire UI.
- React introduces the **Virtual DOM** to mitigate the performance issues associated with the Real DOM.
- **Virtual DOM Representation**: When you create a React component, React builds a lightweight copy of the Real DOM in memory, called the Virtual DOM. This is essentially a JavaScript object that represents the structure of the UI.
- **Component Updates**: When the state of a component changes (for example, due to user interaction), React doesn't immediately update the Real DOM. Instead, it updates the Virtual DOM first.
- **Diffing Algorithm**: After updating the Virtual DOM, React compares the updated Virtual DOM with the previous version of the Virtual DOM to determine what has changed. This process is known as diffing.
  - React uses an efficient algorithm to find out the minimal number of changes required by comparing nodes. It operates under the assumption that components with the same key will have similar structure and can be compared more quickly.
- **Batch Updates**: Once React has identified what has changed, it batches these updates and applies them to the Real DOM in one go. This minimizes the number of direct manipulations on the Real DOM, which is the slowest part of the process.
- **Reconciliation**: This process of updating the Real DOM based on changes detected in the Virtual DOM is called reconciliation. React intelligently decides whether to update, insert, or remove elements from the Real DOM based on the changes it finds in the Virtual DOM.
- How React Implements This
  - **React Elements**: These are plain objects representing the component's structure. When you write JSX, React creates these elements.
  - **Reconciliation Process**: When a component’s state or props change: A new Virtual DOM tree is created based on the updated component. React compares the new Virtual DOM tree with the old one. It generates a list of changes (deltas) that need to be made to the Real DOM.
- **Every time if a component is change a new virtual dom is created**.
- When you update a component's state (for example, using `setState` in a class component or a state setter function in a functional component) or when the `props` change (due to parent component updates), React initiates a re-render of that component.
- During this re-render, React calls the `render` method (in class components) or the function component itself (in functional components). This results in a new Virtual DOM tree being created based on the updated state and props. **Each time a component renders, it produces a new Virtual DOM representation**.
- After creating the new Virtual DOM, React compares it with the previous Virtual DOM tree (the one from the last render). This process is called diffing.
- The diffing algorithm identifies **what has changed between the two Virtual DOM trees**. It looks for differences in nodes, attributes, and structure.
- Based on the results of the diffing process, **React determines the minimal set of updates required to apply to the Real DOM**. React then applies only those updates to the Real DOM, rather than re-rendering the entire UI.
- Example to Illustrate the Process

**1. Initial Render**:
  - Let's say you have a simple counter component that displays a count of 0.

**2. User Action**:
  - When a user clicks a button to increment the count. The state changes from 0 to 1.

**3. Virtual DOM Creation**:
  - React creates a new Virtual DOM tree that represents the updated count. New Virtual DOM: `{ type: 'div', props: { count: 1 } }`

**4. Diffing**: 
  - React compares the new Virtual DOM with the old one. Old Virtual DOM: `{ type: 'div', props: { count: 0 } }`. The diffing algorithm detects that the count has changed.

**5. Updating Real DOM**:
  - React updates the corresponding Real DOM node to reflect the new count. Real DOM now shows `<div>1</div>` instead of `<div>0</div>`.

- Every Change Triggers a New Virtual DOM. Every time a component's state or props change, React generates a new Virtual DOM tree.
- The diffing process ensures that only the parts of the Real DOM that have changed are updated, minimizing the performance impact.
- This method allows React to efficiently manage updates to the UI, providing a fast and responsive user experience without requiring the entire UI to be re-rendered from scratch

### Benefits of Virtual DOM and Reconciliation

- Performance: Minimizes direct manipulations of the Real DOM, leading to improved performance and smoother UI updates.
- Efficiency: Only updates parts of the DOM that actually changed, reducing the need for reflows and repaints.
- Declarative UI: You describe what your UI should look like for any given state, and React takes care of making the necessary updates.

## Functional vs Class Component

| **Functional Components                  **                                                            | **                         Class Components                 **                                 |
|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| **A functional component is just a plain JavaScript pure function that accepts props as an argument ** | A class component requires you to extend from React. Component and create a render function    |
| **No render method used**                                                                              | It must have the render() method returning JSX                                                 |
| **Also known as Stateless components **                                                                | Also known as Stateful components                                                              |
| **React lifecycle methods (for example, componentDidMount) cannot be used in functional components.**  | React lifecycle methods can be used inside class components (for example, componentDidMount).  |
| **Constructors are not used.**                                                                         | Constructor is used as it needs to store state.                                                |


