
// import { useReducer } from 'react';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
// import About from './components/About';
// import BuggyComponent from './components/BuggyComponent';
// import Card from './components/Card/Card';
// import ErrorBoundary from './components/ErrorBoundary';
// import MyComponent from './components/MyComponent';
// import MyPara from './components/MyPara/MyPara.jsx';
// import Navbar from './components/Navbar';
// import { MyProviderValue } from './components/store/MyContext.jsx';
// import TextFilters from './components/TextFilters';
// import TextInput from './components/TextInput';
// import Timer from './components/Timer';
// import useWindowWidth from './hooks/useWindowWidth';

// export const NavBarProps = {
//   navTitle: "Text Utilities",
//   tab1: "Home",
//   tab2: "About",
//   tab3: "Text Filtration",
//   tab4: "Timer"
// };

// const buttonStyle = {
//   backgroundColor: '#4CAF50', /* Green */
//   border: 'none',
//   color: 'white',
//   padding: '15px 32px',
//   textAlign: 'center',
//   textDecoration: 'none',
//   display: 'inline-block',
//   fontSize: '16px',
//   margin: '4px 10px',
//   cursor: 'pointer',
// };

// const h2Style = {
//   color: '#4CAF50',
//   fontSize: '24px',
//   margin: '20px 0',
// };


// // All Logic for each state is in the reducer function
// function countReducer(state, action) {
//   if (state.count >= 10 && action.type === 'increment') {
//     return { count: 0 };
//   }
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     case 'reset':
//       return { count: 0 };
//     default:
//       throw new Error();
//   }
// }

// function App() {
//   const width = useWindowWidth();

//   const [state, countDispatch] = useReducer(countReducer, {count: 0});

//   return (
//     <Router>
//       <Navbar {...NavBarProps}/>
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<TextInput />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/filter" element={<TextFilters />} />
//           <Route path="/timer" element={<Timer />} />
//         </Routes>
//       </div>
//       <div>
//       <Card name="Harsh Pandya">
//         <p>
//           Learning React and building a text utility app.
//         </p>
//         <p>
//           <a href="mailto:blake@example.com">Email Harsh</a>
//         </p>
//          </Card>
//          </div>
//          <MyPara/>
//          <MyProviderValue>
//       <MyComponent>
//       </MyComponent>
//       </MyProviderValue>
//       <div>
//       <h2 style={h2Style}>Count: {state.count}</h2>
//       <button style={buttonStyle} onClick={()=>countDispatch({type: 'increment'})}>+</button>
//       <button style={buttonStyle} onClick={() => countDispatch({type: 'decrement'})}>-</button>
//       <button style={buttonStyle} onClick={() => countDispatch({type:'reset'})}>Reset</button>
//     </div>
//         <div>
//       <h1>React Error Boundary Demo</h1>

//       {/* Wrap only the risky component */}
//       <ErrorBoundary>
//         <BuggyComponent />
//       </ErrorBoundary>

//       {/* This part of the UI won't crash if BuggyComponent fails */}
//       <p>This part of the UI is safe.</p>
//     </div>
//        <div>Window width: {width}px</div>
//     </Router>
//     );
// }

// export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextFilters from './components/TextFilters';
import TextInput from './components/TextInput';
import Timer from './components/Timer';
import RootLayout from './components/RootLayout';
import ErrorPage from './components/ErrorPage';
import DisplayUser from './components/DisplayUser';


// createBrowserRouter is used for defining routes in React Router v6.4+. It takes an array of route 
// objects and returns a router instance that can be used with the Router component.
const router = createBrowserRouter([
  {
    // The path property defines the URL path for the route.
    // The element property specifies the React component that should be rendered when the route matches.
    // The children property is an array of nested routes that will be rendered within the parent route's component.
    // <RootLayout /> is a component that serves as the layout for the application, providing a consistent structure across different pages.
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
    index: true, // This indicates that this route should match the root path ("/").
    element: <TextInput />
  },   
      {
    path: "about",
    element: <About />
  },
  {
    path: "filter",
    element: <TextFilters />
  },
  {
    path: "timer",
    element: <Timer />
  },
  {
    path: "user/:userId",
    element: <DisplayUser />
  }
]
  }
]);


// RouterProvider is used to provide the router instance to the React application. It is a component that wraps the entire application and allows the use of routing features like navigation, route matching, and rendering components based on the current URL.
// This is typically used in conjunction with the createBrowserRouter function to define the routes for the application.
function App() {
  return (

        <RouterProvider router={router} />
    
  );
}

export default App;