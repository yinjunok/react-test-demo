import React, { Component } from 'react';
import Input from './input/Input';
import Footer from './footer/Footer';
import ListPanel from './list-panel/ListPanel';
import LogPanel from './log-panel/LogPanel';
import { Consumer } from './store/Store';

class App extends Component {
  render() {
    return (
      <div className="container" style={{ marginTop: 20 }}>
        <div className="row">
          <div className="col">
            <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Todo App</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Consumer>
              {
                (todo) => (
                  <Input
                    addTodo={todo.addTodo}
                  />
                )
              }
            </Consumer>
            
            <Consumer>
              {
                (todo) => (
                  <ListPanel
                    show={todo.show}
                    todoList={todo.todoList}
                    update={todo.toggleStatus}
                    deleted={todo.deleteTodo}
                  />
                )
              }
            </Consumer>
            <Consumer>
              {
                (todo) => (
                  <Footer
                    show={todo.show}
                    toggleShow={todo.toggleShow}
                  />
                )
              }
            </Consumer>
          </div>
          <div className="col-md-5">
            <Consumer>
              {
                (todo) => (
                  <LogPanel logList={todo.logList} />
                )
              }
            </Consumer>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
