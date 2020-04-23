import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const resetPasswordApi = ({ oldPassword, confirmPassword }) => {
  const authToken = localStorage.getItem('auth-token');
  return apiWrapper(
    'put',
    '/users/password',
    {
      oldPassword,
      newPassword: confirmPassword,
    },
    {
      ...defaultHeaders,
      Authorization: authToken,
    },
  );
};

export default resetPasswordApi;
