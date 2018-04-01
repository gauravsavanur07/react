import React, { Component,  PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import tooltip from '../../hoc/tooltip';
import Button from '../../Button';
import ButtonGroup from '../../ButtonGroup';

import ContextToolbar from '../ContextToolbar';

import getContextActions from './getContextActions';
import styles from './styles';

const TooltipButton = tooltip(Button);
const {
  bool,
  string,
  func,
  shape,
  arrayOf,
  node
} = PropTypes;

export class MainToolbar extends Component {
  static propTypes = {
    onCreateLayer: func.isRequired
  };

  render() {
    const { onCreateLayer } = this.props;

    const contextActions = getContextActions({
      common: {
        undo: () => console.log('undo'),
        redo: () => console.log('redo')
      },
      layer: {
        create: onCreateLayer
      },
      filter: {
        split: () => console.log('split')
      }
    });

    return (
      <ContextToolbar filled contextActions={contextActions} />
    );
  }
}

export default css(MainToolbar, styles);
