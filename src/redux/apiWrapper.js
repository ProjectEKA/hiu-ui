import axios from 'axios';
import { defaultHeaders } from '../constants';

export default (
  method,
  url,
  data,
  headers = defaultHeaders,
  baseURL = BACKEND_BASE_URL + BACKEND_API_PATH,
) => axios({
  headers,
  method,
  data,
  url,
  baseURL,
});
