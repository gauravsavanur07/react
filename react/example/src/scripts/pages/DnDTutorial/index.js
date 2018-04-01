import React, { Component } from 'react';
import css from 'react-css-modules';

import { observe } from './game';
import Board from './components/Board';
import styles from './styles';

export class DnDTutorial extends Component {
  state = { position: [4, 2] };

  componentDidMount() {
    observe(position => this.setState({ position }));
  }

  render() {
    return (
      <div styleName='dnd-tutorial'>
        <Board knightPosition={this.state.position} />
      </div>
    );
  }
}

export default css(DnDTutorial, styles);
