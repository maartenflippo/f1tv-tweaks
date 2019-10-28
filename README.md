# F1TV Tweaks

This extension is developed to counter small annoyances with the F1TV streaming page. It adds keyboard shortcuts to manage media playback and modifies the page layout to increase the size of the player to be as large as possible.

## UI Changes
This extension alter the UI of the replay/streaming page in a number of ways. The primary change is the size of the video feed. It is maximized to take up all space not required for the camera selection and video controls/title.

The extension also adds some buttons to the page to add more functionality to the player:
* A lock: Allows the user to lock the video controls so they won't disappear when the mouse is not being moved.

## Shortcuts
The extension provides the following shortcuts to manage the web player:

| Key | Action |
|-----|--------|
|`f`|Toggle fullscreen|
|`space`| Toggle play/pause |
|`m`|Toggle mute|
|`up arrow`|Increase volume|
|`down arrow`|Decrease volume|
|`right arrow`|Skip forward 5 seconds|
|`left arrow`|Skip backward 5 seconds|
|`l`|Lock video controls as visible|

## Todo
 - [ ] Select camera view from sidebar with shortcut
 - [ ] Configurable key map
 - [x] Different page layout

# Build & Run
If you have the repository cloned, run `npm install` to install the project dependencies.

Then, the command
 * `npm run build` will build a submittable ZIP file from the source.
 * `npm run dev` will run rollup in watch mode.

## License
This code is licensed under the MIT license.