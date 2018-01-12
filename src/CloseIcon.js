import React from 'react';
import PropTypes from 'prop-types';


export default class CloseIcon extends React.Component {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    thickness: PropTypes.number,
  }

  static defaultProps = {
    width: 12,
    height: 12,
    color: 'white',
    thickness: 2,
  }

  render() {

    const wrapStyle = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      display: 'block',
      position: 'relative',
      transform: 'rotate(-45deg)',
    }

    const hStyle = {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)',
      height: `${this.props.thickness}px`,
      background: this.props.color,
      display: 'block',
      width: '100%',
    }

    const vStyle = {
      position: 'absolute',
      left: '50%',
      top: 0,
      transform: 'translateX(-50%)',
      width: `${this.props.thickness}px`,
      background: this.props.color,
      display: 'block',
      height: '100%',
    }

    return (
      <span
        className="NotificationBar__close__span"
        style={wrapStyle}>
        <span
          className="NotificationBar__close__span__h"
          style={hStyle} />
        <span
          className="NotificationBar__close__span_v"
          style={vStyle} />
      </span>
    )

  }

}