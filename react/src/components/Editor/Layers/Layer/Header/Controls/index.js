import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';

import tooltip from '../../../../../hoc/tooltip';

import ButtonGroup from '../../../../../ButtonGroup';
import Button from '../../../../../Button';

import styles from './styles';

const TooltipButton = tooltip(Button);
const { string, bool, func } = PropTypes;

export class Controls extends Component {
  static propTypes = {
    type: string,
    disabled: bool,
    locked: bool,
    single: bool,
    expanded: bool,
    onDestroy: func.isRequired,
    onToggleLocked: func,
    onToggleDisabled: func,
    onToggleSingle: func,
    onToggleExpanded: func
  };

  render() {
    const {
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
    } = this.props;

    const canDelete = type !== 'video';

    return (
      <ButtonGroup small
        className={styles.controls}
        buttonClassName={styles.button}>

        <TooltipButton
          neutral
          icon={single ? 'adjust' : 'lens'}
          tooltipTop
          tooltipDelay={800}
          tooltipText='single'
          onClick={onToggleSingle}
        />
        <TooltipButton
          neutral
          icon={locked ? 'lock_open' : 'lock_outline' }
          tooltipTop
          tooltipDelay={1200}
          tooltipText={locked ? 'unlock' : 'lock'}
          onClick={onToggleLocked}
        />
        <TooltipButton
          neutral
          icon={disabled ? 'visibility' : 'visibility_off'}
          tooltipTop
          tooltipDelay={1000}
          tooltipText={disabled ? 'enable' : 'disable'}
          onClick={onToggleDisabled}
        />
        <TooltipButton
          neutral
          icon={expanded ? 'expand_less' : 'expand_more'}
          tooltipTop
          tooltipDelay={1000}
          tooltipText={expanded ? 'collapse' : 'expand'}
          onClick={onToggleExpanded}
        />
        <TooltipButton
          neutral
          disabled={!canDelete}
          tooltipTop
          tooltipDelay={1400}
          tooltipText='delete layer'
          icon='delete'
          onClick={onDestroy}
        />
      </ButtonGroup>
    );
  }
}

export default css(Controls, styles);
