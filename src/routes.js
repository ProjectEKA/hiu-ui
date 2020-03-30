import RequestAccess from "./pages/RequestAccess/RequestAccessContainer";
import LandingPage from "./pages/LandingPage/LandingPage";
import ConsentLog from "./components/ConsentsListTable/LoadConsentsContainer";
import PatientHealthInformation from "./pages/PatientHealthInfo/PatientHealthInformationContainer";
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
  }
];

export default routes;
