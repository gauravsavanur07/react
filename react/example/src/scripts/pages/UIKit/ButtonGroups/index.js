import React from 'react';
import css from 'react-css-modules';

import { ButtonGroup, Button, tooltip } from 'erlyeditor';
import styles from './styles';

const TooltipButton = tooltip(Button);

export const ButtonGroups = () => (
  <ul styleName='button-group-demo'>
    <li>
      <ButtonGroup filled small>
        <TooltipButton icon='search' tooltipTop tooltipText='learn some shit' />
        <TooltipButton icon='people' tooltipText='write code & die' />
      </ButtonGroup>
    </li>
    <li>
      <ButtonGroup big>
        <TooltipButton icon='play_arrow' tooltipTop tooltipText='learn some shit' />
        <TooltipButton icon='pause' tooltipText='write code & die' />
      </ButtonGroup>
    </li>
    <li>
      <ButtonGroup filled>
        <TooltipButton icon='visibility' tooltipTop tooltipText='learn some shit' />
        <TooltipButton icon='timeline' tooltipText='write code & die' />
        <TooltipButton icon='games' tooltipText='write code & die' />
        <TooltipButton icon='fullscreen' tooltipText='write code & die' />
      </ButtonGroup>
    </li>
  </ul>
);

export default css(ButtonGroups, styles);
