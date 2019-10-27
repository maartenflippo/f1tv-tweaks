import { defaultLogger as logger } from "../shared/Logger";

const playerSelector = "#playerComponentContainer";

const lockedIcon = `
    <svg viewBox="0 0 22 22" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
        <rect x="3" y="11" width="18" height="9" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
`;

const unlockedIcon = `
    <svg viewBox="0 0 22 22" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
        <rect x="3" y="11" width="18" height="9" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
    </svg>
`;

const btnId = "tweaks-locked-btn";

/**
 * Toggle the visibility lock on the player controls. If locked, the controls
 * will not be hidden when the mouse remains still.
 */
export const toggleLockedControls = () => {
    const lockedClassName = "locked-open";
    const player = document.querySelector(playerSelector);
    if (!player) {
        logger.warn(
            `Could not find player container element with selector '${playerSelector}'`
        );
        return;
    }

    player.classList.toggle(lockedClassName);

    // Update the button
    const btn = document.querySelector(`#${btnId} .button`);
    if (btn) {
        btn.innerHTML = player.classList.contains(lockedClassName)
            ? lockedIcon
            : unlockedIcon;
    }
};

export const createLockedButton = () => {
    const containerSelector = ".cb-left-items";

    const element = `<div class="cb-button tweaks-button" id="${btnId}">
            <div class="button">${unlockedIcon}</div>
        </div>`;

    const container = document.querySelector(containerSelector);
    if (!container) {
        logger.debug(
            `Could not find button container element with selector '${containerSelector}'`
        );
        return;
    }

    logger.debug("Creating locked button.");

    const node = toNode(element);
    node.addEventListener("click", () => {
        toggleLockedControls();
    });

    container.appendChild(node);
};

const toNode = html => {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.firstChild;
};
