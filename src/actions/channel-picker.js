import { defaultLogger } from "../shared/Logger";
import { drivers } from "../data/drivers";
import * as util from "../shared/util"

export const channelPicker = _ => {
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

    const searchContainer = _ => {
        if (checkExists()) {
            return document.querySelector(
                "#playerComponentContainer > .searchContainer"
            );
        }
        let container = document.createElement("div");
        container.className = "searchContainer";
        container.setAttribute("csearchIdx", 0);
        let player = document.querySelector("#playerComponentContainer");
        if (!player) return container;
        player.append(container);
        return container;
    };

    const searchBar = _ => {
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
        }
    });

    searchBar().addEventListener("input", _ => {
        searchResults();
    });
    
    const searchList = _ => {
        if(!searchContainer()) return;
        let list = null;
        if(list = util.returnExists("#playerComponentContainer > .searchResult")) return list;
        list = document.createElement("ul");
        list.className = "searchResult";
        return list;
    }

    const submitForm = _ => {
        defaultLogger.info(`Submitted: ${searchBar().value}`);
    };

    const searchResults = _ => {
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
                    possibilities.push({
                        item: elem.textContent,
                        searchTerms: [elem.textContent.toUpperCase()],
                        elem: elem
                    });
                    return;
            }
            if(elem.hasAttribute("firstname") && elem.hasAttribute("lastname")){
                // Search for First name, last name, number, initials
                possibilities.push({
                    item: `${elem.getAttribute("firstname")} ${elem.getAttribute("lastname")}`,
                    searchTerms: [
                        elem.getAttribute("firstname").toUpperCase(),
                        elem.getAttribute("lastname").toUpperCase(),
                        elem.querySelector(":first-child > span:first-child").textContent.toUpperCase(),
                        elem.querySelector(":first-child > span:last-child").textContent.toUpperCase()
                    ],
                    elem: elem
                });
            }
            return;
        });

        // Do not attempt to serach without input
        if(!input.length > 0) return;
        
        let retItems = [];

        possibilities.forEach(item => {
            

            let bAdded = false;
            item.searchTerms.forEach(term => {
                if(term.indexOf(input) === -1) return;
                if(!bAdded) retItems.push(item);
                bAdded = true;
            })

        });

        retItems.forEach(item => {
            let node = document.createElement("li");
            node.textContent = item.item;
            node.setAttribute("index", retItems.length -1);
            searchList().appendChild(node);
        });
        
    };

    const getData = _ => {
        const driverBtns = document.querySelectorAll(
            "._2c4vB > .content-wrapper > .content-wrapper__inner > :last-child > :last-child > :last-child [role=listitem] button"
        );
        driverBtns.forEach(elem => {
            let number = elem.querySelector("span:first-child").textContent;
            let shorthand = elem.querySelector("span:last-child").textContent;
            getDriverInfo(shorthand, number, elem);
        });
    };

    const getDriverInfo = (name, number, elem) => {
        let url = `https://f1tv.formula1.com/api/driver/?driver_tla=${name}&driver_racingnumber=${number}&limit=1&fields=first_name,last_name`;
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "json";
        request.send();
        request.onload = _ => {
            let item = request.response.objects[0];
            elem.setAttribute("firstname", item.first_name);
            elem.setAttribute("lastname", item.last_name);
        };
        
    };

    getData();
};

export const ChannelPickerisFocus = _ => {
    let searchBar = document.querySelector(
        "#playerComponentContainer > .searchContainer > .channelPicker"
    );
    return searchBar ? true : false;
};
