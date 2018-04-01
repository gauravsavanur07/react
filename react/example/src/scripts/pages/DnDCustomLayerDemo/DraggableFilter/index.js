import pick from 'lodash/pick';
import flow from 'lodash/flow';

import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import css from 'react-css-modules';

import ItemTypes from '../ItemTypes';
import Filter from '../Filter';

import styles from './styles';

const {
  bool,
  string,
  number,
  func,
  any
} = PropTypes;

const filterKnownProps = [
  'id',
  'title',
  'x',
  'width',
  'height'
];

const source = {
  beginDrag(props) { return pick(props, ...filterKnownProps); }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

const getTransformStyle = props => {
  const { x } = props;
  const transform = `translate3d(${x}px, 0, 0)`;
  return { transform, WebkitTransform: transform };
};

export class DraggableFilter extends Component {
  static propTypes = {
    id: any.isRequired,
    title: string.isRequired,

    x: number.isRequired,

    width: number.isRequired,
    height: number.isRequired,

    isDragging: bool,
    connectDragPreview: func.isRequired,
    connectDragSource: func.isRequired
  };

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render() {
    const {
      id,
      title,
      width,
      height,
      isDragging,
      connectDragSource,
      ...props
    } = this.props;

    const styleName = isDragging ? 'dragging' : 'normal';
    const style = getTransformStyle(props);
    const known = { styleName, style };
    const filterProps = {
      id,
      title,
      width,
      height
    };

    return connectDragSource(
      <div {...known}>
        <Filter {...filterProps} />
      </div>
    );
  }
}

/* eslint-disable new-cap */
export default flow(
  css(styles),
  DragSource(ItemTypes.Filter, source, collect)
)(DraggableFilter);
  /* eslint-enable new-cap */
