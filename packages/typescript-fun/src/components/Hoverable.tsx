import React, { ReactElement, Component } from 'react';

let isHoverEnabled = false;

if (typeof window !== 'undefined') {
  /**
   * Web browsers emulate mouse events (and hover states) after touch events.
   * This code infers when the currently-in-use modality supports hover
   * (including for multi-modality devices) and considers "hover" to be enabled
   * if a mouse movement occurs more than 1 second after the last touch event.
   * This threshold is long enough to account for longer delays between the
   * browser firing touch and mouse events on low-powered devices.
   */
  const HOVER_THRESHOLD_MS = 1000;
  let lastTouchTimestamp = 0;

  const enableHover = () => {
    if (
      isHoverEnabled ||
      Date.now() - lastTouchTimestamp < HOVER_THRESHOLD_MS
    ) {
      return;
    }
    isHoverEnabled = true;
  };

  const disableHover = () => {
    lastTouchTimestamp = Date.now();
    if (isHoverEnabled) {
      isHoverEnabled = false;
    }
  };

  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('touchmove', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);
}

interface HoverableProps {
  children: ((hover: boolean) => ReactElement) | ReactElement;
  onHoverIn?: () => void;
  onHoverOut?: () => void;
}

interface HoverableState {
  isHovered: boolean;
  showHover: boolean;
}

/**
 * Fix hover for touch devices.
 * https://necolas.github.io/react-native-web/docs/?path=/docs/guides-web-recipes--page
 */
export class Hoverable extends Component<HoverableProps, HoverableState> {
  constructor(props: HoverableProps) {
    super(props);
    this.state = { isHovered: false, showHover: true };
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._handleGrant = this._handleGrant.bind(this);
    this._handleRelease = this._handleRelease.bind(this);
  }

  _handleMouseEnter() {
    if (isHoverEnabled && !this.state.isHovered) {
      const { onHoverIn } = this.props;
      if (onHoverIn) onHoverIn();
      this.setState(state => ({ ...state, isHovered: true }));
    }
  }

  _handleMouseLeave() {
    if (this.state.isHovered) {
      const { onHoverOut } = this.props;
      if (onHoverOut) onHoverOut();
      this.setState(state => ({ ...state, isHovered: false }));
    }
  }

  _handleGrant() {
    this.setState(state => ({ ...state, showHover: false }));
  }

  _handleRelease() {
    this.setState(state => ({ ...state, showHover: true }));
  }

  render() {
    const { children } = this.props;
    const child =
      typeof children === 'function'
        ? children(this.state.showHover && this.state.isHovered)
        : children;

    return React.cloneElement(child as any, {
      onMouseEnter: this._handleMouseEnter,
      onMouseLeave: this._handleMouseLeave,
      // prevent hover showing while responder
      onResponderGrant: this._handleGrant,
      onResponderRelease: this._handleRelease,
      // if child is Touchable
      onPressIn: this._handleGrant,
      onPressOut: this._handleRelease,
    });
  }
}
