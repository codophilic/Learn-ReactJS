import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Card from './components/Card/Card';
import MyPara from './components/MyPara/MyPara.jsx';
import Navbar from './components/Navbar';
import TextFilters from './components/TextFilters';
import TextInput from './components/TextInput';
import Timer from './components/Timer';

export const NavBarProps = {
  navTitle: "Text Utilities",
  tab1: "Home",
  tab2: "About",
  tab3: "Text Filtration",
  tab4: "Timer"
};

function App() {
  return (
    <Router>
      <Navbar {...NavBarProps}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<TextInput />} />
          <Route path="/about" element={<About />} />
          <Route path="/filter" element={<TextFilters />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </div>
      <div>
      <Card name="Harsh Pandya">
        <p>
          Learning React and building a text utility app.
        </p>
        <p>
          <a href="mailto:blake@example.com">Email Harsh</a>
        </p>
         </Card>
         </div>
         <MyPara/>
    </Router>
    
  );
}

export default App;