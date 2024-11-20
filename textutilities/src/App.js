import React from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextInput from './components/TextInput';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextFilters from './components/TextFilters';
import Timer from './components/Timer';

function App() {
  return (
    <Router>
      <Navbar navTitle="Text Utilities" tab1="Home" tab2="About" tab3="Text Filtration" tab4="Timer"/>
      <div className="container">
        <Routes>
          <Route path="/" element={<TextInput />} />
          <Route path="/about" element={<About />} />
          <Route path="/filter" element={<TextFilters />} />
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
