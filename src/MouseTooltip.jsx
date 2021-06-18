import React from 'react';
import PropTypes from 'prop-types';

class MouseTooltip extends React.PureComponent {
  static defaultProps = {
    visible: true,
    offsetX: 0,
    offsetY: 0,
  };

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  state = {
    xPosition: 0,
    yPosition: 0,
    mouseMoved: false,
    listenerActive: false,
    shouldFlipHorizontally: false,
    shouldFlipVertically: false,
  };

  componentDidMount() {
    this.addListener();
  }

  componentDidUpdate() {
    this.updateListener();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  getTooltipPosition = ({ clientX: xPosition, clientY: yPosition }) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const containerWidth = this.containerRef.current.clientWidth;
    const containerHeight = this.containerRef.current.clientHeight;
    const shouldFlipHorizontally = (xPosition + containerWidth > screenWidth);
    const shouldFlipVertically = (yPosition + containerHeight > screenHeight);
    this.setState({
      xPosition,
      yPosition,
      mouseMoved: true,
      shouldFlipHorizontally,
      shouldFlipVertically,
    });
  };

  addListener = () => {
    window.addEventListener('mousemove', this.getTooltipPosition);
    this.setState({ listenerActive: true });
  };

  removeListener = () => {
    window.removeEventListener('mousemove', this.getTooltipPosition);
    this.setState({ listenerActive: false });
  };

  updateListener = () => {
    if (!this.state.listenerActive && this.props.visible) {
      this.addListener();
    }

    if (this.state.listenerActive && !this.props.visible) {
      this.removeListener();
    }
  };

  render() {
    const left = (this.state.shouldFlipHorizontally
      ? this.state.xPosition - this.containerRef.current.clientWidth - this.props.offsetX
      : this.state.xPosition + this.props.offsetX);
    const top = (this.state.shouldFlipVertically
      ? this.state.yPosition - this.containerRef.current.clientHeight - this.props.offsetY
      : this.state.yPosition + this.props.offsetY);
    return (
      <div
        className={this.props.className}
        ref={this.containerRef}
        style={{
          display: this.props.visible && this.state.mouseMoved ? 'block' : 'none',
          position: 'fixed',
          top,
          left,
          ...this.props.style,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

MouseTooltip.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default MouseTooltip;
