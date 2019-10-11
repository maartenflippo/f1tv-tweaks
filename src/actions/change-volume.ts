import { clamp } from "../shared/math";

/**
 * Change the volume of the video player.
 *
 * @param deltaPercentage The percentage to add to the current volume.
 */
export const changeVolume = (deltaPercentage: number) => () => {
    const video = document.querySelector("#hlsjsContent") as HTMLVideoElement;
    const volumeSlider = document.querySelector(
        "app-volume-bar .value-bar"
    ) as HTMLElement;

    const currentVolume = video.volume;

    // Calculate the new volume, but keep it between 0 and 1.
    const newVolume = clamp(currentVolume + deltaPercentage / 100, 0, 1);

    video.volume = newVolume;
    volumeSlider.style.width = newVolume * 100 + "%";
};
