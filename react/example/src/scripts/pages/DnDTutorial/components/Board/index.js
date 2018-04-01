import times from 'lodash/times';
import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import css from 'react-css-modules';

import { canMoveKnight, moveKnight } from '../../game';
import Knight from '../Knight';
import BoardSquare from '../BoardSquare';
import styles from './styles';

const { arrayOf, number } = PropTypes;

export class Board extends Component {
  static propTypes = {
    knightPosition: arrayOf(number).isRequired
  };

  getPosition = i => [i % 8, Math.floor(i / 8)];

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    return x === knightX && y === knightY ? <Knight /> : null;
  }

  handleSquareClick = (x, y) => (canMoveKnight(x, y)) && moveKnight(x, y);

  renderSquare = i => {
    const [x, y] = this.getPosition(i);
    const style = { width: '12.5%', height: '12.5%' };

    return (
      <div key={i} style={style} onClick={() => this.handleSquareClick(x, y)}>
        <BoardSquare { ...{ x, y } }>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  };

  render() {
    const squares = times(64, this.renderSquare);

    return (
      <div styleName='board'>
        {squares}
      </div>
    );
  }
}

/* eslint-disable new-cap */
export default compose(
  DragDropContext(HTML5Backend),
  css(styles)
)(Board);
/* eslint-enable new-cap */
