/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import {
  getActiveTab, injectCSS, setCookies,
} from '../modules/module.js';

function cookieUpdate() {
  getActiveTab((tabs) => {
    chrome.pageAction.show(tabs[0].id);

    /* getting previously set styles from cookies */
    chrome.cookies.get({
      url: tabs[0].url,
      name: 'favourite-color',
    },
    (cookie) => {
      /* if there are availible cookies - insert styles */
      if (cookie) {
        let storedStyle = JSON.parse(cookie.value);
        /* restoring css code... */
        storedStyle += ';}';

        injectCSS(storedStyle);
      } else {
        /* default styles for fresh installs... */
        const defaultStyle = '.topic-list a:visited {color: purple;}';
        injectCSS(defaultStyle);

        setCookies(tabs[0].url, 'favourite-color', defaultStyle);
      }
    });
  });
}

/* listen for tab activations and updates */
chrome.tabs.onUpdated.addListener(cookieUpdate);
chrome.tabs.onActivated.addListener(cookieUpdate);
