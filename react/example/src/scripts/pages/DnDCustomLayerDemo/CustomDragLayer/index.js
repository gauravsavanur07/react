import flow from 'lodash/flow';

import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import css from 'react-css-modules';

import DragPreview from '../DragPreview';

import styles from './styles';

const {
  bool,
  number,
  string,
  object,
  shape
} = PropTypes;

const getItemStyle = props => {
  const {
    initialOffset,
    currentOffset,
    snapToGrid,
    cellSize
  } = props;

  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;

  if (snapToGrid) {
    x -= initialOffset.x;
    x = Math.round(x / cellSize) * cellSize;
    x += initialOffset.x;
  }

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform
  };
};

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
});

export class CustomDragLayer extends Component {
  static propTypes = {
    item: object,
    itemType: string,
    initialOffset: shape({
      x: number.isRequired,
      y: number.isRequired
    }),
    currentOffset: shape({
      x: number.isRequired,
      y: number.isRequired
    }),
    isDragging: bool,

    snapToGrid: bool,
    cellSize: number.isRequired
  };

  render() {
    const { item, isDragging } = this.props;
    if (!isDragging) return null;

    const style = getItemStyle(this.props);

    return (
      <div styleName='drag-layer'>
        <div style={style}>
          <DragPreview {...item} />
        </div>
      </div>
    );
  }
}

/* eslint-disable new-cap */
export default flow(
  css(styles),
  DragLayer(collect)
)(CustomDragLayer);
/* eslint-endable new-cap */
