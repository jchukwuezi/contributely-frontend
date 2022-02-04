import {Route, Routes} from 'react-router-dom'
import OrgRegister from './components/shared/register/OrgRegister'
import OrgLogin from './components/shared/login/OrgLogin'
import OrgHomepage from './components/organisation/homepage/OrgHomepage';
import DonorRegister from './components/shared/register/DonorRegister';
import DonorLogin from './components/shared/login/DonorLogin';
import LandingPage from './components/shared/landing-page/LandingPage';
import DonorHomepage from './components/donor/homepage/DonorHomepage';
import InterestInput from './components/donor/input-interest/InputInterest';
import AccountTab from './components/donor/account/AccountTab';
import AddInitiative from './components/organisation/intiative/AddInitiative';


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
      <Route path="/donor/input-interest" element={<InterestInput/>}/>
      <Route path="/donor/homepage" element={<DonorHomepage/>}/>
      <Route path="/donor/account" element={<AccountTab/>}/>
      <Route path="/org/initiative/add" element={<AddInitiative/>}/>
      </Routes>
    </div>
  );
}

export default App;
