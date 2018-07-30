import axios from 'axios';
import {
  baseURL
} from '~/config';

/**
 * Main URL for API access.
 */
const URL = `${baseURL}/patient`;

/**
 * Service for interaction with albums.
 */
const albumService = {

  /**
   * Get albums from the list.
   *
   * @returns {object}
   */
  getAlbums(patientId) {
    return axios.get(`${URL}/${patientId}/album`);
  },
};

export default albumService;
