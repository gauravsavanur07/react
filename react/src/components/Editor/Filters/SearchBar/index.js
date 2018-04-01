import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import css from 'react-css-modules';

import Icon from '../../../Icon';
import Input from '../../../Input';

import styles from './styles';

const { string } = PropTypes;

export class SearchBar extends Component {
  static propTypes = {
    query: string
  };

  render() {
    return (
      <div styleName='search-bar'>
        <Icon value='search' />
        <Input />
      </div>
    );
  }
}

export default css(SearchBar, styles, { allowMultiple: true });
