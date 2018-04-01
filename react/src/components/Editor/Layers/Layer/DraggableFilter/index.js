import flow from 'lodash/flow';
import pick from 'lodash/pick';

import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import { filterProps } from '../../../../propTypes';
import draggable from '../../../../hoc/draggable';
import ItemTypes from '../../../ItemTypes';
import Filter from '../Filter';

import dragSource, { dragSourceProps } from './dragSource';
import styles from './styles';

const { bool, number, string, func } = PropTypes;

export class DraggableFilter extends Component {
  static propTypes = {
    ...filterProps,

    layerId: string.isRequired,

    onDestroy: func.isRequired,
    onToggleVisibility: func.isRequired,
    onToggleLocked: func.isRequired,

    x: number.isRequired,
    width: number.isRequired,

    isDragging: bool
  };

  render() {
    const {
      onDestroy,
      onToggleVisibility,
      onToggleLocked
    } = this.props;

    return (
      <Filter { ...{
        ...{
          onDestroy,
          onToggleVisibility,
          onToggleLocked
        },
        ...pick(this.props, dragSourceProps)
      } } />
    );
  }
}

export default flow(
  css(styles),
  draggable(ItemTypes.Filter, dragSource)
)(DraggableFilter);
