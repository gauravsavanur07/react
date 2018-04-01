import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { DragSource } from 'react-dnd';
import css from 'react-css-modules';

import { ItemTypes } from '../../constants';
import styles from './styles';

const { func, bool } = PropTypes;

const knightSource = {
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item:
    //
    // for filter it would be filter type, etc.
    // something that describes draggable source
    return {}; // <-- monitor.getItem returns this
  },

  // -
  // This method is a good place to fire an action
  endDrag(props, monitor, component) {
    // * getDropResult with a filter instance
    // * fire an action
    return {};
  }

  // -
  // canDrag(props, monitor) {
  // },

  // -
  // If your component gets unmounted while dragged
  // (like a card in Kanban board dragged between lists)
  // you can implement something like this to keep its
  // appearance dragged
  // isDragging(props, monitor) {
  // }
};

// returns a plain object of the props to inject into component
function collect(connect, monitor) {
  // user connect object to
  // assign roles to your component's DOM nodes
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

export const Knight = ({
  connectDragSource,
  connectDragPreview,
  isDragging
}) => connectDragPreview(
  <div styleName='preview'>
    <div styleName='smth'>
      {`Ω`}
    </div>
    {connectDragSource(
      <span styleName={ isDragging ? 'dragging' : 'normal' }>
        {`♘`}
      </span>
    )}
  </div>
);

Knight.propTypes = {
  connectDragSource: func.isRequired,
  connectDragPreview: func.isRequired,
  isDragging: bool.isRequired
};

/* eslint-disable new-cap */
export default compose(
  DragSource(
    ItemTypes.KNIGHT,
    knightSource,
    collect
  ),
  css(styles)
)(Knight);
/* eslint-enable new-cap */
