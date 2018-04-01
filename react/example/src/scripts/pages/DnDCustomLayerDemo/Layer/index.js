import flow from 'lodash/flow';

import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import css from 'react-css-modules';

import ItemTypes from '../ItemTypes';
import LayerContainer from '../LayerContainer';
import DraggableFilter from '../DraggableFilter';

import dropTarget from './dropTarget';
import styles from './styles';

const {
  bool,
  number,
  object,
  func
} = PropTypes;

export class Layer extends Component {
  static propTypes = {
    filters: object.isRequired,
    snapToGrid: bool,
    cellSize: number,
    connectDropTarget: func.isRequired,
    onMove: func.isRequired
  };

  static defaultProps = {
    snapToGrid: true,
    cellSize: 10
  };

  move(id, x) {
    if (this.props.onMove) {
      this.props.onMove(id, x);
    }
  }

  render() {
    const {
      filters,
      connectDropTarget,
      ...other
    } = this.props;

    return connectDropTarget(
      <div styleName='layer'>
        <LayerContainer {...other}>
          {Object.keys(filters).map(id =>
            <DraggableFilter key={id}
              id={id} {...filters[id]} />
          )}
        </LayerContainer>
      </div>
    );
  }
}

const collect = (connect, _monitor) => ({
  connectDropTarget: connect.dropTarget()
});

/* eslint-disable new-cap */
export default flow(
  css(styles),
  DropTarget(ItemTypes.Filter, dropTarget, collect)
)(Layer);
/* eslint-enable new-cap */
