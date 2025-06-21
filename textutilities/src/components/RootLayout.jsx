import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


export const NavBarProps = {
  navTitle: "Text Utilities",
  tab1: "Home",
  tab2: "About",
  tab3: "Text Filtration",
  tab4: "Timer"
};

// RootLayout is a component that serves as the main layout for the application.
// It includes a Navbar component and an Outlet for rendering nested routes.
// Outlet is a placeholder that will be replaced by the content of the current route.
// Basically the URL path will be matched with the routes defined in the App.js file, and the corresponding component will be rendered inside the Outlet.
// That component will become Outlet's child component.

function RootLayout(props) {
  return (
    <>
      <Navbar {...NavBarProps} />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
