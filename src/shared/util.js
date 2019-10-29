

/**
 * Checks if an element with the given selector exists
 * 
 * @param {String} selector 
 * @returns {Boolean}
 */
export const exists = selector => {
    return document.querySelector(selector)
    ? true
    : false;
}

/**
 * Checks if an element exists with the given selector
 * 
 * @param {String} selector 
 * @returns {Object | Boolean} if true the element from the selector 
 */
export const returnExists = selector => {
    return document.querySelector(selector) !== undefined
    ? document.querySelector(selector)
    : false;
    
}