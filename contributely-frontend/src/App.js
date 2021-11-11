import React from "react";
import {Route, Routes} from 'react-router-dom'
import {Register} from './components/register/Register'
import {Login} from './components/login/Login'


function App() {
  return (
    <div>
      <h1>Main Page Test</h1>


      <Routes>
        <Route exact path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>

    </div>
  );
}

export default App;
