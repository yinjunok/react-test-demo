import React from 'react';

interface IContext extends IStoreState {
  toggleShow: (id: TShow) => void,
  toggleStatus: (id: number) => void,
  deleteTodo: (id: number) => void,
  addTodo: (content: string) => void
}
const { Provider, Consumer } = React.createContext<IContext>(
  {
    show: 'all' as TShow,
    todoList: [],
    logList: [],
    toggleShow: (id: TShow) => {},
    toggleStatus: (id: number) => {},
    deleteTodo: (id: number) => {},
    addTodo: (content: string) => {}
  }
);

export interface ITodo {
  id: number;
  status: boolean;
  content: string;
}

// 增删改
// 8:19:30 增加 ***
// 8:19:30 更改 *** 状态
// 8:19:30 删除 ***
export type TAction = 'add' | 'deleted' | 'update';
export interface ILog {
  timestamp: number;
  action: TAction;
  todo: ITodo;
}

export type TShow = 'all' | 'unCompleted' | 'completed';
export interface IStoreState {
  show: TShow;
  todoList: ITodo[];
  logList: ILog[];
}

let ID = 0;
class Store extends React.Component<{}, IStoreState> {
  state = {
    show: 'all' as TShow,
    todoList: [],
    logList: []
  }

  /**
   * 新增 todo
   *
   * @memberof Store
   * @param {string} content 新 todo 内容
   */
  addTodo = (content: string) => {
    const newTodo = {
      id: ID++,
      status: false,
      content,
    }

    this.setState({
      todoList: [
        newTodo,
        ...this.state.todoList,
      ],
      logList: [
        this.createLog(newTodo, 'add'),
        ...this.state.logList,
      ],
    });
  }

  /**
   * 删除 tod
   *
   * @memberof Store
   * @param {number} id 要删除 todo 的 id
   */
  deleteTodo = (id: number) => {
    const { todoList } = this.state;
    const [ deletedTodo ] = todoList.filter((todo: ITodo) => todo.id === id);

    this.setState({
      todoList: todoList.filter((todo: ITodo) => todo.id !== id),
      logList: [
        this.createLog(deletedTodo, 'deleted'),
        ...this.state.logList,
      ]
    });
  }

  /**
   * 更新 todo 状态
   *
   * @memberof Store
   * @param {number} id 要更新的 todo
   */
  toggleStatus = (id: number) => {
    const { todoList } = this.state;
    
    const [ toggleTodo ] = todoList.filter((todo: ITodo) => todo.id === id);
    this.setState({
      todoList: todoList.map((todo: ITodo) => todo.id === id ? { ...todo, status: !todo.status } : todo),
      logList: [
        this.createLog({ ...(toggleTodo as ITodo), status: !(toggleTodo as ITodo).status }, 'update'),
        ...this.state.logList,
      ]
    });
  }

  /**
   * 展示类型
   *
   * @memberof Store
   * @param {Show} show 新类型
   */
  toggleShow = (show: TShow) => {
    if (show !== this.state.show) {
      this.setState({
        show,
      });
    }
  }

  render() {
    const value = {
      show: this.state.show,
      todoList: this.state.todoList,
      logList: this.state.logList,

      toggleShow: this.toggleShow,
      toggleStatus: this.toggleStatus,
      deleteTodo: this.deleteTodo,
      addTodo: this.addTodo
    };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    );
  }

  /**
   * 创建 log
   *
   * @memberof Store
   * @param {ITodo} todo 更改的 todo
   * @param {Action} action 日志动作
   * @returns {ILog}
   */
  private createLog = (todo: ITodo, action: TAction): ILog => {
    const newLog: ILog = {
      todo: { ...todo },
      timestamp: Date.now(),
      action,
    }
    return newLog;
  }

}

export {
  Consumer
};
export default Store;
