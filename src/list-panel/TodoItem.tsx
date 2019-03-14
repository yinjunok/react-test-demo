import * as React from 'react';
import { ITodo } from '../store/Store';

export interface ITodoItemProps {
  todo: ITodo;
  deleteTodo: () => void;
  toggleState: () => void;
}

const TodoItem = ({ todo,  deleteTodo, toggleState }: ITodoItemProps) => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    <div className="custom-control custom-checkbox">
      <input type="checkbox" onChange={toggleState} className="custom-control-input" id={`todo-item-${todo.id}`} />
      <label className="custom-control-label todo-label" htmlFor={`todo-item-${todo.id}`}>{todo.content}</label>
    </div>
    <button type="button" className="btn btn-light todo-delete" onClick={deleteTodo}>×</button>
  </li>
);

export default TodoItem;
