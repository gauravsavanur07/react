import React from 'react';
import css from 'react-css-modules';

import { Input } from 'erlyeditor';
import styles from './styles';

export const Inputs = () => (
  <ul styleName='inputs'>
    <li><Input type='text' placeholder='with placeholder' /></li>
    <li><Input type='text' error={'test error'} /></li>
    <li><Input type='text' label={'label'} /></li>
    <li><Input type='text' icon={'people'} /></li>
    <li><Input type='text' icon={'people'} maxLength={10} /></li>
    <li><Input type='text' icon={'search'} label={'find'} /></li>
    <li><Input type='search' /></li>
    <li><Input type='color' /></li>
    <li><Input type='number' /></li>
    <li><Input type='radio' /></li>
    <li><Input type='time' /></li>
    <li><Input type='url' /></li>
    <li><Input type='text' /></li>
    <li><Input type='text' big /></li>
    <li><Input type='text' small /></li>
    <li><Input type='text' disabled /></li>
    <li><Input type='text' multiline /></li>
    <li><Input type='text' multiline small /></li>
    <li><Input type='text' multiline big /></li>
  </ul>
);

export default css(Inputs, styles);
