import { defaultLogger as logger } from "../shared/Logger";

/**
 * Moves the title of the feed to the top of the video player, and mutates its
 * visibility based on the visibility of the controls.
 */
export const moveTitle = () => {
    /**
     * Watch out if the players UI is hiding or not and change the current camera
     * overlay too.
     */
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.target.id === "playerComponentContainer") {
                const elem = document.querySelector(".z3lAg");
                if (!elem) {
                    logger.warn("Could not find title element.");
                    return;
                }

                // If the controls are locked
                if (mutation.target.classList.contains("locked-open")) {
                    elem.classList.remove("hidden");
                    return;
                }

                logger.debug("Toggling visibility of title.");
                mutation.target.classList.length > 1
                    ? elem.classList.add("hidden")
                    : elem.classList.remove("hidden");
            }
        });
    });

    mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeOldValue: true,
        subtree: true,
        attributeFilter: ["class"]
    });
};
