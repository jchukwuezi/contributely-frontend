import {Route, Routes} from 'react-router-dom'
import OrgRegister from './components/shared/register/OrgRegister'
import OrgLogin from './components/shared/login/OrgLogin'
import OrgHomepage from './components/organisation/homepage/OrgHomepage';
import DonorRegister from './components/shared/register/DonorRegister';
import DonorLogin from './components/shared/login/DonorLogin';
import LandingPage from './components/shared/landing-page/LandingPage';
import InputInterests from './components/donor/input-interest/InputInterest'
import DonorHomepage from './components/donor/homepage/DonorHomepage';


function App() {
  return (
    <div>
      <Routes>
      <Route exact path="/" element={<LandingPage/>}/>   
      <Route path="/org/register" element={<OrgRegister/>}/>       
      <Route path="/org/login" element={<OrgLogin/>}/>
      <Route path="/org/homepage" element={<OrgHomepage/>}/>
      <Route path="/donor/register" element={<DonorRegister/>}/>
      <Route path="/donor/login" element={<DonorLogin/>}/>
      <Route path="/donor/input-interest" element={<InputInterests/>}/>
      <Route path="donor/homepage" element={<DonorHomepage/>}/>
      </Routes>
    </div>
  );
}

export default App;
