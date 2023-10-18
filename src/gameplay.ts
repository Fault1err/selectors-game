/* eslint-disable no-console */
import levels from './levels';
import { makeToolTip } from './tooltips';

let isShowsHelp: boolean = false;

// LS for keeping invisibility of checkmark
const LSLevNum: string | null = localStorage.getItem('levNum');
const LSShouldKeepInv: string | null = localStorage.getItem('shouldKeepInvis');

let levNum: number = parseInt(LSLevNum || '0', 10) || 0;
let shouldKeepInv: boolean = LSShouldKeepInv === 'true' || false;
// console.log(shouldKeepInv);

window.addEventListener('beforeunload', () => {
  shouldKeepInv = true;
  localStorage.setItem('levNum', levNum.toString());
  localStorage.setItem('shouldKeepInvis', shouldKeepInv.toString());
});

function generateMarkup(): void {
  function processElement(el: Element, index: number): string {
    const elName: string = el.tagName ? el.tagName.toLowerCase() : '';
    let innerContent: string = '';

    if (el.children && el.children.length > 0) {
      Array.from(el.children).forEach((child: Element) => {
        innerContent += processElement(child, index);
      });
    }

    if (elName !== '') {
      return `<span class="hover-${index} need-glow-${index} hover-element">&lt;${elName}&gt;</span>${innerContent}<span class="hover-${index}">&lt;/${elName}&gt;</span>`;
    }

    return innerContent;
  }

  const markupHolder: HTMLDivElement = document.createElement('div');
  const boardMarkup: unknown = levels[levNum].levBoardMarkup;

  if (Array.isArray(boardMarkup)) {
    boardMarkup.forEach((el: Element, index: number) => {
      const result: string = processElement(el, index + 1);
      markupHolder.innerHTML += result;
    });
  } else if (typeof boardMarkup === 'string') {
    const tempElement: HTMLElement = document.createElement('div');
    tempElement.innerHTML = boardMarkup;
    const elements: Element[] = Array.from(tempElement.children);
    elements.forEach((el: Element, index: number) => {
      const result: string = processElement(el, index + 1);
      markupHolder.innerHTML += result;
    });
  }

  const markupContainer: HTMLElement | null = document.querySelector('.panel-output-area');
  if (markupContainer !== null) {
    const outputMarkup = markupHolder.innerHTML.trim();
    markupContainer.innerHTML = `<pre><code class="html">&ltdiv class="table"&gt<br>\n${outputMarkup}\n<br>&lt/div&gt<code><pre>`;
  }
}

// Tried to write this function as Generic Function
function addStrobe<T extends Element>() {
  const needStr: string = levels[levNum].levStrobe;
  const needStrobe: NodeListOf<T> = document.querySelectorAll(`${needStr}`);
  needStrobe.forEach(el => {
    el.classList.add('animated');
  });
}

function addToolTipToEl(): void {
  const innerGameboard: HTMLElement | null = document.querySelector('.gameboard');
  if (innerGameboard !== null) {
    const needToolTipEls: NodeListOf<Element> = innerGameboard.querySelectorAll('*');
    let i: number = 0;
    needToolTipEls.forEach((el: Element) => {
      // el.setAttribute('data-tooltip', `<${el.tagName.toLowerCase()}>`);
      const idEl: string = el.id;
      const classEL: string = el.className;
      if (idEl) {
        el.setAttribute('data-tooltip', `<${el.tagName.toLowerCase()} id="${idEl}>"`);
      }
      if (classEL && idEl) {
        el.setAttribute('data-tooltip', `<${el.tagName.toLowerCase()} class="${classEL} id="${idEl}>"`);
      }
      if (classEL === 'animated') {
        el.setAttribute('data-tooltip', `<${el.tagName.toLowerCase()}>`);
      }
      if (classEL !== 'animated') {
        el.setAttribute('data-tooltip', `<${el.tagName.toLowerCase()} class="${classEL.replace(/animated/g, '')}">`);
      }
      if (!idEl && !classEL) {
        el.setAttribute('data-tooltip', `<${el.tagName.toLowerCase()}>`);
      }
      el.classList.add(`need-glow-${i + 1}`);
      el.classList.add('need-glow-element');
      i += 1;
      // eslint-disable-next-line no-console
      // console.log(el);
    });
  }
}

