import * as React from 'react';
import { mount } from 'enzyme';
import LogPanel from './LogPanel';
import { ILog } from '../store/Store';

describe('渲染测试', () => {
  it('渲染测试', () => {
    const logList: ILog[]  = [
      {
        timestamp: Date.now(),
        action: 'add',
        todo: {
          id: 0,
          content: '一条日志',
          status: false,
        }
      }
    ];

    const panel = mount(<LogPanel logList={logList} />);
    expect(panel.find('.list-group-item').length).toBe(1);
  });
});
