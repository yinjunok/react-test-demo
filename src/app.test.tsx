import { ElementHandle } from 'puppeteer';
import { initPage } from './test-util';

jest.setTimeout(30000);

describe('添加 todo 测试', () => {
  it('点击确认按钮', async () => {
    const { page, browser } = await initPage();
    try {
      const button = await page.$('.input-group button');
      const input = await page.$('.input-group input');
      
      if (input !== null && button !== null) {
        await input.focus();
        await input.type('一条 todo', { delay: 100 });
        const text = await page.evaluate(input => {
          return input.value;
        }, input);
        expect(text).toBe('一条 todo');

        await button.click();
        const todoItems = await page.$$('.list-panel .list-group .list-group-item');
        expect(todoItems.length).toBe(1);

        const logItems = await page.$$('.log-panel .list-group .list-group-item');
        expect(logItems.length).toBe(1);
      }
    } finally {
      browser.close();
    }
  });

  it('按回车键', async () => {
    const { page, browser } = await initPage();
    try {
      const button = await page.$('.input-group button');
      const input = await page.$('.input-group input');
      
      if (input !== null && button !== null) {
        await input.focus();
        await input.type('一条 todo', { delay: 100 });
        const text = await page.evaluate(input => {
          return input.value;
        }, input);
        expect(text).toBe('一条 todo');

        await input.press('Enter');
        const todoItems = await page.$$('.list-panel .list-group .list-group-item');
        expect(todoItems.length).toBe(1);

        const logItems = await page.$$('.log-panel .list-group .list-group-item');
        expect(logItems.length).toBe(1);
      }
    } finally {
      browser.close();
    }
  });
});

describe('todo 操作', () => {
  it('改变 todo 状态操作', async () => {
    const { page, browser } = await initPage();

    try {
      const button = await page.$('.input-group button');
      const input = await page.$('.input-group input');
  
      if (button !== null && input !== null) {
        await input.focus();
        for (let i = 0; i < 10; ++i) {
          await input.type(`${i}. 任务列表`, { delay: 50 });
          await input.press('Enter');
        }

        const todoItems = await page.$$('.list-panel .list-group .list-group-item');
        for (let i = 0; i < 5; i++) {
          const checkbox = await todoItems[i].$('input[type="checkbox"]');
          await (checkbox as ElementHandle).click();
        }
        const listPanel = await page.$('.list-panel');
        const completed = await (listPanel as ElementHandle).$$('label.completed-todo');
        expect(completed.length).toBe(5);
      }
    } finally {
      await browser.close();
    }
  });

  it('切换 footer show', async () => {
    const { page, browser } = await initPage();

    try {
      const input = await page.$('.input-group input');
  
      if (input !== null) {
        await input.focus();
        for (let i = 0; i < 10; ++i) {
          await input.type(`${i}. 任务列表`, { delay: 50 });
          await input.press('Enter');
        }
        expect((await page.$$('.list-panel .list-group .list-group-item')).length).toBe(10);
        const todoItems = await page.$$('.list-panel .list-group .list-group-item');
        for (let i = 0; i < 4; i++) {
          const checkbox = await todoItems[i].$('input[type="checkbox"]');
          await (checkbox as ElementHandle).click();
        }
        
        const footer = await page.$$('.toggle-show .nav-item button');
        await footer[1].click();
        expect((await page.$$('.list-panel .list-group .list-group-item')).length).toBe(6);
        
        await page.waitFor(2000);
        await footer[2].click();
        expect((await page.$$('.list-panel .list-group .list-group-item')).length).toBe(4);

        await page.waitFor(2000);
        await footer[0].click();
        expect((await page.$$('.list-panel .list-group .list-group-item')).length).toBe(10);
      }
    } finally {
      await browser.close();
    }
  });

  it('删除 todo', async () => {
    const { page, browser } = await initPage();

    try {
      const input = await page.$('.input-group input');
  
      if (input !== null) {
        await input.focus();
        for (let i = 0; i < 10; ++i) {
          await input.type(`${i}. 任务列表`, { delay: 50 });
          await input.press('Enter');
        }
        expect((await page.$$('.list-panel .list-group .list-group-item')).length).toBe(10);
   
        const deleteBtn = await page.$$('.list-panel button[type="button"]');
        for (let i = 0; i < 5; i++) {
          await deleteBtn[i].click();
        }

        expect((await page.$$('.list-panel .list-group .list-group-item')).length).toBe(5);
      }
    } finally {
      await browser.close();
    }
  });
});
