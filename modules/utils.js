(document => {
    /**
     * Watch out if the players UI is hiding or not and change the current camera overlay too.
     */
    let mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.target.id === "playerComponentContainer") {
                let elem = document.querySelector(".z3lAg");
                if (!elem) return;
                mutation.target.classList.length > 1
                    ? elem.classList.add("hidden")
                    : elem.classList.remove("hidden");
            }
        });
    });
    mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeOldValue: true,
        subtree: true,
        attributeFilter: ["class"]
    });
})(document);
