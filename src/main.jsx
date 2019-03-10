import React from 'react';
import ReactDOM from 'react-dom';

import MouseTooltip from './MouseTooltip';

const buttonStyle = {
  background: 'seagreen',
  color: 'white',
  padding: '5 10',
  border: 'solid 1px darkslategray',
  cursor: 'pointer',
};

class Preview extends React.Component {
  state = {
    isMouseTooltipVisible: false,
  };

  toggleMouseTooltip = () => {
    this.setState(prevState => ({ isMouseTooltipVisible: !prevState.isMouseTooltipVisible }));
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleMouseTooltip} style={buttonStyle}>
          Toggle mouse tooltip
        </button>
        <MouseTooltip
          visible={this.state.isMouseTooltipVisible}
          offsetX={15}
          offsetY={10}
        >
          <span>Follow the cursor!</span>
        </MouseTooltip>
      </div>
    );
  }
}

ReactDOM.render(<Preview />, document.getElementById('app'));
