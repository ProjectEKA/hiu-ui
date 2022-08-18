import axios from 'axios';
import { defaultHeaders } from '../constants';
import Config from "../Config";

export default (
  method,
  url,
  data,
  headers = defaultHeaders,
  baseURL = Config.BACKEND_BASE_URL + Config.BACKEND_API_PATH,
) => axios({
  headers,
  method,
  data,
  url,
  baseURL,
});
