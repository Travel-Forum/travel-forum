/**
 * Hint under a text field: how many characters are still missing, or
 * "length/max" once the minimum is reached.
 * @param {string} value
 * @param {number} min
 * @param {number} max
 * @returns {string}
 */
export const getLengthHint = (value, min, max) => {
  const length = value.trim().length;
  const missing = min - length;

  if (missing > 0) {
    return `${missing} more ${missing === 1 ? "character" : "characters"} needed (min ${min})`;
  }
  return `${length}/${max}`;
};
