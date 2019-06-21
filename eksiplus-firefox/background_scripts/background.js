function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

function injectCSS(css) {
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  let injectingCSS = browser.tabs.insertCSS({code: css});
  injectingCSS.then(null, onError);
}

function cookieUpdate() {
  getActiveTab().then(tabs => {
    // Getting previously set cookies
    let gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: 'favourite-color'
    });

    gettingCookies.then(cookie => {
      if (cookie) {
        // if there are availible cookies - insert
        let favouriteColor = JSON.parse(cookie.value);
        injectCSS(favouriteColor);
      } 
      else {
        // default styles for fresh installs
        const defaultStyle = '.topic-list a:visited {color: purple;}';
        injectCSS(defaultStyle);

        browser.cookies.set({
          url: tabs[0].url,
          name: 'favourite-color',
          value: JSON.stringify(defaultStyle)
        });
      }
    })
  });
}

// update when the tab is activated
browser.tabs.onActivated.addListener(cookieUpdate);
// update when the tab is updated
browser.tabs.onUpdated.addListener(cookieUpdate);