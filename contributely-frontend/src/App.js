import {Route, Routes} from 'react-router-dom'
import OrgRegister from './components/shared/register/OrgRegister'
import OrgLogin from './components/shared/login/OrgLogin'
import OrgHomepage from './components/organisation/homepage/OrgHomepage';
import DonorRegister from './components/shared/register/DonorRegister';
import DonorLogin from './components/shared/login/DonorLogin';
import LandingPage from './components/shared/landing-page/LandingPage';
import DonorHomepage from './components/donor/homepage/DonorHomepage';
import AccountTab from './components/donor/account/AccountTab';
import AddInitiative from './components/organisation/intiative/AddInitiative';
import FailureOnboard from './components/organisation/stripe-onboard/FailureOnboard';
import StripeRedirect from './components/organisation/stripe-onboard/StripeRedirect';
import SuccessOnBoard from './components/organisation/stripe-onboard/SuccessOnBoard';
import Groups from './components/donor/causes/contributely-causes/Groups';
import GroupInitiativeDetail from './components/donor/causes/contributely-causes/GroupInitiativedDetail';
import GroupInitiatives from './components/donor/causes/contributely-causes/GroupInitiatives';
import AllInitiatives from './components/organisation/intiative/AllInitiatives';
import InitiativeDetails from './components/organisation/intiative/InitiativeDetails';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import DonationPdf from './components/donor/causes/contributely-causes/DonationPdf';
import GroupCodeInitiativeDetail from './components/donor/causes/contributely-causes/no-auth-required/GroupCodeInitiativeDetail';
import GroupCodeInitiatives from './components/donor/causes/contributely-causes/no-auth-required/GroupCodeInitiatives';
import {PDFViewer} from '@react-pdf/renderer'
import OrgDashboard from './components/organisation/dashboard/OrgDashboard';
import DonorDashboard from './components/donor/dashboard/DonorDashboard'

const stripePromise = loadStripe("pk_test_51KKuOdJ7ft6dkEBZBzzUOfBBNunxjWTLiRwrf8k19BcgKdqdKX2frTznZIHJucooD9jps1JFmnwMTd4ZNlJ1EFTH00FIDwe1x8")

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
        <Route path="/donor/homepage" element={<DonorHomepage/>}/>
        <Route path="/donor/account" element={<AccountTab/>}/>
        <Route path="/donor/dashboard" element={<DonorDashboard/>}/>
        <Route path="/org/initiative/add" element={<AddInitiative/>}/>
        <Route path="/org/stripe/onboard/success" element={<SuccessOnBoard/>}/>
        <Route path="/org/stripe/onboard/failure" element={<FailureOnboard/>}/>
        <Route path="/org/initiatives" element={<AllInitiatives/>}/>
        <Route path="/org/dashboard" element={<OrgDashboard/>}/>
        <Route path="/org/initiatives/:initiativeId" element={<InitiativeDetails/>}/>
        <Route path="/donor/groups" element={<Groups/>}/>
        <Route path="/donor/:groupId/initiatives" element={<GroupInitiatives/>}/>
        <Route path="/contributely/:groupCode/initiatives" element={<GroupCodeInitiatives/>}/>
        <Route path="/donor/:groupId/initiatives/:initiativeId" element={
          <Elements stripe={stripePromise}>
            <GroupInitiativeDetail/>
          </Elements>      
        }/>
        <Route path="/contributely/:groupCode/initiatives/:initiativeId" element={
          <Elements stripe={stripePromise}>
            <GroupCodeInitiativeDetail/>
          </Elements>      
        }/>
        <Route path="/donation-pdf" element={<DonationPdf/>}/>
      </Routes>
    </div>
  );
}

export default App;
