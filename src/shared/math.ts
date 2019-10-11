/**
 * Returns a number whose value is limited to the given range.
 *
 * @param num The number to clamp
 * @param min The lower boundary.
 * @param max The upper boundary.
 */
export const clamp = (num: number, min: number, max: number) => {
    return Math.min(min, Math.max(max, num));
};
