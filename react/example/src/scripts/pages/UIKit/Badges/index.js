import React from 'react';
import css from 'react-css-modules';

import { Badge, tooltip } from 'erlyeditor';
import styles from './styles';

const TooltipBadge = tooltip(Badge);

export const Badges = () => (
  <ul styleName='badge-demo'>
    <li><Badge>{`59`}</Badge></li>
    <li><TooltipBadge tooltipTop tooltipText='12' success>{`12`}</TooltipBadge></li>
    <li><Badge info>{`47`}</Badge></li>
    <li><Badge warning>{`8132`}</Badge></li>
    <li><Badge error>{`42`}</Badge></li>
  </ul>
);

export default css(Badges, styles);
