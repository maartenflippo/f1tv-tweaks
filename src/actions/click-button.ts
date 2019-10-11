/**
 * Click a html element on the page.
 *
 * @param selector The html element to click.
 */
export const clickButton = (selector: string) => () => {
    const element = document.querySelector(selector) as HTMLElement;

    if (element) {
        element.click();
    }
};
