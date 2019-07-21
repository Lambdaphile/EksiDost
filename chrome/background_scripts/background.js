/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import {
  getActiveTab, injectCSS, setCookies,
} from '../modules/module.js';

function setStyles(tabs) {
  /* getting previously set cookies */
  chrome.cookies.get({
    url: tabs[0].url,
    name: 'favourite-color',
  },
  (cookie) => {
    /* if there are availible cookies - insert styles */
    if (cookie) {
      let style = JSON.parse(cookie.value);
      /* restoring css code */
      style += ';}';

      injectCSS(style);
    } else {
      /* default styles for fresh installs... */
      const defaultStyle = '.topic-list a:visited {color: purple;}';

      injectCSS(defaultStyle);

      setCookies(tabs[0].url, 'favourite-color', defaultStyle);
    }
  });
}

function validateURL() {
  getActiveTab((tabs) => {
    if (tabs[0].url !== 'undefined') setStyles(tabs);
  });
}

/* update when the tab is updated */
chrome.tabs.onUpdated.addListener(validateURL);
chrome.tabs.onActivated.addListener(validateURL);
