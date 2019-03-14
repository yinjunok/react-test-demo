import * as React from 'react';

interface IInputProps {
  addTodo: (content: string) => void;
}

export default class Input extends React.Component<IInputProps, {}> {
  state = {
    content: '',
  }

  render() {
    const { content } = this.state;
    return (
      <div className="input-group input-group-lg">
        <input
          type="text"
          value={content}
          className="form-control"
          placeholder="Input todo"
          onChange={this.changeHandler}
          onKeyPress={this.onKeyPressHandler}
        />

        <div className="input-group-append">
          <button
            type="button"
            onClick={this.addTodo}
            className="btn btn-primary"
          >
            确定
          </button>
        </div>
      </div>
    );
  }

  private changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      content: e.target.value
    })
  }

  private onKeyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }
  
  private addTodo = () => {
    const { addTodo } = this.props;
    const { content } = this.state;
    if (content === '') {
      return;
    }

    addTodo(content);
    this.setState({
      content: ''
    });
  }
};
