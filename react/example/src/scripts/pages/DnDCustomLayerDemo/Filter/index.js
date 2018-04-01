import React, { PropTypes } from 'react';
import css from 'react-css-modules';

import styles from './styles';

const { bool, number, string, any } = PropTypes;

export const Filter = props => {
  const {
    id,
    title,
    width,
    height,
    dragging
  } = props;

  const styleName = dragging ? 'dragging' : 'normal';
  const style = { width, height };

  return (
    <div {...{ styleName, style } }>
    {`${id}-${title}`}
    </div>
  );
};

Filter.propTypes = {
  id: any.isRequired,
  title: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  dragging: bool
};

Filter.defaultProps = {
  dragging: false
};

export default css(Filter, styles);
