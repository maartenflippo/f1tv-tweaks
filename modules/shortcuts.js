(document => {
    const driverPicker = () => {
        if (
            document.querySelector(
                "#playerComponentContainer > .searchContainer"
            )
        )
            return;
        const player = document.querySelector("#playerComponentContainer");
        let searchContainer = document.createElement("div");
        searchContainer.className = "searchContainer";
        let searchBar = document.createElement("input");
        searchContainer.setAttribute("csearchIdx", 0);
        searchBar.className = "driverPicker";
        searchBar.type = "text";
        searchBar.placeholder = "Driver / Channel";
        searchContainer.append(searchBar);
        player.append(searchContainer);
        searchBar.focus();
        searchBar.addEventListener("focusout", _ => {
            if (!searchBar) return;
            //searchContainer.remove();
        });
        searchBar.addEventListener("keydown", e => {
            if (e.key == "Enter") {
                searchBar.blur();
            } else if (e.key == "Escape") {
                searchBar.blur();
            }

            switch (e.key) {
                case "Enter":
                    selectCurrent();
                    searchBar.blur();
                    break;
                case "Escape":
                    searchBar.blur();
                    break;
                case "ArrowUp":
                    prevSearchFocus();
                    break;
                case "ArrowDown":
                    nextSearchFocus();
                    break;
            }
        });
        searchBar.addEventListener("input", _ => {
            getSearchResults(searchBar.value);
        });
    };

    const getSearchResults = input => {
        const filter = input.toUpperCase();

        const channels = document.querySelectorAll(
            "._2c4vB > .content-wrapper > .content-wrapper__inner > :last-child > :last-child [role=listitem] > button"
        );
        const container = document.querySelector(
            "#playerComponentContainer > .searchContainer"
        );
        let ul = container.querySelector(".channelList");
        if (ul) {
            ul.remove();
        }
        ul = document.createElement("ul");
        ul.className = "channelList";
        container.append(ul);

        if (filter.length == 0 || filter.length === undefined) return;
        container.setAttribute("csearchActive", 0);
        for (i = 0; i < channels.length; i++) {
            let txtValue = channels[i].querySelector("span:last-child")
                .innerHTML;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                let li = document.createElement("li");
                li.innerHTML = txtValue;
                li.setAttribute("csearchIdx", i);
                if (+container.getAttribute("csearchIdx") == i) {
                    li.setAttribute("csearchActive", true);
                }
                ul.appendChild(li);
            }
        }
    };

    const nextSearchFocus = _ => {
        document
            .querySelector("[csearchActive]")
            .removeAttribute("csearchActive");

        const container = document.querySelector(
            "#playerComponentContainer > .searchContainer"
        );

        const channels = document.querySelectorAll(
            "._2c4vB > .content-wrapper > .content-wrapper__inner > :last-child > :last-child [role=listitem] > button"
        );

        const selections = container.querySelectorAll("li");
        let num = +container.getAttribute("csearchIdx");
        if (++num > selections.length) {
            num = 0;
        }
        container.setAttribute("csearchIdx", num);

        selections[num].setAttribute("csearchActive", true);
    };

    const prevSearchFocus = _ => {
        document
            .querySelector("[csearchActive]")
            .removeAttribute("csearchActive");

        const container = document.querySelector(
            "#playerComponentContainer > .searchContainer"
        );
        const selections = container.querySelectorAll("li");
        let num = +container.getAttribute("csearchIdx");
        if (--num < 0) {
            num = selections.length - 1;
        }
        container.setAttribute("csearchIdx", num);

        const channels = document.querySelectorAll(
            "._2c4vB > .content-wrapper > .content-wrapper__inner > :last-child > :last-child [role=listitem] > button"
        );
        selections[num].setAttribute("csearchActive", true);
    };

    const selectCurrent = _ => {
        let item = document.querySelector("[csearchActive]");
        if (!item) return;

        const channels = document.querySelectorAll(
            "._2c4vB > .content-wrapper > .content-wrapper__inner > :last-child > :last-child [role=listitem] > button"
        );

        channels[item.getAttribute("csearchIdx")].click();
    };

    const toggleLockedControls = () => {
        const player = document.querySelector("#playerComponentContainer");
        console.log(player);
        if (!player) return;

        player.classList.toggle("locked-open");
    };

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

    const actionMap = {
        playPause: " ",
        fullscreen: "f",
        mute: "m",
        increaseVolume: "ArrowUp",
        decreaseVolume: "ArrowDown",
        lockControls: "l",
        driverPicker: "d"
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
        [actionMap.driverPicker]: driverPicker
    };

    document.addEventListener("keydown", e => {
        if (e.key in keyMap) {
            //e.preventDefault();
            keyMap[e.key]();
        }
    });
})(document);
