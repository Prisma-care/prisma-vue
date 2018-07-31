import axios from 'axios';
import { baseURL } from '~/config';
import cookies from 'js-cookie';
import authToken from '../utils/setAuthentication';

axios.defaults.baseURL = baseURL;
authToken(cookies.get('authToken'));
