import { defaultLogger } from "../shared/Logger";

/**
 * Click a html element on the page.
 *
 * @param selector The html element to click.
 */
export const clickButton = (selector: string) => () => {
    const element = document.querySelector(selector) as HTMLElement;

    if (element) {
        defaultLogger.debug(`Clicking ${element}`);
        element.click();
    } else {
        defaultLogger.warn(
            `Could not find an element with selector '${selector}'`
        );
    }
};
