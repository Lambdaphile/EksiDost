/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  getActiveTab, injectCSS, setCookies, onError,
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
        const cookieStyle = JSON.parse(cookie.value);
        injectCSS(cookieStyle);
      } else {
        /* default styles for fresh installs... */
        const defaultStyle = '.topic-list a:visited {color: purple;}';
        injectCSS(defaultStyle);

        setCookies(tabs[0].url, 'favourite-color', defaultStyle);
      }
    });
  });
}

/* update when the tab is updated */
browser.tabs.onUpdated.addListener(handlePageReload);
