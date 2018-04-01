import invariant from 'invariant';
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import styles from './styles';

const {
  number,
  string,
  object,
  func,
  arrayOf
} = PropTypes;

export class SVGRenderer extends Component {
  static propTypes = {
    className: string,
    style: object,

    width: number,
    height: number,

    renderers: object,
    objects: arrayOf(object),
    onRender: func
  };

  @autobind
  renderObject(shape, index) {
    const { renderers } = this.props;
    const Renderer = renderers[shape.type];

    invariant(Renderer, `Renderer of type "${shape.type}" is not registered`);

    return (
      <Renderer key={index} {...shape} />
    );
  }

  render() {
    const {
      className,
      style,
      width,
      height,
      objects,
      onRender,
      ...other
    } = this.props;

    const known = {
      className,
      style,
      width,
      height
    };

    return (
      <svg ref={onRender} styleName='svg'
        { ...{ ...known, ...other } }
        styles={void 0}>
        {objects.map(this.renderObject)}
      </svg>
    );
  }
}

export default css(SVGRenderer, styles, { allowMultiple: true });
