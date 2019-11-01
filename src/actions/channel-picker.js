import { defaultLogger } from "../shared/Logger";
import { drivers } from "../data/drivers";
import * as util from "../shared/util";

export const channelPicker = () => {
    /**
     * @returns {Boolean}
     */
    const checkExists = _ => {
        if (
            document.querySelector(
                "#playerComponentContainer > .searchContainer"
            )
        ) {
            return true;
        }
        return false;
    };

    /**
     * @returns {Element}
     */
    const searchContainer = _ => {
        if (checkExists()) {
            return document.querySelector(
                "#playerComponentContainer > .searchContainer"
            );
        }
        let container = document.createElement("div");
        container.className = "searchContainer";
        container.setAttribute("cSearchIdx", 0);
        let player = document.querySelector("#playerComponentContainer");
        if (!player) return container;
        player.append(container);
        return container;
    };

    /**
     * @returns {Element}
     */
    const searchBar = () => {
        let input = searchContainer().querySelector(".channelPicker");
        if (input) return input;
        input = document.createElement("input");
        input.className = "channelPicker";
        input.type = "text";
        input.placeholder = "Driver / Channel";
        searchContainer().append(input);
        input.focus();
        return input;
    };

    searchBar().addEventListener("focusout", _ => {
        if (!searchBar()) return;
        searchContainer().remove();
    });

    searchBar().addEventListener("keydown", e => {
        switch (e.key) {
            case "Enter":
                submitForm();
            case "Escape":
                searchBar().blur();
                break;
            case "ArrowUp":
                selectPrevItem();
                e.preventDefault();
                break;
            case "ArrowDown":
                selectNextItem();
                e.preventDefault();
                break;
        }
    });

    searchBar().addEventListener("input", _ => {
        searchResults();
    });

    /**
     * @returns {Element}
     */
    const searchList = () => {
        if (!searchContainer()) return;
        let list = null;
        if (
            (list = util.returnExists(
                "#playerComponentContainer > div.searchContainer > ul.searchResult"
            ))
        )
            return list;
        list = document.createElement("ul");
        list.className = "searchResult";
        searchContainer().appendChild(list);
        return list;
    };

    /**
     * Changes the Player to the newly selected Channel.
     */
    const submitForm = () => {
        let active = document.querySelector("[cSearchActive]");
        if (active) {
            let uid = active.getAttribute("uid");
            let btn = document.querySelector(`button[uid='${uid}']`);
            if (btn) {
                defaultLogger.info(`Submitted: ${uid}`);
                btn.click();
            } else {
                let defChannels = document.querySelectorAll(
                    "._2c4vB > .content-wrapper > .content-wrapper__inner > :last-child > :first-child > :first-child button"
                );
                defChannels.forEach(elem => {
                    if (elem.textContent == uid) {
                        elem.click();
                    }
                });
            }
        }
    };

    /**
     * Searches through all available channels and presents them
     */
    const searchResults = () => {
        const input = searchBar().value;
        const availabilities = document.querySelectorAll(
            "._2c4vB > .content-wrapper > .content-wrapper__inner > :last-child > :last-child [role=listitem] > button"
        );
        let possibilities = [];

        // Add available non-driver Channels
        availabilities.forEach(elem => {
            switch (elem.textContent) {
                case "Replay":
                case "Pit Lane":
                case "Tracker":
                case "Data":
                case "Live":
                    possibilities.push({
                        item: elem.textContent,
                        searchTerms: [elem.textContent.toUpperCase()],
                        elem: elem.textContent
                    });
                    return;
            }
            if (
                elem.hasAttribute("firstname") &&
                elem.hasAttribute("lastname")
            ) {
                // Search for First name, last name, number, initials
                possibilities.push({
                    item: `${elem.getAttribute(
                        "firstname"
                    )} ${elem.getAttribute("lastname")}`,
                    searchTerms: [
                        elem.getAttribute("firstname").toUpperCase(),
                        elem.getAttribute("lastname").toUpperCase(),
                        elem
                            .querySelector(":first-child > span:first-child")
                            .textContent.toUpperCase(),
                        elem
                            .querySelector(":first-child > span:last-child")
                            .textContent.toUpperCase(),
                        `${elem
                            .getAttribute("firstname")
                            .toUpperCase()} ${elem
                            .getAttribute("lastname")
                            .toUpperCase()}`
                    ],
                    elem: elem.getAttribute("uid")
                });
            }
            return;
        });

        clearList();

        // Do not attempt to serach without input
        if (!input.length > 0) return;

        let retItems = [];

        searchContainer().setAttribute("cSearchIdx", 1);

        possibilities.forEach(item => {
            let bAdded = false;
            item.searchTerms.forEach(term => {
                if (term.indexOf(input.toUpperCase()) === -1) return;
                if (!bAdded) retItems.push(item);
                bAdded = true;
            });
        });

        retItems.forEach(item => {
            let node = document.createElement("li");
            node.textContent = item.item;
            node.addEventListener("click", bindItemClick, false);
            node.setAttribute("uid", item.elem);
            searchList().appendChild(node);
        });
        updateSelectedItem();
    };

    /**
     * Deletes all children from the Searchresult list.
     */
    const clearList = () => {
        let list = searchList();
        while (list.firstChild) {
            list.removeChild(list.lastChild);
        }
    };

    /**
     * retrieves data from the API
     */
    const getData = () => {
        const driverBtns = document.querySelectorAll(
            "._2c4vB > .content-wrapper > .content-wrapper__inner > :last-child > :last-child > :last-child [role=listitem] button"
        );
        driverBtns.forEach(elem => {
            let number = elem.querySelector("span:first-child").textContent;
            let shorthand = elem.querySelector("span:nth-child(3)").textContent;
            getDriverInfo(shorthand, number, elem);
        });
    };

    /**
     *
     * @param {String} name
     * @param {String} number
     * @param {Element} elem
     */
    const getDriverInfo = (name, number, elem) => {
        let url = `https://f1tv.formula1.com/api/driver/?driver_tla=${name}}&limit=1&fields=first_name,last_name`;
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "json";
        request.send();
        request.onload = _ => {
            let item = request.response.objects[0];
            elem.setAttribute("firstname", item.first_name);
            elem.setAttribute("lastname", item.last_name);
        };
        elem.setAttribute("uid", `${name}`);
    };

    /**
     * @param {Event} e
     */
    const bindItemClick = e => {
        e.preventDefault();
        console.log(e);
    };

    /**
     * Selects the next available channel item, prevents overflow
     */
    const selectNextItem = () => {
        let container = searchContainer();
        let idx = +container.getAttribute("cSearchIdx");
        const driverBtns = searchList().querySelectorAll("li");
        idx + 1 > driverBtns.length ? (idx = 1) : idx++;
        container.setAttribute("cSearchIdx", idx);
        updateSelectedItem();
    };

    /**
     * Selects the next available channel item, prevents overflow
     */
    const selectPrevItem = () => {
        let container = searchContainer();
        let idx = +container.getAttribute("cSearchIdx");
        const driverBtns = searchList().querySelectorAll("li");
        idx - 1 <= 0 ? (idx = driverBtns.length) : idx--;
        container.setAttribute("cSearchIdx", idx);
        updateSelectedItem();
    };

    /**
     * Updates visual state on item. Scrolls items if needed.
     */
    const updateSelectedItem = () => {
        let elem = document.querySelector("[cSearchActive]");
        if (elem) {
            elem.removeAttribute("cSearchActive");
        }
        let idx = +searchContainer().getAttribute("cSearchIdx");
        elem = null;
        elem = searchList().querySelector(`:nth-child(${idx})`);
        if (elem) {
            elem.setAttribute("cSearchActive", true);
            elem.scrollIntoView(true);
        }
    };

    getData();
};

/**
 * Checks if the Channel picker is on screen
 *
 * @returns {Boolean}
 */
export const ChannelPickerisFocus = () => {
    let searchBar = document.querySelector(
        "#playerComponentContainer > .searchContainer > .channelPicker"
    );
    return searchBar ? true : false;
};
