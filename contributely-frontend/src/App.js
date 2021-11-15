import {Route, Routes} from 'react-router-dom'
import {Register} from './components/register/Register'
import {Login} from './components/login/Login'



function App() {
  


  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register/>}/>       
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
