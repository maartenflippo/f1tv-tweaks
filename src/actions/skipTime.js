import { clamp } from "../shared/math";
import { defaultLogger } from "../shared/Logger";

const videoElementSelector = "#hlsjsContent";

/**
 * Skip around video in the player.
 */
export const skip = skipAmount => () => {
    const video = document.querySelector(videoElementSelector);

    if (!video) {
        defaultLogger.warn(
            `Could not find video element with selector '${videoElementSelector}'`
        );
        return;
    }

    video.currentTime += skipAmount;
};
