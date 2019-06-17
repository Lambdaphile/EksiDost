const colorPalette = document.querySelectorAll('.color-palette button');

function onError(error) {
    console.log(`Error: ${error}`);
}

export function injectCSS(css) {
    let injectingCSS = browser.tabs.insertCSS({ code: css });
    injectingCSS.then(null, onError);
}

function ejectCSS(css) {
    let ejectingCSS = browser.tabs.removeCSS({ code: css });
    ejectingCSS.then(null, onError);
}

function getActiveTab() {
    return browser.tabs.query({ active: true, currentWindow: true });
}

colorPalette.forEach((color) => {
    color.onclick = function (event) {
        getActiveTab().then((tabs) => {
            let favouriteColor = `.topic-list a:visited {
                color: ${event.target.getAttribute('class')};
            }`;

            // ejectCSS to remove previous styles
            ejectCSS(favouriteColor);
            // injectCSS to insert new styles
            injectCSS(favouriteColor);

            // Setting cookies
            browser.cookies.set({
                url: tabs[0].url,
                name: "favourite-color",
                value: favouriteColor
            });
        });
    }
});

browser.cookies.onChanged.addListener((changeInfo) => {
    console.log(
        `Cookie changed:\n
        * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
        * Cause: ${changeInfo.cause}\n
        * Removed: ${changeInfo.removed}`
    );
});