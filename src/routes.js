import RequestAccess from "./pages/RequestAccess/RequestAccessContainer";
import LandingPage from "./pages/LandingPage/LandingPage";
import PatientView from "Components/PatientView/PatientView";
import ConsentLog from "Components/ConsentLog/ConsentLog";
const routes = [
  {
    component: LandingPage,
    path: '/'
  },
  {
    component: RequestAccess,
    path: "/request-access"
  },
  {
    component: PatientView,
    path: "/patient-view"
  },
  {
    component: ConsentLog,
    path: "/consent-log"
  }
];

export default routes;
