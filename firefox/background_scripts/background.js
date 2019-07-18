/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import {
  getActiveTab, injectCSS, onError, setCookies,
} from '../modules/module.js';

function handlePageReload() {
  getActiveTab().then((tabs) => {
    /* getting previously set cookies */
    const gettingCookies = browser.cookies.get({
      url: tabs[0].url,
      name: 'favourite-color',
    });

    gettingCookies.then((cookie) => {
      /* if there are availible cookies - insert styles */
      if (cookie) {
        const cookieCSS = JSON.parse(cookie.value);
        injectCSS(cookieCSS);
      } else {
        /* default styles for fresh installs... */
        const defaultCSS = '.topic-list a:visited {color: purple;}';

        injectCSS(defaultCSS);

        setCookies(tabs[0].url, 'favourite-color', defaultCSS);
      }
    });
  });
}

/* update when the tab is updated */
browser.tabs.onUpdated.addListener(handlePageReload);
