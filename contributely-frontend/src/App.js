import {Route, Routes} from 'react-router-dom'
import {Register} from './components/register/Register'
import {Login} from './components/login/Login'
import DonorRegister from './components/donor-components/donor-register/DonorRegister';
import DonorLogin from './components/donor-components/donor-login/DonorLogin';
import Homepage from './components/homepage/Homepage';
import InputInterests from './components/donor-components/donor-input-interest/InputInterest'


function App() {
  return (
    <div>
      <Routes>
      <Route exact path="/" element={<Homepage/>}/>   
      <Route path="/register" element={<Register/>}/>       
      <Route path="/login" element={<Login/>}/>
      <Route path="/donor-register" element={<DonorRegister/>}/>
      <Route path="/donor-login" element={<DonorLogin/>}/>
      <Route path="input-interest" element={<InputInterests/>}/>
      </Routes>
    </div>
  );
}

export default App;
