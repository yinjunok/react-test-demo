import * as React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="card" style={{ marginTop: 15 }}>
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <a className="nav-link active" href="#">Active</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled={true}>Disabled</a>
          </li>
        </ul>
      </div>
    );
  }
}
