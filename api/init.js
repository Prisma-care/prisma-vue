import axios from 'axios';
import {
  baseURL
} from '~/config';
import cookies from 'js-cookie';
import authToken from '../utils/auth';

axios.defaults.baseURL = baseURL;

const token = cookies.get('authToken')

authToken(token)
