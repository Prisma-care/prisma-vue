import axios from 'axios';

import {
  baseURL
} from '~/config';


const URL = `${baseURL}/album`;

const albumService = {
  getAlbums() {
    return axios.get(URL)
  }

}


export default albumService;
