import partition from 'lodash/partition';
import invariant from 'invariant';
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import { Surface } from 'gl-react-dom';
import css from 'react-css-modules';

import { filterShape } from '../../propTypes';

import styles from './styles';

const Overlay = __CLIENT__ ? require('./renderers/Overlay') : void 0;
// ^-- TODO: find a better way to do SSR

const {
  bool,
  number,
  object,
  node,
  arrayOf
} = PropTypes;

export class FilterChainSurface extends Component {
  static propTypes = {
    children: node.isRequired,

    width: number.isRequired,
    height: number.isRequired,

    eventsThrough: bool,
    visibleContent: bool,
    autoRedraw: bool,

    filters: arrayOf(filterShape),
    renderers: object
  };

  static defaultProps = {
    eventsThrough: true,
    visibleContent: true,
    autoRedraw: true
  };

  builtInRenderers = {
    overlay: Overlay
  };

  getRenderer(type) {
    const { renderers } = this.props;
    const renderersMap = {
      ...this.builtInRenderers,
      ...renderers
    };

    const Renderer = renderersMap[type];
    invariant(Renderer, `Renderer of type ${type} is not registered`);

    return Renderer;
  }

  @autobind
  renderFilter(children, filter) {
    const { type, attributes } = filter;
    const { width, height } = this.props;

    const Renderer = this.getRenderer(type);

    return React.createElement(Renderer, {
      ...attributes,
      width,
      height
    }, children);
  }

  render() {
    const {
      children,
      width,
      height,
      filters,
      ...other
    } = this.props;

    return (
      <Surface { ...{ ...{ width, height }, ...other } }>
        {filters.reduceRight(this.renderFilter, children)}
      </Surface>
    );
  }
}

export default css(FilterChainSurface, styles);
