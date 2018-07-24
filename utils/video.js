/**
 * Gets the YouTube identifier.
 *
 * @param {string} url
 * @returns {number}
 */
const VideoUtils = {

  /**
   * Gets the YouTube identifier
   *
   * @param {string} url
   * @returns {string}
   */
  getYouTubeID(url) {
    const match = /v=(\w*)$/.exec(url);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  },

  /**
   * Gets the YouTube thumbnail
   *
   * @param {string} url
   * @returns {string}
   */
  getYouTubeThumb(url) {
    const youtubeId = this.getYouTubeID(url);
    if (youtubeId) {
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    } else {
      return null;
    }
  },
};

export default VideoUtils;
