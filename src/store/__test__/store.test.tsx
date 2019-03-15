import * as React from 'react';
import { mount } from 'enzyme';
import Store, { ILog, ITodo } from '../Store';

describe('store test', () => {
  it('test add todo', () => {
    const store = mount(<Store />);

    (store.instance() as Store).addTodo('一条 todo');
    const todo = { id: 0, content: '一条 todo', status: false }
    expect(store.state('todoList')).toEqual([ todo ]);
    expect((store.state('logList') as ILog[])[0].todo).toEqual(todo);
  });

  it('delete todo', () => {
    const store = mount(<Store />);
    const todo = { id: 0, content: '一条 todo', status: false }
    
    store.setState({
      todoList: [todo]
    });

    (store.instance() as Store).deleteTodo(0);
    expect((store.state('todoList') as ITodo[]).length).toBe(0);

    expect((store.state('logList') as ILog[]).length).toBe(1);
  });

  it('toggle todo state', () => {
    const store = mount(<Store />);
    const todo = { id: 0, content: '一条 todo', status: false }
    
    store.setState({
      todoList: [todo]
    });

    (store.instance() as Store).toggleStatus(0);
    expect((store.state('todoList') as ITodo[])).toEqual([{ id: 0, content: '一条 todo', status: true }]);

    expect((store.state('logList') as ILog[]).length).toBe(1);
  });
});
