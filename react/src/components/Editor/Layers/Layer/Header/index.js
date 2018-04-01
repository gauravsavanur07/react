import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import tooltip from '../../../../hoc/tooltip';
import Controls from './Controls';
import styles from './styles';

const { bool, string, func } = PropTypes;

export class Header extends Component {
  static propTypes = {
    className: string,
    disabled: bool,
    locked: bool,
    single: bool,
    name: string,
    description: string,
    expanded: bool,
    onDestroy: func,
    onToggleLocked: func,
    onToggleDisabled: func,
    onToggleSingle: func,
    onToggleExpanded: func
  };

  static defaultProps = {
    disabled: false,
    expanded: true
  };

  render() {
    const {
      className,
      name,
      type,
      description,
      disabled,
      locked,
      single,
      expanded,
      onDestroy,
      onToggleLocked,
      onToggleDisabled,
      onToggleSingle,
      onToggleExpanded,
      ...other
    } = this.props;

    const appearance = expanded ? 'wide' : 'narrow';
    const styleName = cn('header', appearance);

    const controlsProps = {
      type,
      disabled,
      locked,
      single,
      expanded,
      onDestroy,
      onToggleLocked,
      onToggleDisabled,
      onToggleSingle,
      onToggleExpanded
    };
    const known = { styleName, className };

    return (
      <div { ...{ ...known, ...other } }>
        <h6 styleName='title'>
          {name}
        </h6>
        <Controls {...controlsProps} />
      </div>
    );
  }
}

export default css(Header, styles, { allowMultiple: true });
