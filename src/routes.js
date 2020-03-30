import RequestAccess from "./pages/RequestAccess/RequestAccessContainer";
import LandingPage from "./pages/LandingPage/LandingPageContainer";
import ConsentLog from "./components/ConsentsListTable/LoadConsentsContainer";
import PatientHealthInformation from "./pages/PatientHealthInfo/PatientHealthInformationContainer";
import Login from "./pages/LoginPage/LoginPage";
const routes = [
  {
    component: LandingPage,
    path: "/",
    isExact: true
  },
  {
    component: PatientHealthInformation,
    path: "/health-info/:requestId",
    isExact: false
  },
  {
    component: Login,
    path: "/login",
    isExact: false
  }
];

export default routes;
