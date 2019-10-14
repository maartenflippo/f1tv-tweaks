import { clamp } from "../shared/math";
import { defaultLogger } from "../shared/Logger";

const videoElementSelector = "#hlsjsContent";
const volumeSliderSelector = "app-volume-bar .value-bar";

/**
 * Change the volume of the video player.
 *
 * @param {Number} deltaPercentage The percentage to add to the current volume.
 * @returns {Function} When called, triggers a change in volume by the given
 * amount.
 */
export const changeVolume = deltaPercentage => () => {
    const video = document.querySelector(videoElementSelector);
    const volumeSlider = document.querySelector(volumeSliderSelector);

    if (!video) {
        defaultLogger.warn(
            `Could not find video element with selector '${videoElementSelector}'`
        );
        return;
    }

    if (!volumeSlider) {
        defaultLogger.warn(
            `Could not find volume slider element with selector '${volumeSliderSelector}'`
        );
        return;
    }

    const currentVolume = video.volume * 100;

    // Calculate the new volume, but keep it between 0 and 1.
    const newVolume = clamp(currentVolume + deltaPercentage, 0, 100);

    defaultLogger.debug(`Changing volume to ${newVolume}%`);
    video.volume = newVolume / 100;
    volumeSlider.style.width = newVolume + "%";
};
