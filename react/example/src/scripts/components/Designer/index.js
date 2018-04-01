import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import SVGRenderer from './SVGRenderer';
import Filter from './renderers/Filter';

import styles from './styles';

const { number, string, object, arrayOf } = PropTypes;

export class Designer extends Component {
  static propTypes = {
    className: string,
    renderers: object,

    width: number,
    height: number,

    snapToGrid: number,

    objects: arrayOf(object),

    svgClassName: string,
    svgStyle: object
  };

  static defaultProps = {
    renderers: {
      filter: Filter
    }
  };

  render() {
    const {
      width,
      height,
      renderers,
      objects,
      ...other
    } = this.props;

    const known = {
      width,
      height,
      renderers,
      objects
    };

    /* eslint-disable react/jsx-no-bind */
    return (
      <SVGRenderer
        onRender={r => this.svg = r}
        { ...{ ...known, ...other } }
        styles={void 0}
      />
    );
    /* eslint-enable react/jsx-no-bind */
  }
}

export default css(Designer, styles, { allowMultiple: true });
