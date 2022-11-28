import React, {
  FunctionComponent, useEffect, useState,
} from 'react';
import { MouseTooltipProps } from './types';

interface Props extends MouseTooltipProps {}

const MouseTooltip: FunctionComponent<Props> = (
  {
    children,
    className,
    visible,
    style,
    offsetX,
    offsetY,
    ...props
  }: Props,
) => {
  const [xPosition, setXPosition] = useState<number>(0);
  const [yPosition, setYPosition] = useState<number>(0);
  const [mouseMoved, setMouseMoved] = useState<boolean>(false);
  const [listenerActivate, setListenerActive] = useState<boolean>(false);

  const getTooltipPosition = ({ clientX, clientY }: MouseEvent) => {
    setXPosition(clientX);
    setYPosition(clientY);
    setMouseMoved(true);
  };

  const addListener = () => {
    window.addEventListener('mousemove', getTooltipPosition);
    setListenerActive(true);
  };

  const removeListener = () => {
    window.removeEventListener('mousemove', getTooltipPosition);
    setListenerActive(false);
  };

  useEffect(() => {
    if (visible && !listenerActivate) {
      addListener();
    } else if (!visible && listenerActivate) {
      removeListener();
    }

    return () => {
      removeListener();
    };
  }, [visible]);

  return (
    <div
      className={className}
      style={{
        display: visible && mouseMoved ? 'block' : 'none',
        position: 'fixed',
        top: yPosition + offsetY,
        left: xPosition + offsetX,
        ...style,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </div>
  );
};

export default MouseTooltip;
