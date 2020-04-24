import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const signInApi = ({ userName, password }) => apiWrapper(
  'post',
  '/sessions',
  {
    username: userName,
    password,
  },
  {
    ...defaultHeaders,
  },
);

export default signInApi;
