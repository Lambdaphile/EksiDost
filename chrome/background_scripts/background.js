/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */


function handlePageReload() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    /* getting previously set cookies */
    chrome.cookies.get({
      url: tabs[0].url,
      name: 'favourite-color',
    }, (cookie) => {
      /* if there are availible cookies - insert styles */
      if (cookie) {
        const cookieCSS = JSON.parse(cookie.value);
        chrome.tabs.insertCSS(cookieCSS);
      } else {
        /* default styles for fresh installs... */
        const defaultCSS = '.topic-list a:visited {color: purple;}';
        chrome.tabs.insertCSS({ code: defaultCSS });

        chrome.cookies.set({
          url: tabs[0].url,
          name: 'favourite-color',
          value: defaultCSS,
        });
      }
    });
  });
}

/* update when the tab is updated */
chrome.tabs.onUpdated.addListener(handlePageReload);
