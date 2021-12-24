import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/Navbar/NavbarComp';


function App() {
  console.log(window.log)
  return (
    <div className="App">
        <NavbarComp/>
    </div>
  );
}

export default App;
