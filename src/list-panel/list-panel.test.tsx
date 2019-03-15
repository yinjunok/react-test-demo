import * as React from 'react';
import { mount, shallow } from 'enzyme';
import ListPanel from './ListPanel';
import ListItem from './TodoItem';
import { ITodo } from '../store/Store';

function createTodoList(n: number): ITodo[] {
  const todoList: ITodo[] = [];

  for (let i = 0; i < n; ++i) {
    todoList.push({
      id: i,
      content: `内容-${i}`,
      status: false,
    });
  }

  return todoList;
}

describe('渲染测试', () => {
  it('渲染测试', () => {
    const todoList = createTodoList(5);
    const panel = shallow(
      <ListPanel
        show='all'
        todoList={todoList}
        update={() => {}}
        deleted={() => {}}
      />
    );

    expect(panel.find(ListItem).length).toBe(5);

    panel.setProps({ show: 'unCompleted' });
    expect(panel.find(ListItem).length).toBe(5);

    panel.setProps({ show: 'completed' });
    expect(panel.find(ListItem).length).toBe(0);
  });
});

describe('回调测试', () => {
  it('更新回调', () => {
    const update = jest.fn(id => id);

    const todoList = createTodoList(5);
    const panel = shallow(
      <ListPanel
        show='all'
        todoList={todoList}
        update={update}
        deleted={() => {}}
      />
    );

    panel.find(ListItem).at(0).prop('toggleState')();
    expect(update.mock.calls[0][0]).toBe(0);

    panel.find(ListItem).at(1).prop('toggleState')();
    expect(update.mock.calls[1][0]).toBe(1);
  });
});
