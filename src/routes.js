import RequestAccess from "./pages/RequestAccess/RequestAccessContainer";
import LandingPage from "./pages/LandingPage/LandingPage";
import PatientView from "./pages/PatientView/PatientView";
import ConsentLog from "./components/ConsentsListTable/LoadConsentsContainer";
import PatientHealthInformation from "./pages/PatientHealthInfo/PatientHealthInformationContainer";
const routes = [
  {
    component: LandingPage,
    path: "/",
    isExact: true
  },
  {
    component: RequestAccess,
    path: "/request-access",
    isExact: false
  },
  {
    component: PatientView,
    path: "/patient-view/:id",
    isExact: false
  },
  {
    component: ConsentLog,
    path: "/consent-log",
    isExact: false
  },
  {
    component: PatientHealthInformation,
    path: "/health-info/:requestId",
    isExact: false
  }
];

export default routes;
