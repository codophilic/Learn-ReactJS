import { useReducer } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Card from './components/Card/Card';
import MyComponent from './components/MyComponent';
import MyPara from './components/MyPara/MyPara.jsx';
import Navbar from './components/Navbar';
import { MyProviderValue } from './components/store/MyContext.jsx';
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
         <MyProviderValue>
      <MyComponent>
      </MyComponent>
      </MyProviderValue>
      <div>
      <h2 style={h2Style}>Count: {state.count}</h2>
      <button style={buttonStyle} onClick={()=>countDispatch({type: 'increment'})}>+</button>
      <button style={buttonStyle} onClick={() => countDispatch({type: 'decrement'})}>-</button>
      <button style={buttonStyle} onClick={() => countDispatch({type:'reset'})}>Reset</button>
    </div>
    </Router>
    );
}

export default App;