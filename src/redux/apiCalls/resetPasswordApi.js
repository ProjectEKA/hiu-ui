import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const resetPasswordApi = ({ oldPassword, newPassword }) => {
  const authToken = localStorage.getItem("auth-token");
  return apiWrapper(
    "put",
    `/users/password`,
    {
      oldPassword: oldPassword,
      newPassword: newPassword,
    },
    {
      ...defaultHeaders,
      Authorization: authToken,
    }
  );
};

export default resetPasswordApi;
