import pick from 'lodash/pick';
import flowRight from 'lodash/flowRight';
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import css from 'react-css-modules';

import ItemTypes from '../ItemTypes';
import styles from './styles';

const {
  bool,
  number,
  string,
  func,
  node,
  any
} = PropTypes;

// drag source specification
const source = {
  // information then should be available
  // to the drop targets about the drag source
  beginDrag(props) {
    return pick(props, 'id', 'x', 'y');
    // ^---- this is what you'll get in drop()
    // when calling monitor.getItem()
  }
};

// plain object of the props
// to inject into component
const collect = (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  connectDragPreview: connector.dragPreview(),
  isDragging: monitor.isDragging()
});

export const Filter = props => {
  const {
    className,
    handleClassName,
    isDragging,
    connectDragPreview,
    connectDragSource,
    children,

    id, x, y,

    ...other
  } = props;

  const styleName = isDragging ? 'dragging' : 'normal';
  const known = {
    styleName,
    className,
    style: { left: x, top: y }
  };

  const handleProps = {
    styleName: 'handle',
    className: handleClassName
  };

  return connectDragPreview(
    <div {...{ ...known, ...other } }>
      {connectDragSource(<span {...handleProps}>{`◉`}</span>)}
      <span styleName='id'>{id}</span>
      {children}
    </div>
  );
};

Filter.propTypes = {
  className: string,
  handleClassName: string,
  children: node,
  isDragging: bool,
  connectDragPreview: func.isRequired,
  connectDragSource: func.isRequired,

  id: any.isRequired,
  x: number.isRequired,
  y: number.isRequired
};

/* eslint-disable new-cap */
export default flowRight(
  DragSource(ItemTypes.Filter, source, collect),
  css(styles)
)(Filter);
/* eslint-enable new-cap */
