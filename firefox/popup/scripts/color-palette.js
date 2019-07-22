/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  getActiveTab, injectCSS, ejectCSS, setCookies, onError,
} from '../../modules/module.js';

const colorPalette = document.querySelectorAll('.color-palette li');
const customColorInput = document.getElementById('custom-color-input');
const customColorSubmit = document.querySelector('.submit');

colorPalette.forEach((color) => {
  color.addEventListener('click', (event) => {
    getActiveTab().then((tabs) => {
      /* take selected color value and create the css code */
      const paletteElement = getComputedStyle(event.target);
      const style = `.topic-list a:visited {
        color: ${paletteElement.backgroundColor};
      }`;

      /* removes dublicating styles - if there are any... */
      ejectCSS(style);
      /* insert new styles */
      injectCSS(style);

      /* setting cookies... */
      setCookies(tabs[0].url, 'favourite-color', style);
    });
  }, false);
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
