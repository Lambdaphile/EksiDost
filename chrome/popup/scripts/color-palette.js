/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import {
  getActiveTab, injectCSS, setCookies,
} from '../../modules/module.js';

const colorPalette = document.querySelectorAll('.color-palette li');
const customColorInput = document.getElementById('custom-color-input');
const customColorSubmit = document.querySelector('.submit');

function setStyles(event) {
  getActiveTab((tabs) => {
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
  color.addEventListener('click', setStyles, false);
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
