import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const signInApi = ({ username, password }) => {
  return apiWrapper(
    "post",
    `/sessions`,
    {
      username: username,
      password: password
    },
    {
      ...defaultHeaders,
      Authorization: "RHIuIExha3NobWk="
    }
  );
};

export default signInApi;
