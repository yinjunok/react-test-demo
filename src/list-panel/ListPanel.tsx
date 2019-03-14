import * as React from 'react';
import TodoItem from './TodoItem';
import './style.css';
import { TShow, ITodo } from '../store/Store'

interface IListPanel {
  show: TShow,
  todoList: ITodo[];
  update: (id: number) => void;
  deleted: (id: number) => void;
}

export default class ListPanel extends React.Component<IListPanel, {}> {
  render() {
    const { update, deleted } = this.props;
    const showList = this.showList();
  
    return (
      <div className="list-panel">
        <ul className="list-group">
          {
            showList.map((todo) => (
              <TodoItem
                todo={todo}
                deleteTodo={() => deleted(todo.id)}
                toggleState={() => update(todo.id)}
              />
            ))
          }
        </ul>
      </div>
    );
  }

  private showList = (): ITodo[] => {
    const { todoList, show } = this.props;

    switch(show) {
      case 'all':
        return todoList;
      case 'completed':
        return todoList.filter((todo) => todo.status === true);
      case 'unCompleted':
        return todoList.filter((todo) => todo.status === false);
    }
  }
}
