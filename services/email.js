import axios from 'axios';
import { baseURL } from '~/config';

/**
 * Main URL for API access.
 */
const URL = `${baseURL}/sendPictureInvitation`;

/**
 * Service for interaction with emails.
 */
const emailService = {

  /**
   * Sent email.
   *
   * @returns {object}
   */
  sendEmail(emailData) {
    return axios.post(URL, emailData);
  },
};

export default emailService;
