import React, { PropTypes } from 'react';
import css from 'react-css-modules';

import styles from './styles';

const { bool, node } = PropTypes;

export const Square = ({ black, children }) => (
  <div styleName={ black ? 'black' : 'white' }>{children}</div>
);

Square.propTypes = {
  black: bool,
  children: node
};

export default css(Square, styles);
