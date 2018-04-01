import React from 'react';
import css from 'react-css-modules';

import { List } from 'erlyeditor';
import styles from './styles';

export const Lists = () => (
  <div styleName='list-demo'>
    <List style={{ width: 600 }} selectable>
      <List.Item filled>{`one`}</List.Item>
      <List.Item filled>{`one`}</List.Item>
      <List.Item filled>{`one`}</List.Item>
      <List.Subheader>{`subheader`}</List.Subheader>
      <List.Item disabled>{`two`}</List.Item>
      <List.Item filled>{`one`}</List.Item>
      <List.Item disabled>{`two`}</List.Item>
      <List.Divider />
      <List.Item selectable>{`three`}</List.Item>
      <List.Item>
        <List>
          <List.Item filled>{`hey`}</List.Item>
          <List.Divider inset />
          <List.Item filled>{`hey`}</List.Item>
          <List.Item disabled>{`I am nested`}</List.Item>
          <List.Item selectable>{`askdjfsakldjf`}</List.Item>
        </List>
      </List.Item>
    </List>
  </div>
);

export default css(Lists, styles);
