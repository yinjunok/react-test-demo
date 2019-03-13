import * as React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
        <ul className="nav nav-pills nav-fill" style={{ marginTop: 15 }}>
          <li className="nav-item">
            <button type="button" className="btn btn-primary btn-block">全部</button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-light btn-block">未完成</button>
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-light btn-block">已完成</button>
          </li>
        </ul>
    );
  }
}
