import levels from './levels';
import { ILevels } from './interfaces';

export function createLevList(): void {
  for (let i = 0; i < levels.length; i += 1) {
    const level: ILevels = levels[i];
    const item: HTMLElement | null = document.createElement('p');
    const levSec: HTMLElement | null = document.querySelector('.lev-area');
    if (levSec !== null) {
      levSec.append(item);
    }
    const iconTip: HTMLImageElement | null = document.createElement('img');
    const iconCheck: HTMLImageElement | null = document.createElement('img');
    const itemChild: HTMLElement | null = item.querySelector('.lev-menu');
    iconTip.src = 'images/tip.png';
    iconTip.alt = 'tip';
    iconTip.classList.add('lev-pic-tip');
    iconTip.classList.add('invisible');
    iconTip.id = `'lev-pic-tip-${i}'`;
    iconCheck.src = 'images/checkmark.png';
    iconCheck.alt = 'tip';
    iconCheck.classList.add('lev-pic-check');
    iconCheck.classList.add('invisible');
    iconCheck.id = `'lev-pic-check-${i}'`;
    item.classList.add('level-menu');
    if (itemChild !== null) {
      itemChild.id = `levmenu-child-${i}`;
    }
    item.id = `levmenu-${i}`;
    item.innerHTML = `<a class='lev-menu' id='a-lev-menu-${i}' href='#'>${level.levNumCur}. ${level.levName}</a>`;
    item.append(iconCheck);
    item.append(iconTip);
  }
}
