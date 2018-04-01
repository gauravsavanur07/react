import React, { Component } from 'react';
import css from 'react-css-modules';

import { Player, Html5Video } from 'erlyeditor';

import { sources } from '../videoSources';
import styles from './styles';

export class PlayerDemo extends Component {
  render() {
    return (
      <div styleName='root'>
        <Player width={427}>
          <Html5Video autoPlay
            width={427}
            height={240}
            src={sources[0]}
          />
        </Player>
      </div>
    );
  }
}

export default css(PlayerDemo, styles);
