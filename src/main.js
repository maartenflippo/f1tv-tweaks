import { defaultLogger as logger } from "./shared/Logger";
import {
    clickButton,
    toggleLockedControls,
    createLockedButton,
    changeVolume,
    channelPicker,
    ChannelPickerisFocus,
    skip,
} from "./actions/index";

/**
 * Verify whether the F1TV page has been rendered.
 */
const checkPageRendered = () => {
    logger.debug("Checking rendered status of page.");
    if (!!document.querySelector("#playerComponentContainer")) {
        createLockedButton();
        logger.info("Page rendered");
    }
};

logger.info("Starting...");

const actionMap = {
    playPause: " ",
    fullscreen: "f",
    mute: "m",
    increaseVolume: "ArrowUp",
    decreaseVolume: "ArrowDown",
    lockControls: "l",
    channelPicker: "d",
    skipFiveForward: "ArrowRight",
    skipFiveBack: "ArrowLeft",
};

const playPause = clickButton("app-play-pause-button > div.play-pause-button");

const keyMap = {
    [actionMap.fullscreen]: clickButton(
        "app-full-screen-button > div.full-screen-button"
    ),
    [actionMap.playPause]: playPause,
    [actionMap.mute]: clickButton("app-mute-button > div.mute-button"),
    [actionMap.increaseVolume]: changeVolume(5),
    [actionMap.decreaseVolume]: changeVolume(-5),
    [actionMap.skipFiveForward]: skip(5),
    [actionMap.skipFiveBack]: skip(-5),
    [actionMap.channelPicker]: channelPicker,
    [actionMap.lockControls]: toggleLockedControls,
};

document.addEventListener("keydown", (e) => {
    if (e.key in keyMap) {
        if (ChannelPickerisFocus()) {
            return;
        }
        e.preventDefault();
        keyMap[e.key]();
    }
});

const pageMutationObserver = new MutationObserver((mutations) => {
    checkPageRendered();
});

pageMutationObserver.observe(document.querySelector("#root"), {
    subtree: true,
    childList: true,
});

logger.info("Started");
