import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import Filter from '../Filter';
import styles from './styles';

const { number, string, any } = PropTypes;

export class DragPreview extends Component {
  static propTypes = {
    id: any.isRequired,
    title: string.isRequired,
    width: number.isRequired,
    height: number.isRequired
  };

  // TODO: add smth, try react-motion lol :D

  render() {
    const {
      id,
      title,
      width,
      height,
      ...other
    } = this.props;

    const filterProps = {
      id,
      title,
      width,
      height
    };

    return (
      <div styleName='preview'>
        <Filter dragging {...filterProps} />
      </div>
    );
  }
}

export default css(DragPreview, styles);
