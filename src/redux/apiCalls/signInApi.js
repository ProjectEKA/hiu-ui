import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const signInApi = ({ userName, password }) => {
  return apiWrapper(
    "post",
    `/sessions`,
    {
      username: userName,
      password: password,
    },
    {
      ...defaultHeaders,
    }
  );
};

export default signInApi;
