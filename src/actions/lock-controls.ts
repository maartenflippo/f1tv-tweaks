/**
 * Toggle the visibility lock on the player controls. If locked, the controls
 * will not be hidden when the mouse remains still.
 */
const toggleLockedControls = () => {
    const player = document.querySelector("#playerComponentContainer");
    if (!player) return;

    player.classList.toggle("locked-open");
};
