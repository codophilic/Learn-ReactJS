
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
    path: "/",
    element: <TextInput />
  },   
      {
    path: "/about",
    element: <About />
  },
  {
    path: "/filter",
    element: <TextFilters />
  },
  {
    path: "/timer",
    element: <Timer />
  },
  {
    path: "/user/:userId",
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