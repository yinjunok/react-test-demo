import * as React from 'react';
import './style.css';

interface IToTopState {
  show: boolean;
}

export default class ToTop extends React.Component<{}, IToTopState> {
  state = {
    show: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.showHandler);
    this.showHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.showHandler);
  }

  render() {
    const { show } = this.state;

    return (
      <div 
        className={`to-top ${show ? 'show' : 'hide'}`}
        onClick={this.toTop}
      >
        Top
      </div>
    );
  }

  private showHandler = () => {
    const bodyHeight = document.body.scrollHeight;
    const winHeight = window.innerHeight;

    if (bodyHeight > winHeight) {
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: false,
      });
    }
  }

  private toTop = () => {
    window.scrollTo(0, 0);
  }
}