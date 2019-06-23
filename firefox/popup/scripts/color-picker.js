const colorPalette = document.querySelectorAll('.color-palette li');
const customColor = document.getElementById('custom-color');
const enterButton = document.querySelector('button');

let cookieData = {
  favouriteColor: ''
};

function onError(error) {
  console.log(`Error: ${error}`);
}

function injectCSS(css) {
  let injectingCSS = browser.tabs.insertCSS({ code: css });
  injectingCSS.then(null, onError);
}

function ejectCSS(css) {
  let ejectingCSS = browser.tabs.removeCSS({ code: css });
  ejectingCSS.then(null, onError);
}

function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}

colorPalette.forEach(color => {
  color.onclick = event => {
    getActiveTab().then(tabs => {
      // getting favourite color value
      const bg = getComputedStyle(color);
      let favouriteColor = `.topic-list a:visited {
        color: ${bg.backgroundColor};
      }`;

      // ejectCSS to remove previous styles
      ejectCSS(favouriteColor);

      // injectCSS to insert new styles
      injectCSS(favouriteColor);
      cookieData.favouriteColor = favouriteColor;

      // Setting cookies
      browser.cookies.set({
        url: tabs[0].url,
        name: "favourite-color",
        value: JSON.stringify(cookieData.favouriteColor)
      });
    });
  }
});

enterButton.addEventListener('click', () => {
  getActiveTab().then(tabs => {
    let customStyle = `.topic-list a:visited {
      color: ${customColor.value};
    }`;

    injectCSS(customStyle);

    browser.cookies.set({
      url: tabs[0].url,
      name: "favourite-color",
      value: JSON.stringify(cookieData.favouriteColor)
    });
  });
});

browser.cookies.onChanged.addListener(changeInfo => {
  console.log(
    `Cookie changed:\n
        * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
        * Cause: ${changeInfo.cause}\n
        * Removed: ${changeInfo.removed}`
  );
});