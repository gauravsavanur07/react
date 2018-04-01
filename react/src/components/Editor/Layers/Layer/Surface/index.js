import flow from 'lodash/flow';
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import dimensions from 'react-dimensions';
import css from 'react-css-modules';
import cn from 'classnames';

import List from '../../../../List';
import ItemTypes from '../../../ItemTypes';
import snap from '../../../../../lib/snap';

import ResizableFilter from '../ResizableFilter';
import dropTarget from './dropTarget';
import styles from './styles';

const {
  bool,
  number,
  string,
  object,
  func
} = PropTypes;

export class Surface extends Component {
  static propTypes = {
    className: string,

    id: string.isRequired,
    type: string.isRequired,

    snapToGrid: bool,
    cellSize: number,

    filterTypes: object.isRequired,
    filters: object.isRequired,

    containerWidth: number.isRequired,
    containerHeight: number.isRequired,

    duration: number,

    onMoveFilter: func.isRequired,
    onResizeFilter: func.isRequired,

    onToggleFilterVisibility: func.isRequired,
    onToggleFilterLocked: func.isRequired,
    onDestroyFilter: func.isRequired,

    isOver: bool,
    canDrop: bool,
    connectDropTarget: func.isRequired
  };

  // TODO: It should be just 1 single function, not 2

  moveFilter(id, sourceLayerId, targetLayerId, x) {
    const { duration, cellSize, snapToGrid, containerWidth } = this.props;

    const cellCount = Math.floor(containerWidth / cellSize);
    const timeSlot = duration / cellCount;

    const val = x * duration / containerWidth;
    const offset = snapToGrid ? snap(val, timeSlot) : val;

    this.props.onMoveFilter(id, sourceLayerId, targetLayerId, offset);
  }

  @autobind
  resizeFilter(id, x, width, factor) {
    const { filters, duration, containerWidth } = this.props;
    const timeline = filters[id].timeline;

    // (timeline.offset + offsetDelta) / duration =
    //                    (x + xDelta) / containerWidth
    //
    // <=>
    //
    // offsetDelta = (x + xDelta) * duration / containerWidth - timeline.offset

    const offsetDelta = x * duration / containerWidth - timeline.offset;
    const durationDelta = width * duration / containerWidth - timeline.duration;

    // (timeline.offset + offsetDelta) / duration =
    //                    (x + xDelta) / containerWidth

    console.log(
      `%c ${offsetDelta}, ${durationDelta}`,
      'background-color: #ffa; color: #000'
    );

    this.props.onResizeFilter(id, offsetDelta, durationDelta, factor);
  }

  @autobind
  renderFilter(filter) {
    const {
      id,
      snapToGrid,
      cellSize,
      onToggleFilterVisibility,
      onToggleFilterLocked,
      onDestroyFilter,
      duration,
      containerWidth
    } = this.props;

    const { timeline } = filter;

    const x = containerWidth * timeline.offset / duration;
    const width = containerWidth * timeline.duration / duration;

    console.log(
      `%c (${x}, ${width})`,
      'background-color: darkred; color: #fff'
    );

    const filterProps = {
      x: snapToGrid ? snap(x, cellSize) : x,
      width: snapToGrid ? snap(width, cellSize) : width,
      layerId: id
    };

    return (
      <List.Item key={filter.id}>
        <ResizableFilter {...{ ...filter, ...filterProps } }
          onResize={this.resizeFilter}
          onToggleVisibility={onToggleFilterVisibility}
          onToggleLocked={onToggleFilterLocked}
          onDestroy={onDestroyFilter}
        />
      </List.Item>
    );
  }

  render() {
    const {
      className,
      filters,
      connectDropTarget,
      isOver,
      canDrop
    } = this.props;

    const styleName = cn('layer-surface', {
      over: isOver,
      droppable: canDrop
    });

    return connectDropTarget(
      <div { ...{ styleName, className } }>
        <List className={styles.list}>
          {Object.values(filters).map(this.renderFilter)}
        </List>
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
});

/* eslint-disable new-cap */
export default flow(
  css(styles, { allowMultiple: true }),
  DropTarget([
    ItemTypes.FilterType,
    ItemTypes.Filter
  ], dropTarget, collect),
  dimensions()
)(Surface);
/* eslint-enable new-cap */
