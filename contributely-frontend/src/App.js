import {Route, Routes} from 'react-router-dom'
import {Register} from './components/register/Register'
import {Login} from './components/login/Login'
import DonorRegister from './components/donor-components/donor-register/DonorRegister';
import DonorLogin from './components/donor-components/donor-login/DonorLogin';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register/>}/>       
        <Route path="/login" element={<Login/>}/>
        <Route path="/donor-register" element={<DonorRegister/>}/>
        <Route path="/donor-login" element={<DonorLogin/>}/>
      </Routes>
    </div>
  );
}

export default App;
