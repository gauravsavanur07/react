import omit from 'lodash/omit';
import React, { PropTypes } from 'react';

const { string, number, element } = PropTypes;

export const Filter = props => {
  const transferrable = omit(props, 'icon');

  return (
    <rect {...transferrable} />
  );
};

Filter.propTypes = {
  icon: element,
  width: number,
  height: number,
  strokeWidth: number,
  fill: string,
  radius: number,
  blendMode: string,
  rotate: number
};

Filter.defaultProps = {
  width: 5,
  height: 5,
  strokeWidth: 0,
  fill: 'blue',
  radius: 0,
  blendMode: 'normal',
  rotate: 0
};

export default Filter;
