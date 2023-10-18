export function makeToolTip(): void {
  const container = document.querySelector('.gameboard') as HTMLElement;
  const outputArea = document.querySelector('.panel-output-area') as HTMLElement;

  let tooltip: HTMLDivElement | undefined;

  function showTooltip(event: Event) {
    const target: HTMLElement = event.target as HTMLElement;
    const tooltipText: string | null = target.getAttribute('data-tooltip');
    if (tooltipText && tooltip) {
      tooltip.textContent = tooltipText;
      tooltip.style.display = 'block';

      const containerRect: DOMRect = container.getBoundingClientRect();
      const elementRect: DOMRect = target.getBoundingClientRect();
      const tooltipRect: DOMRect = tooltip.getBoundingClientRect();
      const tooltipTop: number = elementRect.top - containerRect.top - tooltipRect.height - 10;
      // eslint-disable-next-line max-len
      const tooltipLeft: number = elementRect.left - containerRect.left + elementRect.width / 2 - tooltipRect.width / 2;
      tooltip.style.top = `${tooltipTop}px`;
      tooltip.style.left = `${tooltipLeft}px`;
    }
  }

  function hideTooltip(): void {
    if (tooltip) {
      tooltip.style.display = 'none';

      const highlightedElement: Element | null = outputArea.querySelector('.highlight');
      if (highlightedElement) {
        highlightedElement.classList.remove('highlight');
      }
    }
  }

  container.addEventListener('mouseover', (event) => {
    const target = event.target as HTMLElement;
    if (target.matches('[data-tooltip]')) {
      showTooltip(event);
    }
  });

  container.addEventListener('mouseout', (event) => {
    const target = event.target as HTMLElement;
    if (target.matches('[data-tooltip]')) {
      hideTooltip();
    }
  });

  if (container.querySelector('[data-tooltip]')) {
    tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    container.appendChild(tooltip);
    hideTooltip();
  }
}
