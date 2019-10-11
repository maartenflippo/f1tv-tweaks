import { defaultLogger } from "../shared/Logger";

const playerSelector = "#playerComponentContainer";

/**
 * Toggle the visibility lock on the player controls. If locked, the controls
 * will not be hidden when the mouse remains still.
 */
export const toggleLockedControls = () => {
    const player = document.querySelector(playerSelector);
    if (!player) {
        defaultLogger.warn(
            `Could not find player container element with selector '${playerSelector}'`
        );
        return;
    }

    player.classList.toggle("locked-open");
};
