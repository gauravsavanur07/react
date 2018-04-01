import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import css from 'react-css-modules';

import { ItemTypes } from '../../constants';
import { canMoveKnight, moveKnight } from '../../game';
import styles from './styles';

import Square from '../Square';

const { bool, number, node } = PropTypes;

const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.x, props.y);
  },

  // -
  // returned value will be available to the drag source
  // in its endDrag method as monitor.getDropResult()
  drop(props, _monitor) {
    moveKnight(props.x, props.y);
    // create a new filter instance
    // from the current filter type that
    // is being dragged
    //
    // its also may be a good idea
    // to fire an action right here
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

export const BoardSquare = props => {
  const {
    x,
    y,
    children,

    connectDropTarget,
    canDrop,
    isOver
  } = props;

  const black = (x + y) % 2 === 1;

  const overlayStyleName = isOver ?
    (canDrop ? 'green' : 'red') :
    (canDrop ? 'yellow' : 'neutral');

  return connectDropTarget(
    <div styleName='board-square'>
      <Square black={black}>{children}</Square>
      {isOver || canDrop && <div styleName={overlayStyleName} />}
    </div>
  );
};

BoardSquare.propTypes = {
  children: node,
  x: number.isRequired,
  y: number.isRequired,
  isOver: bool
};

/* eslint-disable new-cap */
export default compose(
  DropTarget(ItemTypes.KNIGHT, squareTarget, collect),
  css(styles)
)(BoardSquare);
/* eslint-enable new-cap */
