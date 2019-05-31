function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
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
        let cookieData = JSON.parse(cookie.value);
        
        // Injecting our styles
        function onError(error) {
          console.log(`Error: ${error}`);
        }
        let insertingCSS = browser.tabs.insertCSS({
          code: cookieData.favouriteColor
        });
        insertingCSS.then(null, onError);
      }
    });
  });
}

browser.tabs.onActivated.addListener(cookieUpdate);
browser.tabs.onUpdated.addListener(cookieUpdate);