import {Route, Routes} from 'react-router-dom'
import {Register} from './components/register/Register'
import {Login} from './components/login/Login'
import DonorRegister from './components/donor-components/donor-register/DonorRegister';
import DonorLogin from './components/donor-components/donor-login/DonorLogin';
import LandingPage from './components/landing-page/LandingPage';
import InputInterests from './components/donor-components/donor-input-interest/InputInterest'
import DonorHomepage from './components/donor-components/donor-homepage/DonorHomepage';


function App() {
  return (
    <div>
      <Routes>
      <Route exact path="/" element={<LandingPage/>}/>   
      <Route path="/org/register" element={<Register/>}/>       
      <Route path="/org/login" element={<Login/>}/>
      <Route path="/donor/register" element={<DonorRegister/>}/>
      <Route path="/donor/login" element={<DonorLogin/>}/>
      <Route path="/donor/input-interest" element={<InputInterests/>}/>
      <Route path="donor/homepage" element={<DonorHomepage/>}/>
      </Routes>
    </div>
  );
}

export default App;
