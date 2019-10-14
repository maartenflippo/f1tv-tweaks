import { defaultLogger } from "../shared/Logger";

/**
 * Click a html element on the page.
 *
 * @param {String} selector The html element to click.
 * @returns {Function} When called, triggers a click event on the element with
 * the given selector.
 */
export const clickButton = selector => () => {
    const element = document.querySelector(selector);

    if (element) {
        defaultLogger.debug(`Clicking ${element}`);
        element.click();
    } else {
        defaultLogger.warn(
            `Could not find an element with selector '${selector}'`
        );
    }
};
