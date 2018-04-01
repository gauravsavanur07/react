import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import Panel from '../Panel';
import styles from './styles';

const { string } = PropTypes;

export class PropertyEditor extends Component {
  static propTypes = {
    className: string
  };

  render() {
    const { className } = this.props;

    return (
      <Panel className={cn(className, styles.panel)}
        headerClassName={styles.panelHeader}
        title='properties'>
      </Panel>
    );
  }
}

export default css(PropertyEditor, styles, { allowMultiple: true });
