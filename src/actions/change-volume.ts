import { clamp } from "../shared/math";
import { defaultLogger } from "../shared/Logger";

const videoElementSelector = "#hlsjsContent";
const volumeSliderSelector = "app-volume-bar .value-bar";

/**
 * Change the volume of the video player.
 *
 * @param deltaPercentage The percentage to add to the current volume.
 */
export const changeVolume = (deltaPercentage: number) => () => {
    const video = document.querySelector(
        videoElementSelector
    ) as HTMLVideoElement;
    const volumeSlider = document.querySelector(
        volumeSliderSelector
    ) as HTMLElement;

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

    const currentVolume = video.volume;

    // Calculate the new volume, but keep it between 0 and 1.
    const newVolume = clamp(currentVolume + deltaPercentage / 100, 0, 1);

    defaultLogger.debug(`Changing volume to ${newVolume * 100}%`);
    video.volume = newVolume;
    volumeSlider.style.width = newVolume * 100 + "%";
};
