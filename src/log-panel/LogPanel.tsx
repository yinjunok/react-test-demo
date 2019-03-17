import * as React from 'react';
import { ILog } from '../store/Store';
import './style.css';

interface ILogPanelProps {
  logList: ILog[];
}

const action = {
  add: '增加',
  deleted: '删除',
  update: '更新',
}

const classType = {
  add: 'alert-success',
  deleted: 'alert-danger',
  update: 'alert-primary',
}

const LogPanel: React.FunctionComponent<ILogPanelProps> = ({ logList }) => (
  <div className="card log-panel">
    <div className="card-header">
      操作日志
    </div>
    <div className="log-list">
      <ul className="list-group list-group-flush">
        {
          logList.map(log => {
            const time = new Date(log.timestamp);
            return (
              <li key={log.timestamp} className="list-group-item">
                {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
                <span
                  style={{ paddingLeft: 5, paddingRight: 5, margin: '0 5px' }}
                  className={classType[log.action]}>
                  {action[log.action]}
                </span>
                {log.todo.content}
              </li>
            )
          })
        }
      </ul>
    </div>
  </div>
);

export default LogPanel;
