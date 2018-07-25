import axios from 'axios';
import {
  baseURL
} from '~/config';

/**
 * Main URL for API access.
 */
const URL = `${baseURL}/patient`;

/**
 * Service for interaction with stories.
 */
const StoryService = {

  /**
   * Adds an image to an existing story.
   *
   * @param {number} patientId
   * @param {number} storyId
   * @param {string} image
   * @returns {number}
   */
  addImageToStory(patientId, storyId, image) {
    return axios.post(`${URL}/${patientId}/story/${storyId}/asset`, new FormData().append('asset', image));
  },

  /**
   * Adds a story to the user's story list.
   *
   * @param {number} patientId
   * @param {object} body
   * @returns {object}
   */
  addStory(patientId, body) {
    return axios.post(`${URL}/${patientId}/story`, body);
  },

  /**
   * Deletes a story to the user's story list.
   *
   * @param {number} patientId
   * @param {number} storyId
   * @returns {object}
   */
  deleteStory(patientId, storyId) {
    return axios.delete(`${URL}/${patientId}/story/${storyId}`);
  },

  /**
   * Edits a story to the user's story list.
   *
   * @param {number} patientId
   * @param {number} storyId
   * @param {object} body
   * @returns {object}
   */
  editStory(patientId, storyId, body) {
    return axios.patch(`${URL}/${patientId}/story/${storyId}`, body);
  },

  /**
   * Get stories from the user's story list.
   *
   * @param {number} patientId
   * @returns {object}
   */
  async getStories(patientId) {
    return await axios.get(`${URL}/${patientId}/album`);
  },
};

export default StoryService;
