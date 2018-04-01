import flow from 'lodash/flow';
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Layer from '../Layer';
import CustomDragLayer from '../CustomDragLayer';

import styles from './styles';

const { bool, number, object, func } = PropTypes;

export class Container extends Component {
  static propTypes = {
    snapToGrid: bool,
    cellSize: number
  };

  state = {
    filters1: {
      overlay1: {
        title: 'overlay',
        x: 20,
        width: 100,
        height: 72
      },
      blur1: {
        title: 'blur',
        x: 240,
        width: 110,
        height: 72
      }
    },
    filters2: {
      hue1: {
        title: 'hue',
        x: 440,
        width: 200,
        height: 72
      }
    }
  };

  @autobind
  handleMove1(id, x) {
    const { filters1 } = this.state;
    this.setState({ filters1: { ...filters1, [id]: { ...filters1[id], x } } });
  }

  render() {
    const {
      snapToGrid,
      cellSize
    } = this.props;

    const { filters1 } = this.state;

    return (
      <div styleName='container'>
        <Layer { ...{ snapToGrid, cellSize, filters: filters1, onMove: this.handleMove1 } } />
        <CustomDragLayer { ...{ snapToGrid, cellSize } } />
      </div>
    );
  }
}

/* eslint-disable new-cap */
export default flow(
  css(styles),
  DragDropContext(HTML5Backend)
)(Container);
/* eslint-enable new-cap */
