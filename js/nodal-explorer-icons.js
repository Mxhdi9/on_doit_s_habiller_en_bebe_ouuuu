(() => {
  'use strict';

  const colors = Object.freeze({
    blue: '#2995de',
    blueLight: '#6ac4f1',
    blueDark: '#1765a5',
    folder: '#f4c44e',
    folderLight: '#ffda72',
    folderBack: '#d99b28',
    paper: '#f4f7fb',
    paperFold: '#c5d7e5',
    gray: '#b0bac3',
    grayLight: '#d8e0e7',
    grayDark: '#647483',
    ink: '#35495d',
    green: '#54ae96',
  });

  function svg(content) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${content}</svg>`;
  }

  const folder = `<path fill="${colors.folderBack}" d="M5 12a3 3 0 0 1 3-3h11l5 5h16a3 3 0 0 1 3 3v20H5Z"/><path fill="${colors.folder}" d="M4 19a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2l-3 20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z"/><path fill="${colors.folderLight}" d="M6 17h36a2 2 0 0 1 2 2H4a2 2 0 0 1 2-2Z"/>`;

  const monitor = `<path fill="${colors.grayDark}" d="M20 36h5v5h5v2H15v-2h5Z"/><rect x="8" y="11" width="29" height="26" rx="2" fill="${colors.ink}"/><path fill="${colors.blue}" d="M10 13h25v20H10Z"/><path fill="${colors.blueLight}" d="M10 13h25L10 28Z"/><path fill="${colors.grayLight}" d="M10 34h25v1H10Z"/>`;

  const genericFolder = svg(folder);
  const icons = Object.freeze({
    quick: svg(`<path fill="${colors.blue}" d="m24 4 5.8 12.8L44 18.3 33.4 28l3.1 14-12.5-7.2L11.5 42l3.1-14L4 18.3l14.2-1.5Z"/><path fill="${colors.blueLight}" d="m24 4 5.8 12.8L24 24l-5.8-7.2Z"/>`),
    computer: svg(monitor),
    desktop: svg(`${folder}<path fill="${colors.grayDark}" d="M30 35h5v6h5v2H25v-2h5Z"/><rect x="20" y="20" width="25" height="17" rx="1.5" fill="${colors.ink}"/><path fill="${colors.blue}" d="M22 22h21v12H22Z"/><path fill="${colors.blueLight}" d="M22 22h21L22 32Z"/><path fill="${colors.grayLight}" d="M22 35h21v1H22Z"/>`),
    documents: svg(`${folder}<path fill="${colors.paper}" d="M24 17h12l7 7v20H24Z"/><path fill="${colors.paperFold}" d="M36 17v7h7Z"/><path stroke="${colors.grayDark}" stroke-width="1.5" d="M28 29h11m-11 4h11m-11 4h8"/>`),
    pictures: svg(`${folder}<rect x="19" y="21" width="25" height="21" rx="1" fill="${colors.paper}"/><path fill="${colors.blueLight}" d="M21 23h21v17H21Z"/><circle cx="36.5" cy="27.5" r="2.5" fill="${colors.paper}"/><path fill="${colors.blueDark}" d="m21 37 7-9 9 12H21Z"/><path fill="${colors.green}" d="m31 40 6-8 5 5v3Z"/>`),
    music: svg(`<path fill="${colors.blue}" d="M19 11 39 6v26h-5V16l-10 2.5V37h-5Z"/><path fill="${colors.blueLight}" d="m19 11 20-5v5l-20 5Z"/><ellipse cx="16" cy="37" rx="8" ry="6" transform="rotate(-18 16 37)" fill="${colors.blue}"/><ellipse cx="31" cy="32" rx="8" ry="6" transform="rotate(-18 31 32)" fill="${colors.blue}"/>`),
    objects: svg(`<path fill="${colors.blueLight}" d="m24 4 19 10.5L24 25 5 14.5Z"/><path fill="${colors.blue}" d="m5 14.5 19 10.5v20L5 34.5Z"/><path fill="${colors.blueDark}" d="m24 25 19-10.5v20L24 45Z"/><path fill="none" stroke="${colors.paper}" stroke-opacity=".5" stroke-width="1.2" stroke-linejoin="round" d="m6 15 18 10 18-10M24 25v19"/>`),
    downloads: svg(`${folder}<path fill="${colors.blueDark}" d="M29 20h7v12h8L32.5 45 21 32h8Z"/><path fill="${colors.blue}" d="M29 20h5v15l-4.5-3H29Z"/>`),
    videos: svg(`${folder}<rect x="19" y="22" width="26" height="20" rx="1" fill="${colors.ink}"/><path fill="${colors.grayDark}" d="M25 24h14v16H25Z"/><path fill="${colors.paper}" d="M21 25h2v3h-2Zm0 6h2v3h-2Zm0 6h2v3h-2Zm20-12h2v3h-2Zm0 6h2v3h-2Zm0 6h2v3h-2Z"/><path fill="${colors.paper}" d="m29 27 7 5-7 5Z"/>`),
    drive: svg(`<path fill="${colors.grayDark}" d="M10 12h28l6 20v8H4v-8Z"/><path fill="${colors.grayLight}" d="M11 12h26l5 19H6Z"/><path fill="${colors.gray}" d="M4 31h40v9H4Z"/><path fill="${colors.grayDark}" d="M9 34h22v3H9Z"/><circle cx="38" cy="35.5" r="1.5" fill="${colors.blue}"/><path stroke="${colors.paper}" stroke-opacity=".8" d="M11 15h26"/>`),
    network: svg(`<path fill="none" stroke="${colors.gray}" stroke-width="2.5" stroke-linejoin="round" d="M24 22v8M10 36v-6h28v6"/><rect x="14" y="5" width="20" height="16" rx="1.5" fill="${colors.ink}"/><path fill="${colors.blue}" d="M16 7h16v11H16Z"/><path fill="${colors.blueLight}" d="M16 7h16L16 16Z"/><path fill="${colors.gray}" d="M22 21h4v3h4v2H18v-2h4Z"/><rect x="2" y="34" width="17" height="11" rx="1" fill="${colors.ink}"/><rect x="29" y="34" width="17" height="11" rx="1" fill="${colors.ink}"/><path fill="${colors.blue}" d="M4 36h13v6H4Zm27 0h13v6H31Z"/><path fill="${colors.gray}" d="M7 45h7v2H7Zm27 0h7v2h-7Z"/>`),
  });

  window.NodalExplorerIcons = Object.freeze({
    render(name) {
      return typeof name === 'string' && Object.hasOwn(icons, name) ? icons[name] : genericFolder;
    },
  });
})();
