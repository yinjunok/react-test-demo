import * as React from "react";
import { TShow } from '../store/Store';

interface IFooterProps {
  show: TShow;
  toggleShow: (show: TShow) => void;
}

const Footer: React.FunctionComponent<IFooterProps> = ({ show, toggleShow }) => (
  <ul className="nav nav-pills nav-fill" style={{ margin: '15px 0' }}>
    <li className="nav-item">
      <button
        type="button"
        onClick={() => toggleShow('all')}
        className={`btn ${show === 'all' ? 'btn-primary': ''} btn-block`}
      >
        全部
      </button>
    </li>
    <li className="nav-item">
      <button
        type="button"
        onClick={() => toggleShow('unCompleted')}
        className={`btn ${show === 'unCompleted' ? 'btn-primary': ''} btn-block`}
      >
        未完成
      </button>
    </li>
    <li className="nav-item">
      <button
        type="button"
        onClick={() => toggleShow('completed')}
        className={`btn ${show === 'completed' ? 'btn-primary': ''} btn-block`}
      >
        已完成
      </button>
    </li>
  </ul>
);

export default Footer;
