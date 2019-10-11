import { IExtensionFeature } from "./shared/IExtensionFeature";
import { clickButton, changeVolume, toggleLockedControls } from "./actions";

/**
 * The media controls that are supported with keyboard shortcuts.
 */
const enum Action {
    Fullscreen,
    PlayPause,
    Mute,
    IncreaseVolume,
    DecreaseVolume,
    LockControls
}

interface ActionKey {
    key: string | ((ev: KeyboardEvent) => boolean);
    action: () => void;
}

/**
 * The type for mapping actions to keys.
 */
type KeyMap = {
    [P in keyof typeof Action]: string | ((ev: KeyboardEvent) => boolean);
};

/**
 * The type for mapping actions to functions that handle key events.
 */
type ActionMap = { [P in keyof typeof Action]: () => void };

const actionMap: ActionMap = {
    Fullscreen: clickButton("app-full-screen-button > div.full-screen-button"),
    PlayPause: clickButton("app-play-pause-button > div.play-pause-button"),
    Mute: clickButton("app-mute-button > div.mute-button"),
    IncreaseVolume: changeVolume(5),
    DecreaseVolume: changeVolume(-5),
    LockControls: toggleLockedControls
};

export class MediaControls implements IExtensionFeature {
    private readonly actions: ReadonlyArray<ActionKey>;

    constructor(keyMap: KeyMap) {
        this.actions = Object.entries(keyMap).map(entry => {
            const [actionName, keyMatch] = entry;

            const key =
                typeof keyMatch === "string"
                    ? (e: KeyboardEvent) => e.key === entry[1]
                    : keyMatch;

            const action = actionMap[actionName];

            return {
                key,
                action
            };
        });
    }

    onPageLoaded(): void {
        document.addEventListener("keydown", this.handleKeydown);
    }

    private handleKeydown = (e: KeyboardEvent): void => {
        this.actions
            .filter(actionKey =>
                typeof actionKey.key === "string"
                    ? e.key === actionKey.key
                    : actionKey.key(e)
            )
            .forEach(actionKey => {
                actionKey.action();
            });
    };
}
