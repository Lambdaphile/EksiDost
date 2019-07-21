/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  getActiveTab, injectCSS, setCookies, onError,
} from '../modules/module.js';

function setStyles(tabs) {
  /* getting previously set styles from cookies */
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
}

/*
 * To reduce unnecessary computation, first check
 * if the activated or updated tab contains eksisozluk.com
 */
function validateURL() {
  getActiveTab().then((tabs) => {
    if (tabs[0].url !== 'undefined') setStyles(tabs);
  });
}

/* listen for tab activations and updated */
browser.tabs.onUpdated.addListener(validateURL);
browser.tabs.onActivated.addListener(validateURL);
