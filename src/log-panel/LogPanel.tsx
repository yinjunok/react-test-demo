import * as React from 'react';
import './style.css';

export default class LogPanel extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-header">
          操作日志
        </div>
          <div className="log-list">
            <ul className="list-group list-group-flush">
              <li className="list-group-item disabled">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
            </ul>
          </div>
      </div>
    );
  }
}
