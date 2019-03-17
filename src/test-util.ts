import puppeteer from 'puppeteer';

async function initPage(width: number = 768, height: number = 800) {
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

export {
  initPage,
}
