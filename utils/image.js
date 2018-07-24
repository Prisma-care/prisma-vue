/**
 * Converts an array buffer to data URL.
 *
 * @param {array} buffer
 * @param {string} type
 * @returns {string}
 */
export default (buffer, type) => {
  const base64 = btoa(
    [].reduce.call(new Uint8Array(buffer), (p, c) => p + String.fromCharCode(c), '')
  );
  return `data:${type};base64,${base64}`;
};
