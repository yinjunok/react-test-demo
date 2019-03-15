import * as React from 'react';
import { mount } from 'enzyme';
import TodoItem from './TodoItem';

describe('渲染测试', () => {
  it('', () => {
    const todo = {
      id: 1,
      content: '一条 todo',
      status: false,
    };

    const todoItem = mount(
      <TodoItem
        todo={todo}
        deleteTodo={() => {}}
        toggleState={() => {}}
      />
    );

    expect(todoItem.find('label').text()).toBe('一条 todo');
    expect(todoItem.find('input[type="checkbox"]').props().checked).toBe(false);
  });
});

describe('回调测试', () => {
  it('删除回调', () => {
    const deleteTodo = jest.fn(() => {});

    const todo = {
      id: 1,
      content: '一条 todo',
      status: false,
    };

    const todoItem = mount(
      <TodoItem
        todo={todo}
        deleteTodo={deleteTodo}
        toggleState={() => {}}
      />
    );

    todoItem.find('button').simulate('click');
    expect(deleteTodo.mock.calls.length).toBe(1);
  });

  it('切换状态回调', () => {
    const toggleState = jest.fn(() => {});

    const todo = {
      id: 1,
      content: '一条 todo',
      status: false,
    };

    const todoItem = mount(
      <TodoItem
        todo={todo}
        deleteTodo={() => {}}
        toggleState={toggleState}
      />
    );

    todoItem.find('input[type="checkbox"]').simulate('change');
    expect(toggleState.mock.calls.length).toBe(1);
  });
});

