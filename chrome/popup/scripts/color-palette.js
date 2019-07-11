/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import {
  injectCSS, setCookies,
} from '../../modules/module.js';

const colorPalette = document.querySelectorAll('.color-palette li');
const customColorInput = document.getElementById('custom-color-input');
const customColorSubmit = document.querySelector('.submit');

function setColor(event) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    /* getting selected color value */
    const colorPaletteElement = getComputedStyle(event.target);
    const style = `.topic-list a:visited {
      color: ${colorPaletteElement.backgroundColor};
    }`;

    /* insert new styles */
    injectCSS(style);

    /* setting cookies */
    setCookies(tabs[0].url, 'favourite-color', style);
  });
}

colorPalette.forEach((color) => {
  color.addEventListener('click', setColor, false);
});

customColorSubmit.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const customStyle = `.topic-list a:visited {
      color: ${customColorInput.value};
    }`;

    /* insert custom styles */
    injectCSS(customStyle);

    /* set custom style cookies */
    setCookies(tabs[0].url, 'favourite-color', customStyle);
  });
});

chrome.cookies.onChanged.addListener((changeInfo) => {
  console.log(
    `Cookie changed:\n
        * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
        * Cause: ${changeInfo.cause}\n
        * Removed: ${changeInfo.removed}`,
  );
});
