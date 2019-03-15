import * as React from 'react';
import { mount } from 'enzyme';
import Footer from '../Footer';

describe('渲染测试', () => {
  it('相应节点是否存在', () => {
    const footer = mount(<Footer show='all' toggleShow={() => {}} />);
    expect(footer.exists('.nav')).toBe(true);
    expect(footer.find('.nav-item').length).toBe(3);
    
    expect(footer.find('.nav-item button').at(0).hasClass('btn-primary')).toBe(true);
    
    footer.setProps({ show: 'unCompleted' });
    expect(footer.find('.nav-item button').at(1).hasClass('btn-primary')).toBe(true);
  
    footer.setProps({ show: 'completed' });
    expect(footer.find('.nav-item button').at(2).hasClass('btn-primary')).toBe(true);
  });
});

describe('回调测试', () => {
  it('回调是否正常执行', () => {
    const toggleShow = jest.fn(show => show);
    const footer = mount(<Footer show='all' toggleShow={toggleShow} />);
    
    footer.find('.nav-item').at(0).find('button').simulate('click');
    footer.find('.nav-item').at(1).find('button').simulate('click');
    footer.find('.nav-item').at(2).find('button').simulate('click');

    expect(toggleShow.mock.calls.length).toBe(3);
    expect(toggleShow.mock.calls[0][0]).toBe('all');
    expect(toggleShow.mock.calls[1][0]).toBe('unCompleted');
    expect(toggleShow.mock.calls[2][0]).toBe('completed');
  });
});
