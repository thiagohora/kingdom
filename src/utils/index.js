export function handleOnClick(selector, callback) {
  const anchors = [].slice.call(document.querySelectorAll(selector));
  anchors.forEach(link => link.addEventListener('click', (event) => {
    const url = event.target.getAttribute('href');
    console.log('handleOnClick', url, url.split('?')[0]);

    event.stopImmediatePropagation();
    event.preventDefault();

    // Push the state
    window.history.pushState({ pathname: url.split('?')[0] }, '', url);
    if (callback) callback(url);
  }));
}

