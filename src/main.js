import { defaultLogger as logger } from "./shared/Logger";
import {
    clickButton,
    toggleLockedControls,
    changeVolume,
    moveTitle
} from "./actions/index";

logger.info("Starting...");

const actionMap = {
    playPause: " ",
    fullscreen: "f",
    mute: "m",
    increaseVolume: "ArrowUp",
    decreaseVolume: "ArrowDown",
    lockControls: "l"
};

const keyMap = {
    [actionMap.fullscreen]: clickButton(
        "app-full-screen-button > div.full-screen-button"
    ),
    [actionMap.playPause]: clickButton(
        "app-play-pause-button > div.play-pause-button"
    ),
    [actionMap.mute]: clickButton("app-mute-button > div.mute-button"),
    [actionMap.increaseVolume]: changeVolume(5),
    [actionMap.decreaseVolume]: changeVolume(-5),
    [actionMap.lockControls]: toggleLockedControls
};

document.addEventListener("keydown", e => {
    if (e.key in keyMap) {
        e.preventDefault();
        keyMap[e.key]();
    }
});

moveTitle();

logger.info("Started");
