import { autobind } from 'core-decorators';
import React, { Component } from 'react';
import css from 'react-css-modules';

import { Slider } from 'erlyeditor';
import styles from './styles';

export class Sliders extends Component {
  state = { value: 50 };

  @autobind
  handleChange(value) {
    this.setState({ value: Number(value) });
  }

  render() {
    return (
      <div styleName='slider-demo'>
        <Slider vertical
          value={this.state.value}
          size={'200px'}
          thickness={'10px'}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default css(Sliders, styles);
