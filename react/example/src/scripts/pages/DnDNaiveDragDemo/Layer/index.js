import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import css from 'react-css-modules';

import snapToGrid from '../../../utils/snapToGrid';

import ItemTypes from '../ItemTypes';
import Filter from '../Filter';

import styles from './styles';

const { string, func, node } = PropTypes;

const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem();

    // difference between the last recorded client offset of the pointer
    // and the client offset when current the drag operation has started

    const delta = monitor.getDifferenceFromInitialOffset();

    const x = Math.round(item.x + delta.x);
    const y = Math.round(item.y + delta.y);

    const newCoords = props.snapToGrid ? snapToGrid(x, y) : [x, y];

    // in the real app you should fire an action here
    // instead of updating component's state directly
    component.move(item.id, ...newCoords);
  }
};

const collect = (connector, _monitor) => ({
  connectDropTarget: connector.dropTarget()
});

export class Layer extends Component {
  static propTypes = {
    className: string,
    children: node,
    connectDropTarget: func.isRequired
  };

  state = {
    filters: {
      overlay1: { x: 20, y: 80 },
      blur1: { x: 160, y: 20 }
    }
  };

  // this should be a job for reducer in a real app
  move(id, x, y) {
    const { filters } = this.state;

    this.setState({
      filters: {
        ...filters,
        [id]: { x, y }
      }
    });
  }

  render() {
    const {
      className,
      children,
      connectDropTarget,
      ...other
    } = this.props;

    const styleName = 'layer';
    const known = { styleName, className };

    const { filters } = this.state;

    return connectDropTarget(
      <div { ...{ ...known, ...other } } styles={void 0}>
        {Object.keys(filters).map(id => <Filter key={id} id={id} {...filters[id]} />)}
        {children}
      </div>
    );
  }
}

/* eslint-disable new-cap */
export default flow(
  css(styles),
  DropTarget(ItemTypes.Filter, target, collect),
  DragDropContext(HTML5Backend)
)(Layer);
/* eslint-enable new-cap */
