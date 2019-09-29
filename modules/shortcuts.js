(document => {
    const clickButton = selector => () => {
        const element = document.querySelector(selector);

        if (element) {
            element.click();
        }
    };

    const keyMap = {
        f: clickButton("app-full-screen-button > div.full-screen-button"),
        " ": clickButton("app-play-pause-button > div.play-pause-button"),
        m: clickButton("app-mute-button > div.mute-button")
    };

    document.addEventListener("keypress", e => {
        if (e.key in keyMap) {
            e.preventDefault();
            keyMap[e.key]();
        }
    });
})(document);
