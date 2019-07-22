/* eslint-disable import/extensions */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import {
  getActiveTab, injectCSS, setCookies,
} from '../../modules/module.js';

const colorPalette = document.querySelectorAll('.color-palette li');
const customColorInput = document.getElementById('custom-color-input');
const customColorSubmit = document.querySelector('.submit');

colorPalette.forEach((color) => {
  color.addEventListener('click', (event) => {
    getActiveTab((tabs) => {
      /* take selected color value and create the css code */
      const colorPaletteElement = getComputedStyle(event.target);
      const style = `.topic-list a:visited {
        color: ${colorPaletteElement.backgroundColor};
      }`;
      /* insert new styles */
      injectCSS(style);

      /* setting cookies... */
      setCookies(tabs[0].url, 'favourite-color', style);
    });
  }, false);
});

customColorSubmit.addEventListener('click', () => {
  getActiveTab((tabs) => {
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
