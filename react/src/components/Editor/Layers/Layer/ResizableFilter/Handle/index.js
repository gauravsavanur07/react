import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import styles from './styles';

const { number, string, func } = PropTypes;

export class Handle extends Component {
  static propTypes = {
    className: string,
    id: string.isRequired,
    factor: number.isRequired,
    onResizing: func.isRequired,
    onResized: func.isRequired
  };

  constructor(props) {
    super(props);

    this.direction = props.factor > 0 ?
      'right' : 'left';
  }

  getX = () => this.handle.getBoundingClientRect()[this.direction];

  @autobind
  handleMouseDown() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  @autobind
  handleMouseUp() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.props.onResized(this.state.delta, this.props.factor);
  }

  @autobind
  handleMouseMove(e) {
    const { factor, onResizing } = this.props;
    const delta = e.clientX - this.getX();
    this.setState({ delta });
    onResizing(delta, factor);
  }

  render() {
    const { className } = this.props;
    const styleName = cn('handle', this.direction);

    return (
      <div {...{ styleName, className } }
        ref={r => this.handle = r}
        onMouseDown={this.handleMouseDown} />
    );
  }
}

export default css(Handle, styles, { allowMultiple: true });
