import pick from 'lodash/pick';
import { autobind } from 'core-decorators';
import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import {
  filterActionsShape,
  layerActionsShape
} from '../../../propTypes';

import Header from './Header';
import Surface from './Surface';

import styles from './styles';

const {
  bool,
  number,
  string,
  object,
  arrayOf,
  shape
} = PropTypes;

export class Layer extends Component {
  static propTypes = {
    className: string,
    snapToGrid: bool,
    cellSize: number,

    id: string.isRequired,
    name: string.isRequired,
    description: string.isRequired,
    type: string.isRequired,
    attributes: object,
    filters: object.isRequired,
    filterTypes: object.isRequired,
    editable: bool,
    disabled: bool,
    locked: bool,
    single: bool,

    actions: shape({
      layer: layerActionsShape.isRequired,
      filter: filterActionsShape.isRequired
    })
  };

  state = { expanded: true };

  @autobind
  handleDestroy() {
    this.props.actions.layer.destroy(this.props.id);
  }

  @autobind
  handleToggleExpanded() {
    const expanded = !this.state.expanded;
    this.setState({ expanded });
  }

  @autobind
  handleMoveFilter(filterId, sourceLayerId, targetLayerId, offset) {
    if (sourceLayerId !== targetLayerId) {
      this.props.actions.layer.removeFilter(sourceLayerId, filterId);
      this.props.actions.layer.addFilter(targetLayerId, filterId);
    }
    this.props.actions.filter.move(filterId, offset);
  }

  @autobind
  handleResizeFilter(filterId, offsetDelta, durationDelta, factor) {
    this.props.actions.filter.resize(filterId, offsetDelta, durationDelta, factor);
  }

  @autobind
  handleDestroyFilter(id) {
    this.props.actions.layer.removeFilter(this.props.id, id);
    this.props.actions.filter.destroy(id);
  }

  @autobind
  renderHeader() {
    const props = pick(
      this.props,
      'name',
      'type',
      'description',
      'editable',
      'disabled',
      'locked',
      'single'
    );

    return (
      <Header {...props}
        expanded={this.state.expanded}
        onDestroy={this.handleDestroy}
        onToggleExpanded={this.handleToggleExpanded}
      />
    );
  }

  @autobind
  renderSurface() {
    const actions = this.props.actions.filter;
    const props = pick(
      this.props,
      'id',
      'type',
      'snapToGrid',
      'cellSize',
      'filters',
      'filterTypes',
      'duration'
    );

    return (
      <Surface {...props}
        onMoveFilter={this.handleMoveFilter}
        onResizeFilter={this.handleResizeFilter}
        onDestroyFilter={this.handleDestroyFilter}
        onToggleFilterVisibility={actions.toggleVisibility}
        onToggleFilterLocked={actions.toggleLocked}
      />
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div styleName='layer' className={className}>
        {this.renderHeader()}
        {this.renderSurface()}
      </div>
    );
  }
}

Layer.Header = Header;
Layer.Surface = Surface;

export default css(Layer, styles, { allowMultiple: true });
