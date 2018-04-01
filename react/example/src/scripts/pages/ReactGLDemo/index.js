import React, { Component } from 'react';
import css from 'react-css-modules';


import styles from './styles';

export class ReactGLDemo extends Component {
  render() {
    if (!__CLIENT__) return null;

    const Hello = require('./Hello');

    return (
      <Hello />
    );
  }
}

export default css(ReactGLDemo, styles);
