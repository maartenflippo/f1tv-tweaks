/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {Number} num The number to clamp
 * @param {Number} min The lower boundary.
 * @param {Number} max The upper boundary.
 * @returns {Number}
 */
export const clamp = (num, min, max) => {
    return Math.max(min, Math.min(max, num));
};