function showHelp(): void {
  if (isShowsHelp) {
    return;
  }

  isShowsHelp = true;

  const curLevel: number = levels[levNum].levNumCur;
  const rightAnws: string = levels[curLevel - 1].levAnswer;

  const infoWindow: HTMLElement | null = document.querySelector('.info-window');
  if (infoWindow !== null) {
    infoWindow.classList.remove('red');
    infoWindow.classList.remove('green');
    infoWindow.innerHTML = '';
  }

  const inputArea: HTMLInputElement | null = document.querySelector('.input-area');
  if (inputArea !== null) {
    inputArea.value = '';

    let i: number = 0;

    const showNextLetter = (): void => {
      if (i < rightAnws.length) {
        inputArea.value += rightAnws.charAt(i);
        i += 1;
        setTimeout(showNextLetter, 150);
      } else {
        isShowsHelp = false;
      }
    };

    showNextLetter();
  }
}

function checkAnswer(): void {
  const infoWindow: HTMLElement | null = document.querySelector('.info-window');

  if (infoWindow !== null) {
    infoWindow.innerHTML = '';
    infoWindow.classList.remove('red');
    infoWindow.classList.remove('green');
  }

  const userInput: string = (document.querySelector('.input-area') as HTMLInputElement).value;
  const curLevel: number = levels[levNum].levNumCur;
  const rightAnswer: string = levels[curLevel - 1].levAnswer;

  if (infoWindow !== null) {
    if (userInput.toLowerCase() === rightAnswer) {
      (document.querySelector('.input-area') as HTMLInputElement).value = '';
      infoWindow.classList.add('green');
      infoWindow.innerHTML = 'Correct!';

      if (levNum === 9) {
        const youWinText: HTMLElement | null = document.querySelector('.gameboard');
        if (youWinText !== null) {
          const WinBlock: HTMLDivElement = document.createElement('div');
          const WinBlockInfo: HTMLDivElement = document.createElement('div');
          youWinText.innerHTML = '';
          youWinText.append(WinBlock);
          youWinText.append(WinBlockInfo);
          WinBlock.textContent = 'Congrats, YOU WIN!';
          WinBlockInfo.textContent = 'To start new game please press Reset progress';
          WinBlock.classList.add('win-text');
          WinBlock.classList.add('animated-win');
          WinBlockInfo.classList.add('win-text-sm');
        }

        const changedLevPic: HTMLElement | null = document.getElementById(`'lev-pic-check-${levNum}'`);
        if (changedLevPic !== null) {
          changedLevPic.classList.remove('invisible');
          // console.log(changedLevPic);
        }

        const inputArea: HTMLInputElement | null = document.querySelector('.input-area');
        if (inputArea !== null) {
          inputArea.value = '';
          const allLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a');
          allLinks.forEach(el => {
            const elem: HTMLElement = el;
            elem.style.pointerEvents = 'none';
          });
        }
      } else {
        levNum += 1;
        const jumpArea: HTMLElement | null = document.querySelector('.gameboard-area');
        if (jumpArea !== null) {
          jumpArea.classList.add('ani-jump');
          setTimeout(() => {
          // eslint-disable-next-line no-use-before-define
            loadGameboard();
            jumpArea.classList.remove('ani-jump');
          }, 1500);
        }
      }
    } else {
      infoWindow.innerHTML = 'Try Again';
      infoWindow.classList.add('red');
      const jiggleArea: HTMLHtmlElement | null = document.querySelector('.gameboard-area');
      if (jiggleArea !== null) {
        jiggleArea.classList.add('ani-jiggle');
        const jiggleEdge: HTMLElement | null = document.querySelector('.board-edge');
        if (jiggleEdge !== null) {
          jiggleEdge.classList.add('ani-jiggle');
          (document.querySelector('.input-area') as HTMLInputElement).value = '';
          setTimeout(() => {
            // eslint-disable-next-line no-use-before-define
            jiggleArea.classList.remove('ani-jiggle');
            jiggleEdge.classList.remove('ani-jiggle');
          }, 1000);
        }
      }
    }
  }
}

function getColoredLev(): void {
  const coloredLev: HTMLElement | null = document.getElementById(`a-lev-menu-${levNum}`);
  if (coloredLev !== null) {
    coloredLev.classList.add('red');
    // console.log('colored', levNum);
    // eslint-disable-next-line no-useless-return
    return;
  }
}

