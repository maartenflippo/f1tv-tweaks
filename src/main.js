import { defaultLogger as logger } from "./shared/Logger";
import {
    clickButton,
    toggleLockedControls,
    createLockedButton,
    changeVolume,
    moveTitle,
    channelPicker,
    ChannelPickerisFocus,
    skip
} from "./actions/index";

let rendered = false;

/**
 * Verify whether the F1TV page has been rendered.
 */
/*
const checkPageRendered = () => {
    logger.debug("Checking rendered status of page.");
    if (!!document.querySelector("#playerComponentContainer") && !rendered) {
        rendered = true;
        createLockedButton();
        logger.info("Page rendered");
    }
};
*/
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
    skipFiveBack: "ArrowLeft"
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
    [actionMap.lockControls]: toggleLockedControls,
    [actionMap.channelPicker]: channelPicker,
    [actionMap.skipFiveForward]: skip(5),
    [actionMap.skipFiveBack]: skip(-5),
    [actionMap.lockControls]: toggleLockedControls
};

document.addEventListener("keydown", e => {
    if (e.key in keyMap) {
        if (ChannelPickerisFocus()) {
            return;
        }
        e.preventDefault();
        keyMap[e.key]();
    }
});

moveTitle();

/*
const pageMutationObserver = new MutationObserver(mutations => {
    checkPageRendered();
});

pageMutationObserver.observe(document.querySelector("#root"), {
    subtree: true,
    childList: true
});
*/
logger.info("Started");
