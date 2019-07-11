/* eslint-disable no-undef */
function injectCSS(style) {
  chrome.tabs.insertCSS({ code: style });
}

function setCookies(cookieUrl, cookieName, cookieValue) {
  /*
   * Cutting semilicon from the cookie value, because
   * Chrome does not accept them. Cutting closing curly
   * bracked too, for easier restoration later...
   */
  let style = cookieValue;
  style = style.replace(';', '');
  style = style.replace('}', '');

  chrome.cookies.set({
    url: cookieUrl,
    name: cookieName,
    value: JSON.stringify(style),
  });
}

export {
  injectCSS, setCookies,
};
