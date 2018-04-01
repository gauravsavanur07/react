import React, { Component } from 'react';
import css from 'react-css-modules';

import Layer from './Layer';
import styles from './styles';

export class DnDNaiveDragDemo extends Component {
  render() {
    return (
      <div styleName='dnd-layer-demo'>
        <h1>{`just pretend its a real layer`}</h1>
        <Layer />
      </div>
    );
  }
}

export default css(DnDNaiveDragDemo, styles);
