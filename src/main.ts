import { defaultLogger as logger } from "./shared/Logger";
import { MediaControls } from "./MediaControls";

logger.info("Starting...");

const mediaControls = new MediaControls({
    DecreaseVolume: "ArrowDown",
    IncreaseVolume: "ArrowUp",
    Fullscreen: "f",
    LockControls: "l",
    Mute: "m",
    PlayPause: " "
});

mediaControls.onPageLoaded();

logger.info("Finished initializing");
