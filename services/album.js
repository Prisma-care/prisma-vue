import axios from 'axios';
import { baseURL } from '~/config';

/**
 * Main URL for API access.
 */
const URL = `${baseURL}/album`;

/**
 * Service for interaction with albums.
 */
const albumService = {

  /**
   * Get albums from the list.
   *
   * @returns {object}
   */
  getAlbums() {
    return axios.get(URL);
  },
};

export default albumService;
