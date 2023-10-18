import { createLevList } from './lvlsloader';
import { loadGameboard } from './gameplay';

createLevList();

loadGameboard();

// Clicking on level links in menu
function extractLevNum(id: string): number | undefined {
  const extInput: RegExp = /a-lev-menu-(\d+)/;
  const InMatch:RegExpMatchArray | null = id.match(extInput);

  if (InMatch !== null) {
    return parseInt(InMatch[1], 10);
  }

  return undefined;
}

let isExtracted: boolean = false;
const levLink: NodeListOf<Element> = document.querySelectorAll('.lev-menu');
// console.log(levLink);

levLink.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();

    const clickedElement: HTMLAnchorElement = e.currentTarget as HTMLAnchorElement;
    const levNum = extractLevNum(clickedElement.id);
    isExtracted = true;
    loadGameboard(levNum, isExtracted);
  });
});
