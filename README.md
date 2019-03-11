# react-sticky-mouse-tooltip
React tooltip component that follow mouse cursor. You can pass as this tooltip children any HTML element or other React component.

<p align="center">
  <img src="preview.gif" alt="Component functionality preview">
</p>

## Installation
`npm install react-sticky-mouse-tooltip --save`

or

`yarn add react-sticky-mouse-tooltip`

## Example
```js
import React from 'react';
import MouseTooltip from 'react-sticky-mouse-tooltip';

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
```

## Attributes
| Attribute | Description | Type | Required | Default value |
| --- | --- | --- | --- | --- |
| visible | Visibility of component. | ```boolean``` | No | ```true``` |
| offsetX | Offset along X axis. | ```number``` | No | ```0``` |
| offsetY | Offset along Y axis. | ```number``` | No | ```0``` |
| className | Tooltip ```div``` class name. | ```string``` | No | - |
| style | Styles properties of tooltip ```div```. | ```object``` | No | - |

## License
MIT
