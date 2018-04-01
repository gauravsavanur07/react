import React, { Component } from 'react';
import css from 'react-css-modules';

import { Html5Video } from 'erlyeditor';

import { sources } from '../videoSources';
import styles from './styles';

export class Html5VideoDemo extends Component {
  render() {
    return (
      <div styleName='root'>
        <Html5Video
          autoPlay
          muted
          width={640}
          height={480}
          src={sources[0]}
        />
      </div>
    );
  }
}

export default css(Html5VideoDemo, styles);
