import React from 'react';
import './App.css';

function MyDiv({customAttribute, ...rest}){
  return (
    <div {...rest}>
      <h1>{customAttribute}</h1>
      <h1>Hello World!</h1>
    </div>
  );

}

function App() {
  return (
    <MyDiv id="new-div" className="App" style={{  color: 'blue', textAlign: 'center', marginTop: '50px' }} customAttribute="customValue">
      </MyDiv>
  );
}

export default App;
