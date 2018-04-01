import React, { Component } from 'react';
import css from 'react-css-modules';

import { filterProps } from '../../../propTypes';
import Layer from '../Layer';
import styles from './styles';

export class LayerDragPreview extends Component {
  static propTypes = filterProps;

  render() {
    return (
      <div styleName='layer-drag-preview'>
        <Layer {...this.props} />
      </div>
    );
  }
}

export default css(LayerDragPreview, styles);
