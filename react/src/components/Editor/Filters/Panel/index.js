import React, { Component, PropTypes } from 'react';
import css from 'react-css-modules';
import cn from 'classnames';

import List from '../../../List';

import Panel from '../../Panel';

import SearchBar from '../SearchBar';
import DraggableFilter from '../DraggableFilter';

import styles from './styles';

const { string, func, object } = PropTypes;

export class FiltersPanel extends Component {
  static propTypes = {
    className: string,
    filterTypes: object.isRequired,
    onCreateFilter: func.isRequired
  };

  renderSearchBar() {
    return null;
  }

  render() {
    const { className, filterTypes, onCreateFilter } = this.props;

    return (
      <Panel
        className={cn(className, styles.panel)}
        headerClassName={styles.panelHeader}
        contentClassName={styles.panelContent}
        header={this.renderSearchBar()}
        title='filters'>

          <List vertical className={styles.list}>
            {Object.values(filterTypes).map(filter =>
              <List.Item key={filter.name}
                className={styles.item}
                disabled={filter.disabled}>

                <DraggableFilter {...filter}
                  onCreateFilter={onCreateFilter}
                />
              </List.Item>
            )}
          </List>
      </Panel>
    );
  }
}

export default css(FiltersPanel, styles, { allowMultiple: true });
