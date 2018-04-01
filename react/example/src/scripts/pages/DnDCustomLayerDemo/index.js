import React, { Component } from 'react';
import css from 'react-css-modules';

import Container from './Container';

import styles from './styles';

export class DnDCustomLayerDemo extends Component {
  state = {
    snapToGrid: true,
    cellSize: 10
  };

  render() {
    const {
      snapToGrid,
      cellSize
    } = this.state;

    return (
      <div styleName='dnd-layer-demo'>
        <Container onMove={this.handleMove}
          { ...{ snapToGrid, cellSize } }
        />
      </div>
    );
  }
}

export default css(DnDCustomLayerDemo, styles);
