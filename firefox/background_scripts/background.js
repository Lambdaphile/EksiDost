/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  getActiveTab, injectCSS, setCookies, onError,
} from '../modules/module.js';

function cookieUpdate() {
  getActiveTab().then((tabs) => {
    /* getting previously set styles from cookies */
    const gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: 'favourite-color',
    });
    gettingCookies.then((cookie) => {
      /* if there are availible cookies - insert styles */
      if (cookie) {
        const storedStyle = JSON.parse(cookie.value);
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
browser.tabs.onUpdated.addListener(cookieUpdate);
browser.tabs.onActivated.addListener(cookieUpdate);
