import React from 'react';
import css from 'react-css-modules';

import { Button, tooltip } from 'erlyeditor';
import styles from './styles';

const TooltipButton = tooltip(Button);

export const Tooltips = () => (
  <div styleName='tooltip-demo'>
    <TooltipButton filled icon='people' tooltipText='my awesome tooltip' />
    <TooltipButton filled raised icon='play_arrow'
      tooltipText='will not hide on click'
      tooltipHideOnClick={false}
    />
    <TooltipButton big rounded filled
      icon='fullscreen'
      tooltipText='1000 ms delay'
      tooltipDelay={1000}
    />
    <TooltipButton small circle filled
      icon='cached'
      tooltipTop
      tooltipText='tooltip on top'
    />
  </div>
);

export default css(Tooltips, styles);
