import * as React from 'react';
import './style.css';

export default class ListPanel extends React.Component {
  render() {
    return (
      <div className="list-panel">
        <ul className="list-group">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    );
  }
}
