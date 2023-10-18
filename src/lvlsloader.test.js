/* eslint-disable strict */
const { createLevList } = require('./lvlsloader');

describe('createLevList', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="lev-area"></div>
    `;
  });

  test('createLevList should create 10 HTML Elements', () => {
    createLevList();

    const levItems = document.querySelectorAll('.level-menu');
    expect(levItems.length).toBe(10);
  });

  test('createLevList should add two images to each level', () => {
    createLevList();

    const levItems = document.querySelectorAll('.level-menu');
    levItems.forEach((item) => {
      const iconTip = item.querySelector('.lev-pic-tip');
      const iconCheck = item.querySelector('.lev-pic-check');
      expect(iconTip).toBeTruthy();
      expect(iconCheck).toBeTruthy();
    });
  });

  test('createLevList should create 10 HTML Elements without null elements', () => {
    createLevList();

    const levItems = document.querySelectorAll('.level-menu');
    levItems.forEach((item) => {
      const iconTip = item.querySelector('.lev-pic-tip');
      const iconCheck = item.querySelector('.lev-pic-check');
      const itemChild = item.querySelector('.lev-menu');
      expect(item).not.toBeNull();
      expect(iconTip).not.toBeNull();
      expect(iconCheck).not.toBeNull();
      expect(itemChild).not.toBeNull();
    });
  });
});
