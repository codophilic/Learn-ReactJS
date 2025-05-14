import React from 'react';
import ChildComponentOfMyComponent from './components/ChildComponentOfMyComponent.jsx';
import MyComponent from './components/MyComponent';
import { MyContext } from './components/store/MyContext.jsx';
function App() {

  function onClickHandler() {
    console.log('Function handler called!');
  }
  return (
    <MyContext.Provider value={{ items: ['Item 1', 'Item 2', 'Item 3'] }}> 
      <MyComponent>
      </MyComponent> 
    </MyContext.Provider>
  );
}

export default App;