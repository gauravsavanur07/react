import pick from 'lodash/pick';
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import {
  layerShape,
  layerActionsShape,
  filterActionsShape
} from '../../../propTypes';

import List from '../../../List';

import Panel from '../../Panel';

import ZoomSlider from '../ZoomSlider';
import Layer from '../Layer';

import styles from './styles';

const {
  bool,
  number,
  string,
  object,
  node,
  arrayOf,
  shape
} = PropTypes;

export class LayersPanel extends Component {
  static propTypes = {
    className: string,
    children: node,

    layers: arrayOf(layerShape).isRequired,
    filterTypes: object.isRequired,

    snapToGrid: bool,
    cellSize: number,

    actions: shape({
      layer: layerActionsShape.isRequired,
      filter: filterActionsShape.isRequired
    }),

    duration: number.isRequired
  };

  @autobind
  handleZoom(level) {
    console.log('zoom to: ', level);
  }

  @autobind
  handleZoomIn() {
    console.log('zoom in');
  }

  @autobind
  handleZoomOut() {
    console.log('zoom out');
  }

  renderFooter() {
    return (
      <ZoomSlider
        zoom={50}
        onZoom={this.handleZoom}
        onZoomIn={this.handleZoomIn}
        onZoomOut={this.handleZoomOut}
      />
    );
  }

  @autobind
  renderLayer(layer) {
    const layerProps = pick(
      this.props,
      'snapToGrid',
      'cellSize',
      'filterTypes',
      'actions',
      'duration'
    );

    return (
      <List.Item key={layer.id}>
        <Layer {...{ ...layer, ...layerProps } } />
      </List.Item>
    );
  }

  render() {
    const { className, children, layers } = this.props;

    return (
      <Panel className={cn(className, styles.panel)}
        contentClassName={styles.content}
        footerClassName={styles.footer}
        footer={this.renderFooter()}>
        {children}
        {layers.length > 0 ?
          <List>{layers.map(this.renderLayer)}</List> :
          <p>{'No layers'}</p>
        }
      </Panel>
    );
  }
}

export default css(LayersPanel, styles, { allowMultiple: true });
