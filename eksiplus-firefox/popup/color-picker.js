const colorPalette = document.querySelectorAll('.color-palette button');

let cookieData = {
  favouriteColor: ''
};

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

colorPalette.forEach((color) => {
  color.onclick = function(event) {
    getActiveTab().then((tabs) => {
      cookieData.favouriteColor = `.topic-list a:visited {
        color:${event.target.getAttribute('class')};
      }`;

      // Injecting our styles
      function onError(error) {
        console.log(`Error: ${error}`);
      }
      let insertingCSS = browser.tabs.insertCSS({
        code: cookieData.favouriteColor
      });
      insertingCSS.then(null, onError);

      // Setting cookies
      browser.cookies.set({
        url: tabs[0].url,
        name: "favourite-color",
        value: JSON.stringify(cookieData)
      });

    });
  }
});

browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed:\n
              * Cookie: ${JSON.stringify(changeInfo.cookie)}\n
              * Cause: ${changeInfo.cause}\n
              * Removed: ${changeInfo.removed}`);
});