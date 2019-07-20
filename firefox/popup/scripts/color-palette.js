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
    const style = `.topic-list a:visited {
      color: ${paletteElement.backgroundColor};
    }`;

    /* remove previous set styles */
    ejectCSS(style);

    /* insert new styles */
    injectCSS(style);

    /* Setting cookies */
    setCookies(tabs[0].url, 'favourite-color', style);
  });
}

colorPalette.forEach((color) => {
  color.addEventListener('click', setColor, false);
});

customColorSubmit.addEventListener('click', () => {
  getActiveTab().then((tabs) => {
    const customStyle = `.topic-list a:visited {
      color: ${customColorInput.value};
    }`;

    ejectCSS(customStyle);
    injectCSS(customStyle);

    setCookies(tabs[0].url, 'favourite-color', customStyle);
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
