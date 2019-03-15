import * as React from 'react';
import { mount } from 'enzyme';
import Input from '../Input';

describe('渲染测试', () => {
  it('', () => {
    const input = mount(<Input addTodo={() => {}} />);

    expect(input.exists('.input-group')).toBe(true);
    expect(input.find('input').length).toBe(1);
    expect(input.find('.btn.btn-primary').length).toBe(1);
  });
});

describe('功能测试', () => {
  it('addTodo 回调, 点击 button', () => {
    const addTodo = jest.fn(content => content);
    const input = mount(<Input addTodo={addTodo} />);

    input.setState({ content: '测试文字' });
    input.find('button').at(0).simulate('click');
    expect(input.state('content')).toBe('');
    expect(addTodo.mock.calls[0][0]).toBe('测试文字');
  });

  it('addTodo 回调, 按回车', () => {
    const addTodo = jest.fn(content => content);
    const input = mount(<Input addTodo={addTodo} />);

    input.setState({ content: '测试文字' });
    input.find('input').at(0).simulate('keypress', { key: 'Enter' })
    expect(input.state('content')).toBe('');
    expect(addTodo.mock.calls[0][0]).toBe('测试文字');
  });
});
