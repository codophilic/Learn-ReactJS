import './App.css';
import About from './components/About';
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
