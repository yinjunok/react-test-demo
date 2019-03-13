import React, { Component } from 'react';
import Input from './input/Input';
import Footer from './footer/Footer';
import ListPanel from './list-panel/ListPanel';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
          <Input />
          <ListPanel />
          <Footer />
          </div>
          <div className="col-md-4">
            操作日志
          </div>
        </div>
      </div>
    );
  }
}

export default App;
