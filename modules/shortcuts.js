(document => {
    const changeVolume = deltaPercentage => () => {
        const video = document.querySelector("#hlsjsContent");
        const volumeSlider = document.querySelector(
            "app-volume-bar .value-bar"
        );

        const currentVolume = video.volume;
        let newVolume = currentVolume + deltaPercentage / 100;
        if (newVolume < 0) {
            newVolume = 0;
        } else if (newVolume > 1) {
            newVolume = 1;
        }

        video.volume = newVolume;
        volumeSlider.style.width = newVolume * 100 + "%";
    };

    const clickButton = selector => () => {
        const element = document.querySelector(selector);

        if (element) {
            element.click();
        }
    };

    const keyMap = {
        f: clickButton("app-full-screen-button > div.full-screen-button"),
        " ": clickButton("app-play-pause-button > div.play-pause-button"),
        m: clickButton("app-mute-button > div.mute-button"),
        ArrowUp: changeVolume(5),
        ArrowDown: changeVolume(-5)
    };

    document.addEventListener("keydown", e => {
        if (e.key in keyMap) {
            e.preventDefault();
            keyMap[e.key]();
        }
    });
})(document);
