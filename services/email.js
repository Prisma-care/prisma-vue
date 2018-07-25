import axios from 'axios';

import {
  baseURL
} from '~/config';


const URL = `${baseURL}/sendPictureInvitation`;

const emailService = {
  sendEmail(emailData) {
    return axios.post(URL, emailData)
  }

}


export default emailService;
