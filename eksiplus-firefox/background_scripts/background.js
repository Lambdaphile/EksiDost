function getActiveTab() {
    return browser.tabs.query({ active: true, currentWindow: true });
}

function injectCSS(css) {
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    let injectingCSS = browser.tabs.insertCSS({ code: css });
    injectingCSS.then(null, onError);
}

function cookieUpdate() {
    getActiveTab().then((tabs) => {
        // Getting previously set cookies
        let gettingCookies = browser.cookies.get({
            url: tabs[0].url,
            name: 'favourite-color'
        });

        gettingCookies.then((cookie) => {
            if (cookie) {
                // getting previously set cookies
                let cookieData = JSON.parse(cookie.value);
                // injecting availible styles
                injectCSS(cookieData.favouriteColor);
                // creating cookies and setting styles
            } else {
                const defaultStyle = '.topic-list a:visited {color: purple;}';
                // creating cooking and setting styles with defaultStyle css
                browser.cookies.set({
                    url: tabs[0].url,
                    name: 'favourite-color',
                    value: defaultStyle
                });

                injectCSS(defaultStyle);
            }
        });
    });
}

// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);
// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);