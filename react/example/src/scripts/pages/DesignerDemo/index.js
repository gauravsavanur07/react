import React, { Component } from 'react';
import css from 'react-css-modules';

import Designer from '../../components/Designer';

import styles from './styles';

export class DesignerDemo extends Component {
  state = {
    objects: [
      {
        x: 10,
        y: 24,

        type: 'filter',

        width: 120,
        height: 80,
        strokeWidth: 0,
        fill: '#777777',
        radius: 0,
        blendMode: 'normal',
        rotate: 0
      }
    ]
  };

  render() {
    const size = {
      width: 640,
      height: 480,
      snapToGrid: 10
    };

    const { objects } = this.state;

    return (
      <div styleName='designer-demo'>
        <Designer objects={objects} {...size} />
      </div>
    );
  }
}

export default css(DesignerDemo, styles);
