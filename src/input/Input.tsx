import * as React from 'react';

export default class Input extends React.Component {
  render() {
    return (
      <div className="input-group input-group-lg">
        <input
          type="text"
          className="form-control"
          placeholder="Input todo"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button">确定</button>
        </div>
      </div>
    );
  }
};
