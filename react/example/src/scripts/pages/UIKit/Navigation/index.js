import React from 'react';
import { Link } from 'react-router';
import css from 'react-css-modules';

import styles from './styles';

export const Navigation = () => (
  <ul styleName='navigation'>
    <li><Link to='/ui-kit/badges'>{`badges`}</Link></li>
    <li><Link to='/ui-kit/buttons'>{`buttons`}</Link></li>
    <li><Link to='/ui-kit/button-groups'>{`button groups`}</Link></li>
    <li><Link to='/ui-kit/icons'>{`icons`}</Link></li>
    <li><Link to='/ui-kit/inputs'>{`inputs`}</Link></li>
    <li><Link to='/ui-kit/lists'>{`lists`}</Link></li>
    <li><Link to='/ui-kit/panels'>{`panels`}</Link></li>
    <li><Link to='/ui-kit/sliders'>{`sliders`}</Link></li>
    <li><Link to='/ui-kit/tooltips'>{`tooltips`}</Link></li>
  </ul>
);

export default css(Navigation, styles);
