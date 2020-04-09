import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";
import getCookie from "./cookies/get_cookie";

const signInApi = ({ userName, password }) => {
  const authToken = getCookie("auth-token");
  return apiWrapper(
    "post",
    `/sessions`,
    {
      username: userName,
      password: password,
    },
    {
      ...defaultHeaders,
      Authorization: authToken,
    }
  );
};

export default signInApi;