function getGlow(): void {
  const hoveredBlock: Element | null = document.querySelector('.gameboard');
  // console.log(hoveredBlock);
  const glowedBlock: Element | null = document.querySelector('.panel-output-area');
  // console.log(glowedBlock);

  if (hoveredBlock && glowedBlock) {
    const hoveredEls: NodeListOf<HTMLElement> = hoveredBlock.querySelectorAll('.need-glow-element');
    // console.log(hoveredEls);
    const glowedEls: NodeListOf<HTMLElement> = glowedBlock.querySelectorAll('.hover-element');
    // console.log(glowedEls);

    if (hoveredEls !== null && glowedEls !== null) {
      for (let i = 0; i < hoveredEls.length; i += 1) {
        const hoveredEl = hoveredEls[i];
        const glowedEl = glowedEls[i];
        // console.log(hoveredEl, glowedEl);

        hoveredEl.addEventListener('mouseenter', () => {
          glowedEl.classList.add('coloring');
        });

        hoveredEl.addEventListener('mouseleave', () => {
          glowedEl.classList.remove('coloring');
        });
      }
    } else {
      console.error('Failed');
    }
  } else {
    console.error('Not found');
  }
}

export function loadGameboard(clickedLevNum?: number, isExtracted?: boolean): void {
  levNum = clickedLevNum !== undefined ? clickedLevNum : levNum;

  getColoredLev();

  let extracted: boolean = isExtracted !== undefined ? isExtracted : false;

  if (!extracted) {
    const changedLevPic: HTMLElement | null = document.getElementById(`'lev-pic-check-${levNum - 1}'`);
    if (changedLevPic !== null) {
      changedLevPic.classList.remove('invisible');
      // console.log(changedLevPic);
    }
  }

  if (shouldKeepInv) {
    const changedLevPic: HTMLElement | null = document.getElementById(`'lev-pic-check-${levNum - 1}'`);
    if (changedLevPic !== null) {
      changedLevPic.classList.add('invisible');
      shouldKeepInv = false;
      // console.log(changedLevPic);
    }
  }

  const innerGameboard: HTMLElement | null = document.querySelector('.gameboard');
  if (innerGameboard !== null) {
    innerGameboard.innerHTML = levels[levNum].levBoardMarkup;
  }

  const allLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a');
  allLinks.forEach(el => {
    const elem: HTMLElement = el;
    elem.style.pointerEvents = 'auto';
  });

  generateMarkup();
  addStrobe();
  addToolTipToEl();
  makeToolTip();
  getGlow();

  extracted = false;

  const hoverPrefix: string = 'hover-';
  const glowPrefix: string = 'need-glow-';

  let maxNum = 1;
  while (document.querySelector(`.${hoverPrefix}${maxNum}`) !== null) {
    maxNum += 1;
  }

  for (let i = 1; i < maxNum; i += 1) {
    const hoverElements = document.querySelectorAll(`.${hoverPrefix}${i}`);
    const glowDiv = document.querySelector(`.${glowPrefix}${i}`);

    hoverElements.forEach((el) => {
      el.addEventListener('mouseover', () => {
        if (glowDiv) {
          glowDiv.classList.add('hover-glow');
        }
      });

      el.addEventListener('mouseout', () => {
        if (glowDiv) {
          glowDiv.classList.remove('hover-glow');
        }
      });
    });
  }
}

// Tried to write this function as Generic Function
function addHelpMark(): void {
  const markedEl: HTMLElement | null = document.getElementById(`'lev-pic-tip-${levNum}'`);
  if (markedEl !== null) {
    markedEl.classList.remove('invisible');
  }
}

function getResetGame(): void {
  (document.querySelector('.input-area') as HTMLInputElement).value = '';
  shouldKeepInv = false;
  levNum = 0;
  loadGameboard(levNum);
  const markedTipImgEls: NodeListOf<Element> = document.querySelectorAll('.lev-pic-tip');
  markedTipImgEls.forEach(el => {
    el.classList.add('invisible');
  });
  const markedCheckImgEls: NodeListOf<Element> = document.querySelectorAll('.lev-pic-check');
  markedCheckImgEls.forEach(el => {
    el.classList.add('invisible');
  });
  const coloredLev: NodeListOf<Element> = document.querySelectorAll('.lev-menu');
  if (coloredLev !== null) {
    coloredLev.forEach(el => {
      el.classList.remove('red');
    });
  }
}

const checkButton: HTMLButtonElement | null = document.querySelector('.enter-btn');
if (checkButton !== null) {
  checkButton.addEventListener('click', () => checkAnswer());
}

const userInput: HTMLInputElement | null = document.querySelector('.input-area');
if (userInput !== null) {
  userInput.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      checkAnswer();
    }
  });
}

const helpButton: HTMLButtonElement | null = document.querySelector('.help-btn');
if (helpButton !== null) {
  helpButton.addEventListener('click', () => {
    showHelp();
    addHelpMark();
    if (userInput !== null) {
      userInput.focus();
    }
  });
}

const resetBtn: HTMLButtonElement | null = document.querySelector('.reset-btn');
if (resetBtn !== null) {
  resetBtn.addEventListener('click', () => {
    getResetGame();
  });
}
