import React from 'react';
import css from 'react-css-modules';

import { Button } from 'erlyeditor';
import styles from './styles';

export const Buttons = () => (
  <ul styleName='button-demo'>
    <li><Button label='visibility' filled rounded /></li>
    <li><Button label='timeline' filled small raised rounded /></li>
    <li><Button label='play_arrow' filled big raised rounded /></li>
    <li><Button label='games' big raised disabled rounded /></li>

    <li><Button label='fullscreen' /></li>
    <li><Button label='people' small /></li>
    <li><Button label='cached' big /></li>
    <li><Button label='bug_report' filled /></li>
    <li><Button label='timeline' filled small raised /></li>
    <li><Button label='play_arrow' filled big raised /></li>
    <li><Button label='games' big raised disabled /></li>
    <li><Button label='new_releases' filled big raised disabled /></li>
    <li><Button label='opacity' filled /></li>

    <li><Button icon='fullscreen' /></li>
    <li><Button icon='people' small /></li>
    <li><Button icon='cached' big /></li>
    <li><Button icon='bug_report' filled /></li>
    <li><Button icon='account_circle' circle /></li>
    <li><Button icon='visibility' filled circle /></li>
    <li><Button icon='timeline' filled small raised /></li>
    <li><Button icon='play_arrow' filled big raised /></li>
    <li><Button icon='games' big raised disabled /></li>
    <li><Button icon='new_releases' filled big raised disabled /></li>
    <li><Button icon='build' circle raised /></li>
    <li><Button icon='grade' big circle raised filled /></li>
    <li><Button icon='opacity' filled /></li>
    <li><Button icon='schedule' label='schedule' /></li>
    <li><Button icon='schedule' label='schedule' disabled /></li>
    <li><Button icon='schedule' label='schedule' filled disabled /></li>
    <li><Button label='schedule' disabled /></li>
    <li><Button label='schedule' filled disabled /></li>
    <li><Button icon='thumbs_up' disabled /></li>
    <li><Button icon='mic' filled disabled /></li>
  </ul>
);

export default css(Buttons, styles);
