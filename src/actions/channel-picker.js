import { defaultLogger } from "../shared/Logger";

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

    searchBar().addEventListener("input", _ => {
        console.log(searchBar().value);
    });
};

export const ChannelPickerisFocus = _ => {
    let searchBar = document.querySelector(
        "#playerComponentContainer > .searchContainer > .channelPicker"
    );
    return searchBar ? true : false;
};
