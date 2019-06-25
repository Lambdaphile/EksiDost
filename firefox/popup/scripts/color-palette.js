/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  getActiveTab, injectCSS, ejectCSS, setCookies, onError,
} from '../../modules/module.js';

const colorPalette = document.querySelectorAll('.color-palette li');
const customColorInput = document.getElementById('custom-color-input');
const customColorSubmit = document.querySelector('.submit');

function setColor(event) {
  getActiveTab().then((tabs) => {
    /* getting selected color value */
    const paletteElement = getComputedStyle(event.target);
    const css = `.topic-list a:visited {
      color: ${paletteElement.backgroundColor};
    }`;

    /* ejectCSS to remove previous styles */
    ejectCSS(css);

    /* injectCSS to insert new styles */
    injectCSS(css);

    /* Setting cookies */
    setCookies(tabs[0].url, 'favourite-color', css);
  });
}

colorPalette.forEach((color) => {
  color.addEventListener('click', setColor, false);
});

customColorSubmit.addEventListener('click', () => {
  getActiveTab().then((tabs) => {
    const customCSS = `.topic-list a:visited {
      color: ${customColorInput.value};
    }`;

    injectCSS(customCSS);
    setCookies(tabs[0].url, 'favourite-color', customCSS);
  });
});

browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(
    `Cookie changed:\n
        * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
        * Cause: ${changeInfo.cause}\n
        * Removed: ${changeInfo.removed}`,
  );
});
