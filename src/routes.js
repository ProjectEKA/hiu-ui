import RequestAccess from "./pages/RequestAccess/RequestAccessContainer";
import PatientView from "Components/PatientView/PatientView";
import ConsentLog from "Components/ConsentLog/ConsentLog";
const routes = [
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
