import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import Panel from '../../Panel';
import styles from './styles';

const { string, node } = PropTypes;

export class MainPanel extends Component {
  static propTypes = {
    className: string,
    children: node
  };

  render() {
    const { className, children } = this.props;

    return (
      <Panel vertical className={cn(className, styles.mainPanel)}>
        {children}
      </Panel>
    );
  }
}

export default css(MainPanel, styles, { allowMultiple: true });
