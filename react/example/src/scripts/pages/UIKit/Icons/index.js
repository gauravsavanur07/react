import React from 'react';
import css from 'react-css-modules';

import { Icon } from 'erlyeditor';
import styles from './styles';

export const Icons = () => (
  <ul styleName='icon-demo'>
    <li><Icon value='people' /></li>
    <li><Icon value='fullscreen' /></li>
    <li><Icon big value='people' /></li>
    <li><Icon small value='cached' /></li>
  </ul>
);

export default css(Icons, styles);
