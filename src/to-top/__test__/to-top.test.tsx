import * as React from 'react';
import { shallow } from 'enzyme';
import puppeteer, { ElementHandle } from 'puppeteer';
import ToTop from '../ToTop';

jest.setTimeout(30000);

describe('test 渲染', () => {
  it('should be show', () => {
    const toTop = shallow(<ToTop />);
    toTop.setState({ show: true });
    expect(toTop.hasClass('show')).toBe(true);
    expect(toTop.exists('.hide')).toBe(false);
  });

  it('should not be show', () => {
    const toTop = shallow(<ToTop />);
    toTop.setState({ show: false });
    expect(toTop.hasClass('hide')).toBe(true);
    expect(toTop.exists('.show')).toBe(false);
  });
});

async function initPage(width: number = 360, height: number = 400) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\chromium\\chrome.exe',
    headless: false,
  });
  const page = await browser.newPage();

  page.setViewport({
    width,
    height,
  });
  await page.goto('http://localhost:3000/');

  return { page, browser };
}

describe('test event handler', () => {
  it('页面载入时', async () => {
    const { page, browser } = await initPage(360, 400);
    try {
      const toTop = await page.$('.to-top');
      const body = await page.$('body');
      if (body !== null) {
        const box = await body.boxModel();
        
        if (box !== null) {
          if (box.height > 400) {
            expect(toTop).not.toBeNull();
          } else {
            expect(toTop).toBeNull();
          }
        }
      }
    } finally {
      browser.close();
    }
  });

  it('when viewport change', async () => {
    const { page, browser } = await initPage(360, 400);
    try {
      const toTop = await page.$('.to-top');
      const body = await page.$('body');
      
      if (body !== null) {
        const bodyBox = await body.boxModel();
        
        if (bodyBox !== null) {
          if (bodyBox.height > 400) {
            expect(toTop).not.toBeNull();

            await page.setViewport({
              width: 360,
              height: bodyBox.height - 10,
            });

            const toTop_1 = await page.$('.to-top');
            expect(toTop_1).not.toBeNull();
          } else {
            expect(toTop).toBeNull();
            await page.setViewport({
              width: 360,
              height: bodyBox.height + 10,
            });
            const toTop_1 = await page.$('.to-top');
            expect(toTop_1).toBeNull();
          }
        }
      }
    } finally {
      browser.close();
    }
  });
});
