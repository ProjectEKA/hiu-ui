import LandingPage from "./pages/LandingPage/LandingPage";
import PatientHealthInformation from "./pages/PatientHealthInfo/PatientHealthInformationContainer";
import Login from "./pages/LoginPage/LoginPageContainer";
const routes = [
  {
    component: LandingPage,
    path: "/",
    isExact: true,
    needAuth: true,
  },
  {
    component: PatientHealthInformation,
    path: "/health-info/:requestId",
    isExact: false,
    needAuth: true,
  },
  {
    component: Login,
    path: "/login",
    isExact: false,
    needAuth: false,
  },
];

export default routes;
