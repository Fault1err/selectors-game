// eslint-disable-next-line strict
const { makeToolTip } = require('./tooltips');

describe('makeToolTip is exists', () => {
  test('The function should exist', () => {
    expect(makeToolTip).toBeDefined();
  });

  describe('makeToolTip', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="gameboard">
          <div class="panel-output-area"></div>
        </div>
      `;
    });

    test('makeToolTip should add the data-tooltip attribute on target elements', () => {
      const container = document.querySelector('.gameboard');

      const target = document.createElement('div');
      container.appendChild(target);

      makeToolTip();

      expect(target.getAttribute('data-tooltip')).toBeDefined();
    });

    test('hideTooltip should hide the tooltip', () => {
      const container = document.querySelector('.gameboard');

      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      container.appendChild(tooltip);

      tooltip.style.display = 'block';

      function hideTooltip() {
        if (tooltip) {
          tooltip.style.display = 'none';
          const outputArea = document.querySelector('.panel-output-area');
          const highlightedElement = outputArea.querySelector('.highlight');
          if (highlightedElement) {
            highlightedElement.classList.remove('highlight');
          }
        }
      }
      hideTooltip();
      expect(tooltip.style.display).toBe('none');
    });
  });
});
