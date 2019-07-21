/* eslint-disable no-undef */
function getActiveTab() {
  return browser.tabs.query({
    active: true,
    currentWindow: true,
    url: '*://eksisozluk.com/*',
  });
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function injectCSS(css) {
  const injectingCSS = browser.tabs.insertCSS({ code: css });
  injectingCSS.then(null, onError);
}

function ejectCSS(css) {
  const ejectingCSS = browser.tabs.removeCSS({ code: css });
  ejectingCSS.then(null, onError);
}

function setCookies(cookieUrl, cookieName, cookieValue) {
  browser.cookies.set({
    url: cookieUrl,
    name: cookieName,
    value: JSON.stringify(cookieValue),
  });
}

export {
  getActiveTab, injectCSS, setCookies, ejectCSS, onError,
};
