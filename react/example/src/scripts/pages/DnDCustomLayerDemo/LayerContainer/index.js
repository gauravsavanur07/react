import React, { PropTypes } from 'react';
import css from 'react-css-modules';

import styles from './styles';

const { string, node, any } = PropTypes;

export const LayerContainer = ({ children }) => (
  <div styleName='layer'>{children}</div>
);

export default css(LayerContainer, styles);
